# QA fixes — 15 July 2026

Against **MatoshriShivgarjana_QA_Security_Test_Report.pdf** (14 July 2026).
Every Fail and Warning is accounted for below.

Verified by a real `next build` static export: `tsc --noEmit` clean,
`next lint` clean, all 13 routes prerendered, and the emitted HTML checked
directly for each claim.

## Scoreboard

| ID | Sev | Finding | Status |
|----|-----|---------|--------|
| **N-20** | Med | Inner pages canonicalised to `/` | ✅ fixed |
| **N-21** | Med | `og:url` → `/`; no `og:image` | ✅ fixed |
| **N-26** | Med | Shares showed no thumbnail | ✅ fixed |
| **F-03** | Low | Active menu item not highlighted | ✅ fixed |
| **N-16** | Low | No `aria-current="page"` | ✅ fixed |
| **N-13** | Low | Lightbox: no dialog role / focus trap / scroll lock | ✅ fixed |
| **N-17** | Low | No skip-to-content link | ✅ fixed |
| **N-01** | Low | Load event ~4.6 s (footer map) | ✅ fixed |
| **S-16** | Info | Maps embed leaked IP + cookies sitewide | ✅ fixed |
| **N-12** | Low | Focus ring was browser-default blue | ✅ fixed |
| **N-24** | Info | JSON-LD had no `telephone` | ✅ fixed |
| **S-08** | Med | CSP absent | ⚠️ partial — meta CSP shipped; see below |
| **S-04, S-05, S-06, S-07, S-09, S-10** | Med/Low | HSTS, nosniff, XFO, Referrer-Policy, Permissions-Policy, clickjacking | ⚙️ needs Cloudflare — `SECURITY-HEADERS.md` |
| **S-11** | Info | `rel=noopener` on Downloads PDF | ✔️ already correct — no change |
| **N-06** | Low | Mobile reflow unverifiable in test env | 🔍 needs a real device |
| **N-02** | Info | Subset the Devanagari fonts | ⏸️ deliberately not done |

---

## N-20 / N-21 / N-26 — canonical, og:url, share image

**Root cause.** `alternates: { canonical: SITE_URL }` and `openGraph.url:
SITE_URL` were in the **root layout**. Next.js inherits root-layout metadata
into every child route that doesn't override it, and none of the 12 inner pages
did — so all 13 URLs claimed to be the homepage. Exactly what E1 measured.

**Fix.**

- New `src/lib/seo.ts` — `canonicalUrl()` and `buildMetadata()`.
- `src/app/layout.tsx` — `alternates` and `openGraph.url` **removed**. Not
  overridden: removed. If a future route forgets `buildMetadata`, it now gets
  *no* canonical (harmless, Google self-canonicalises) instead of a *wrong* one
  pointing at the homepage. The og:image stays inherited on purpose so a new
  route still gets a thumbnail.
- All 13 `page.tsx` now call `buildMetadata({ title, description, path })`.
  The homepage had no `metadata` export at all and now has one.
- Trailing slashes: `next.config.mjs` sets `trailingSlash: true`, so canonicals
  emit `/about/`, matching the URL actually served and crawled.

Next merges metadata *shallowly* — a child's `openGraph` replaces the parent's
outright rather than merging — so `buildMetadata` emits a complete `openGraph`
block. Half-inheriting it isn't an option.

**Verified in the built HTML:**

```
/            canonical=https://matoshreechavighnaharta.co.in/
/about/      canonical=https://matoshreechavighnaharta.co.in/about/
/gallery/    canonical=https://matoshreechavighnaharta.co.in/gallery/
og:image     https://matoshreechavighnaharta.co.in/og-image.png  (1200x630)
twitter:image  same
```

**Bonus — `src/app/sitemap.ts`.** It emitted `https://…/about` (no slash) while
the page serves at `/about/`. Every entry was a redirect hop, and a sitemap that
disagrees with the canonical is a mixed signal. It now uses the same
`canonicalUrl()` helper, so sitemap and canonical are byte-identical.

**`public/og-image.png`** — 1200×630, generated, palette taken from the live
site's own tokens (`#e6c868` gold, `#190511` ground, `#f5e9d6` cream — the same
values E3 measured). Regenerate after editing the text at the top of
`tools/generate-og-image.py`:

```bash
pip install pillow && python3 tools/generate-og-image.py
```

It needs Pillow built with libraqm — without HarfBuzz shaping, Devanagari matras
and conjuncts render as loose glyphs. Fonts download on first run into
`tools/.fonts/` (gitignored).

Two things to eyeball: it uses Devanagari numerals (१९८०, ४७, २०२६), and
"मातोश्रीचा विघ्नहर्ता" is taken from `settings.org.tagline`.

**Test it:** paste the URL into the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and
into a WhatsApp chat with yourself. WhatsApp caches previews hard — add `?v=2`
to bust it.

---

## F-03 / N-16 — active menu item

**Root cause — not what the report guessed, and not what I guessed either.**
The gold state wasn't hard-coded on Home. `navbar.tsx` had:

```ts
const active = pathname === item.href;
```

`content/navigation.json` stores `"href": "/about"`. `next.config.mjs` sets
`trailingSlash: true`, so `usePathname()` returns `"/about/"`.
`"/about/" === "/about"` is **false** — on every inner page. Home was the only
match because `"/" === "/"`. That is precisely the reported symptom: Home gold
on `/`, nothing highlighted anywhere else.

**Fix.** `isActivePath()` in `src/lib/utils.ts` normalises the trailing slash,
and both the desktop bar and the mobile sheet now use it and set
`aria-current="page"`. Comparison is exact, not prefix-based — a `startsWith()`
match on `"/"` would light Home up on all 13 routes.

**Verified on `/about/`:**

| link | `aria-current` | colour classes |
|---|---|---|
| About (desktop bar) | `page` | `text-gold-light` → **#e6c868** |
| About (mobile sheet) | `page` | `bg-gold/10 text-saffron` |
| Gallery (sibling) | — | `text-[var(--dark-text-soft)]` → **#cdb09f** |

`#e6c868` = rgb(230,200,104) and `#cdb09f` = rgb(205,176,159) — the exact two
values E5 measured. The footer quick-links correctly do **not** get
`aria-current`; they aren't a current-page indicator.

---

## N-13 — lightbox accessibility

Esc and arrow keys already worked (F-15/F-16) and are untouched. Added in
`src/lib/modal-a11y.ts` and wired into `src/app/gallery/view.tsx`:

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → the caption
- focus moves to the close button on open, Tab is trapped, focus returns to the
  thumbnail on close
- background scroll locked

**Two deliberate choices.** The scroll lock uses `overflow: hidden`, not the
common `position: fixed` trick — `position: fixed` discards the scroll offset
and would regress **F-17** ("grid shown at prior scroll position"), currently a
Pass. Trading a passing check for a failing one to close a Low is a bad deal.
And previous style values are saved/restored rather than reset to `""`, so this
composes with the navbar's own mobile-sheet lock instead of clobbering it.

---

## N-17 — skip link

`src/components/ui/skip-link.tsx`, rendered as the first focusable element in
`layout.tsx`, targeting `<main id="main" tabIndex={-1}>`.

`tabIndex={-1}` is not optional: without it Safari moves the URL fragment but
leaves focus at the top of the document, so the link looks like it works and
doesn't. `#main { scroll-margin-top: 6rem }` in `globals.css` keeps the heading
clear of the fixed navbar.

Test: load any page, press Tab once — a gold chip appears top-left.

---

## N-01 / S-16 — the footer map

The iframe **already had `loading="lazy"`** and the load event was still ~4.6 s,
so lazy alone wasn't the answer. The stronger point is S-16: that iframe is in
the footer of **all 13 pages**, so it set Google cookies and handed every
visitor's IP to Google on every page view — on a site that otherwise has zero
third-party cookies and zero trackers.

`src/components/ui/map-embed.tsx` renders a branded placeholder showing the
address, and only mounts the iframe on click. Used in both `footer.tsx` and
`contact/view.tsx`.

**Verified:** `0` iframes in the initial HTML of `/`, `/about/` and `/contact/`.
Nothing is requested from Google until someone asks for the map. F-24 still
passes — same embed URL, one click later.

---

## Smaller ones

**N-12** — `globals.css` now sets a gold `:focus-visible` ring (deep maroon on
the light theme, where gold alone is too faint against `#fbf5e9`).
`:focus-visible` only, so pointer users never see it.

**N-24** — `orgJsonLd` in `layout.tsx` now carries `telephone`, sourced from
`settings.contact.phones[0]` so it stays in step with what `/contact/` renders.
Also added `logo` and `image`.

**S-11 — already correct, no change made.** The report recommended adding
`rel=noopener` to the Downloads PDF link. `src/app/downloads/view.tsx:55`
already has `rel="noopener noreferrer"`. Nothing to do.

**N-02 — deliberately not done.** Subsetting Devanagari is easy to get wrong,
and dropping a glyph range a future page needs shows up as tofu — the exact
failure F-27 currently passes. Worth doing with `pyftsubset` against real proof
-reading, not blind. Note `next/font/google` already subsets to the declared
`subsets: ["devanagari", "latin"]`, so the win here is smaller than it looks.

---

## Still needs a human

Unchanged from the report's own coverage note:

- **N-06** — real mobile reflow + hamburger drawer. The audit viewport was
  pinned at ~1920px. The implementation looks right (`device-width` viewport,
  `xl:hidden` hamburger with `aria-expanded`) but "looks right" isn't tested.
- **N-04** — Lighthouse + field LCP/CLS/INP. Re-run after this deploy; the map
  change should move the load event a lot.
- **N-05** — Slow-3G re-test.
- **N-10** — Safari/iOS, Firefox, Edge spot-check.
- **N-13** — a VoiceOver/NVDA pass. The attributes are there; whether it
  *announces* well is a listening job. While you're in there: the lightbox
  buttons are `aria-label="Close" / "Previous" / "Next"` — English labels on a
  `lang="mr"` document, so a Marathi voice reads them oddly. Not a reported
  finding and not changed, but worth a look.
- **S-18** — keep Next.js patched (`next@^15.1.6` here).

## Re-testing

```bash
tools/verify.sh https://matoshreechavighnaharta.co.in
```

Checks all 13 routes, the 404, the six headers, canonical + og:url on five
routes, og:image reachable and actually 1200×630, `aria-current`, the skip link
and `rel=noopener`. Exits non-zero on failure, so it can go in CI.

Expected before the Cloudflare step: SEO and a11y green, `S-0x` still red.

## One content note

F-18 verified the countdown against Ganesh Chaturthi on **14 Sep 2026**
(`settings.countdown.targetISO`). Correct as of now. Once the festival passes,
roll it to 2027 — a content change, not a bug.

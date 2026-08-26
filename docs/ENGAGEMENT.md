# Engagement / CRO notes

**25 August 2026.** Work against a growth brief: increase impressions, CTR,
clicks, engaged sessions, pages per session, and interactions with the gallery,
events, map and contact.

---

## What could not be done, and why

Three parts of that brief need data or access this environment does not have.
Rather than guess at them:

**No Search Console access.** Impressions, CTR, average position, query
breakdowns — none of it is reachable from here. So the search-opportunity matrix
(query / impressions / CTR / position / target page) cannot be built, and
neither can the "high impressions, low CTR" and "position 4–20" priority lists.
Those require you to export the Performance report; send it and the matrix takes
minutes.

**No analytics installed.** There is no GA4, no GTM, no Plausible — nothing, in
any file. So every event in the brief (`gallery_open`, `directions_click`,
`contact_click`, `share_click`, `faq_expand`) has nowhere to go. **No tracking
was faked.** See "Analytics" below for exactly what to add.

**No web access.** Competitor SERP analysis for "ganpati mandal parel" and the
rest needs a browser. Not attempted.

## What was implemented

### Above the fold (`src/components/sections/hero.tsx`, `src/lib/i18n.ts`)

The first screen previously showed the Mandal's name, the devotional tagline, a
"47th year" badge, "celebrating 47 years of faith, unity and service", and the
founding dates. A visitor arriving from a search like *ganpati mandal parel* was
told **neither where the Mandal is nor when the festival happens**.

Added, as one line under the subtitle:

```
📍 सार्वजनिक गणेशोत्सव मंडळ · परेल-भोईवाडा, मुंबई ४०००१२
📅 गणेशोत्सव २०२६ · १४ ते २५ सप्टेंबर
```

This also puts परेल and भोईवाडा in the first screen of visible text, which
before appeared only further down the page.

### Hero call-to-action order

Was: Gallery (primary) · About · Vargani · Membership *(coming soon)*.

Now: **Ganeshotsav 2026 Programme** (primary) · Procession Route · Gallery ·
Vargani.

Three weeks before the festival, the thing a visitor wants is the programme and
the route, not the photo archive. `/sabhasad/` was also giving prime CTA space
to a placeholder page that is deliberately `noindex` — it stays in the
navigation, just not in the hero.

### Share, with WhatsApp as the realistic channel (`src/components/ui/share-buttons.tsx`)

Added to `/events/`, `/procession/`, `/gallery/` and `/news/`. Everything about
this Mandal already moves by WhatsApp; a devotee forwarding the procession route
to a family group is the likeliest sharing action on the site, and there was no
button for it.

Two implementation choices worth knowing:

- **The WhatsApp link is server-rendered**, built from the canonical path rather
  than `window.location`. The obvious version gates the whole block behind a
  `mounted` flag so it can read `navigator.share`; that causes a layout shift on
  hydration and gives nothing to anyone without JavaScript. As shipped, it is a
  plain anchor in the HTML that works before hydration.
- **The native share sheet is a pure enhancement.** After mount, if
  `navigator.share` exists, the same anchor intercepts the click and opens the
  OS sheet — which beats a WhatsApp-only button, since it offers whatever that
  person actually uses. Where it doesn't exist, the anchor stays an anchor.

## Analytics — what you need to add

Nothing here can be measured until this exists. Minimum:

1. Create a GA4 property and get the measurement ID (`G-XXXXXXXXXX`).
2. Tell me the ID and I will add the script to `src/app/layout.tsx` behind an
   env var, plus a small `track()` helper.
3. Then these get wired, on elements that already exist:
   `share_click` · `directions_click` (the Maps button on `/contact/` and
   `/procession/`) · `gallery_open` and `gallery_image_view` (lightbox) ·
   `contact_click` · `email_click` · `download_click` · `faq_expand`.

Consider Search Console → Settings → Associations to link the property, so query
data and behaviour sit side by side.

## Deliberately not done

- **`/ganeshotsav-2026/`, `/ganpati-mandal-parel/`, `/ganpati-mandal-bhoiwada/`.**
  `/events/` already holds the 2026 programme *and* the `Festival` schema, and
  its title is already "कार्यक्रम · Ganeshotsav 2026 Events, Parel Mumbai".
  Parel-Bhoiwada is one locality and one mandal, so two locality pages would be
  the same page twice — the doorway pattern the brief itself rules out. Better
  to keep one strong `/events/` than three competing near-duplicates.
- **`/ganpati-darshan/`.** Would need official darshan timings, which do not
  exist in the project. Give me the timings and this becomes a real page rather
  than a keyword target.
- **Image renaming for image search.** The gallery filenames are referenced from
  `content/gallery.json`, `public/image-manifest.json` and the generated
  variants; renaming ~60 files to keyword-shaped names risks breaking those for
  a small gain. Captions and alt text carry the same signal, and the photos are
  already listed in the sitemap for Google Images.

## Still the highest-value open items

1. **Contact form endpoint.** `CONTACT_ENDPOINT` is `""`, so the form falls back
   to a mailto. Better search visibility with a half-working contact path is a
   worse outcome than the reverse.
2. **Reviews on the Google Business Profile.** For local visibility this
   outweighs anything left on the site. A printed QR at the mandap is legitimate;
   paying for reviews is not.
3. **GBP Posts during the eleven days** — daily aarti, cultural night,
   mahaprasad, visarjan route. Fresh local signal exactly when search volume for
   "parel ganpati" peaks.
4. **One local news mention with a link.** Worth more than the rest of this list
   combined. The 47th year and the new logo are the hook.

---

## Mobile performance, 26 August 2026

PageSpeed mobile: **Performance 76**, Accessibility 100, Best Practices 96,
SEO 100. FCP 2.6 s, **LCP 4.7 s**, Speed Index 4.7 s, **TBT 50 ms**, **CLS 0**.

The green TBT and CLS are the important part: this site is not slow because of
JavaScript or layout instability. Two guesses were wrong before the report
arrived — framer-motion was suspected (TBT is 50 ms, so no) and then the hero
image (it is 14 KB at 1200w AVIF, so no). The actual top opportunities were:

| Insight | Est. saving |
|---|---|
| Render-blocking requests | **2,070 ms** |
| Use efficient cache lifetimes | 709 KiB |
| Improve image delivery | 117 KiB |
| Legacy JavaScript | 12 KiB |

### Fixed

**Render-blocking stylesheet → inlined.** `experimental.inlineCss` in
`next.config.mjs`. Nothing could paint until a separate 53 KB stylesheet had been
fetched over a high-latency connection; now there is no `<link rel="stylesheet">`
at all. Verified: 0 stylesheet links, 1 inline `<style>`.

*The trade-off, stated plainly:* the homepage HTML goes from 156 KB to 260 KB
uncompressed, and the CSS is no longer separately cacheable, so **repeat**
visitors re-download it with every page. For a festival site where most people
arrive once from a search or a WhatsApp forward, first paint is the right thing
to optimise — but this is an experimental flag and the judgement should be
re-checked against a fresh PageSpeed run. Deleting the `experimental` block
reverts it.

**Two non-composited animations.** The ribbon shimmer animated `left` and the
jubilee progress bar animated `width`; both force layout every frame. Now
`translateX` and `scaleX`, which the compositor handles. Identical visually.

**Font preload was on the wrong family.** `preload: true` sat on Outfit, a Latin
display face, with a comment claiming it was "used by the H1" — true when the
site was English-first. `font-mr` maps to `--font-devanagari`, so the H1, the
tagline, the year badge and the location line all render in **Mukta**, which was
`preload: false`. Swapped.

### Not fixable in code

**Cache lifetimes (709 KiB)** — GitHub Pages sets a short max-age on everything
and gives no control over it. Cloudflare in front fixes this, and would also add
Brotli and HTTP/3, both of which act directly on the render-blocking path. The
config has been sitting in `docs/PLATFORM-CLOUDFLARE.md` since July and closes
six audit issues besides. **This is now the highest-value performance item left,
and it needs no code change.**

### Not yet attempted

- **Improve image delivery (117 KiB)** — likely the advertisement and
  announcement posters, whose sources are 320–380 KB. Worth a pass at the
  variant widths offered for them.
- **Legacy JavaScript (12 KiB)** — a browserslist target would drop transpiled
  polyfills.
- **Forced reflow** — a scroll listener measuring layout, most likely
  `scroll-progress` or `back-to-top`. TBT is already green, so this is cosmetic.

None of the above is verified faster. **Re-run PageSpeed after deploying** — the
numbers here are the only way to know.

# PROJECT STATE — मातोश्री शिवगर्जना Mandal website

**Purpose of this file:** carry context between chats. Keep it in the repo root so it
travels inside every zip. Update it when something material changes.

*Reconstructed 13 Aug 2026 from the project zip (commit `1ca489b`) and the prior thread
"Building a premium React design system".*

---

## 1. What this is

Official website of **मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.)**,
Matoshree S.R.A. CHS, Jerbai Wadia Road, Parel-Bhoiwada, Mumbai 400012.

- Established **1980** · registered **2025** (`F0087088(GBR)`) · **47th year** in 2026
- Golden Jubilee **2029**
- Tagline: **॥ मातोश्रीचा विघ्नहर्ता ॥**
- Live: **https://matoshreechavighnaharta.co.in** (HTTPS, custom domain)
- Repo: `github.com/amold329-del/matoshri-shivgarjana` · branch `main`
- Instagram: `@matoshree.cha.vighnaharta` · phone `+91 77383 37412`
- Email: `matoshreeshivgarjanasarvajanik@gmail.com`

## 2. Stack & deploy

Next.js 15 App Router · React 19 · TypeScript strict · Tailwind · Framer Motion ·
`output: "export"` (fully static, no backend) · `trailingSlash: true`.

GitHub Pages via `.github/workflows/deploy.yml` — push to `main` deploys.
`prebuild` runs `scripts/optimize-images.mjs` + `scripts/build-manifest.mjs`, which
regenerate AVIF/WebP/JPEG variants (400/800/1200w) and `public/image-manifest.json`.
Variants are gitignored, so CI rebuilds them and the first run after a content change
is slower than usual.

**Marathi-first:** `<html lang="mr">`, Marathi metadata and JSON-LD, in-app EN⇄MR
toggle (no locale routing yet — see MCV-004).

## 3. Routes (17 + 404)

home · about · history · gallery · events · news · committee · vargani · registration ·
downloads · contact · sabhasad (coming soon) · faq · terms · procession ·
advertisements · online-donation (coming soon)

Pattern: `page.tsx` (server, exports `buildMetadata`) + `view.tsx` (client UI).
Copy both files when adding a route.

## 4. Content model

All editorial content is bilingual JSON in `/content` — `{ "en": …, "mr": … }`.
16 files: settings, navigation, timeline, stats, social-activities, news, events,
gallery, committee, testimonials, sponsors, downloads, vargani, procession,
advertisements, faq.

`settings.json` holds org identity, countdown target, contact block, how-to-reach,
social links and the tax-exemption block.

## 5. Built so far (chronological)

Initial premium build → custom domain → ॐ favicon, then the real मातोश्रीचा विघ्नहर्ता
emblem → the Mandal's own Ganpati photo as site background (35% strength) → mobile/nav
fixes → 2021/2023/2024/2025 Ganeshotsav galleries + ahawal-sabha photos → SEO and Google
Search Console work → gallery lightbox → 5 new modules (procession, advertisements, FAQ,
terms, online-donation) → AEO/GEO: FAQPage + geo + Festival structured data, AI-crawler
access → premium design-system pass (type scale, cards, buttons, unified rhythm) →
सुवर्ण महोत्सव section with 2029 jubilee countdown + journey progress →
completed-programmes section → full Event structured data → the 46-issue QA remediation
→ **the official logo adopted sitewide** (14 Aug 2026) → **the logo-unveiling
announcement**: a `<LogoUnveiling />` section on the homepage plus a featured newsroom
entry, both built around the unveiling poster.

## 6. Docs in the repo

| File | What it covers |
|---|---|
| `README.md` | setup, content editing, deploy, roadmap, platform notes |
| `QA-FIXES.md` | first audit (14 Jul), fix-by-fix with verification |
| `SEO.md` | Search Console, sitemap, structured data |
| `SECURITY-HEADERS.md` | the headers GitHub Pages can't set |
| `docs/PLATFORM-CLOUDFLARE.md` | Cloudflare setup that closes 6 audit issues |
| `tools/verify.sh` | post-deploy check: routes, headers, canonicals, og:image, a11y |
| `tools/generate-og-image.py` | regenerates `public/og-image.png` (needs Pillow + libraqm) |
| `tools/worker.js` | Cloudflare worker |

Outside the repo, from the prior chat: `QA-remediation-report.md` (hand to Cowork for
retest) and `website-improvement-roadmap.md` (comparison vs Lalbaugcha Raja, GSB, etc.).

## 7. Git state at snapshot

Two commits made locally on top of `origin/main` (= `1ca489b`), **not yet pushed** —
`git push` to deploy:

1. `dec1740` — the official मातोश्रीचा विघ्नहर्ता logo adopted sitewide
2. `5ecf183` — the logo-unveiling announcement (homepage section + featured news entry)
3. sitemap lastmod from git history; /sabhasad/ + /online-donation/ noindexed
4. SEO audit pass: every route through buildMetadata (Next replaces rather than
   merges openGraph, so 14 routes were silently dropping og:type/locale/site_name),
   bilingual titles on 7 routes, gallery images in the sitemap — see
   SEO-AUDIT-2026-08-17.md

`1ca489b` and everything before it is already on GitHub. Whether the Pages workflow
actually published it still needs checking in the Actions tab — earlier in the project,
pushes silently failed to land.

**Brand assets:** master artwork at `brand/logo-master.png`; every served size is
generated by `tools/generate-logo-assets.py` and `tools/generate-og-cards.py`. Derived
web assets carry a gold keyline so the maroon medallion stays visible on the dark navbar
and footer; `KEYLINE_PCT = 0` reverts that.

## 8. Outstanding

**Time-critical — Ganesh Chaturthi is 14 Sep 2026 (~1 month out).**

1. **Contact form endpoint.** `CONTACT_ENDPOINT` in
   `src/components/ui/contact-form.tsx` is `""`, so the form falls back to mailto.
   One Formspree / Web3Forms / Apps Script URL switches it on. Highest-value item left.
2. **Confirm the live site matches `1ca489b`** — check the latest Pages deploy, then run
   `tools/verify.sh https://matoshreechavighnaharta.co.in`.
3. **Cloudflare** — closes MCV-012, 015, 031, 036, 037, 042 (brotli, HTTP/3, security
   headers, cache TTL, `/ABOUT/` case-sensitivity) in one afternoon.
4. **MCV-004 — localized URLs** (`/en`, `/mr` via next-intl). Content is already
   bilingual, so it's mostly routing. Was scheduled for August; September traffic is
   when it pays off.
5. **MCV-041 — trim the homepage.** Deliberately declined; it would remove sections the
   Mandal asked for.
6. **Needs a human/browser:** Lighthouse, axe, screen-reader pass, real-device responsive
   sweep, Safari/Firefox/Edge spot-check. Untested, not broken.
7. **Content:** 80G block is `enabled: false` with a blank registration number — fill it
   in or leave the notice off. Roll `countdown.targetISO` to 2027 after the festival.
8. **Unveiling poster typo:** the third line reads (मातोश्रीचा विध्न‌हर्ता) — ध्न where it
   should be घ्न. Replace `public/announcements/logo-unveiling.jpg` with a corrected
   render; nothing else changes. Page text already spells it correctly.
9. **Indexing (see SEO.md §6).** 8 URLs sat in "Discovered – currently not indexed"
   with Last crawled N/A — never fetched, nothing broken. Sitemap lastmod and the
   placeholder noindex are fixed in code; still by hand: Request Indexing for
   /procession/, /faq/, /registration/, /advertisements/, and get two or three real
   external links.
10. **`<LogoUnveiling />` is temporary furniture.** It sits right after `<Ribbon />` for
   launch visibility. Once the festival starts, move it below `<Countdown />` in
   `src/app/page.tsx`; afterwards drop the section and keep news entry `n-logo-2026`
   as the record.

## 9. Related work in other chats

Sponsorship deck (`Matoshree_Sponsorship_Deck.pptx`, 12 slides), annual donation request
letter, and the A4 police permission letter — same Mandal, separate threads.

## 10. Resuming after a reset

Upload the project zip and say "continue the mandal site work". The sandbox is wiped
between sessions, so the zip is the source of truth — export a fresh one whenever code
changes, and keep this file updated inside it.

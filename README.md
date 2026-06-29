# मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.)
## Matoshri Shivgarjana Sarvajanik Ganeshotsav Mandal — Website (V1.0)

A premium, bilingual (मराठी / English), fully **static** website for a registered Mumbai Ganeshotsav Mandal — established **1980**, registered **2025**, celebrating its **47th year** in **2026**.

Built to feel like a blend of Apple-style minimalism, royal Maharashtrian heritage, and a trustworthy government-portal. No database, no backend, no login — all content lives in editable JSON files and is bundled at build time. It is architected so dynamic features (online vargani, member portal, CMS) can be added later **without a redesign**.

---

## ✨ What's inside

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS with a centralized brand design-system (`tailwind.config.ts` + `src/app/globals.css`)
- **Animation:** Framer Motion (scroll reveals, counters, lightbox)
- **Icons:** lucide-react
- **Theming:** next-themes (light / dark), persisted
- **i18n:** lightweight in-app EN ⇄ MR language switch (no locale routing in V1 — see roadmap)
- **Output:** static export (`output: "export"`) → a plain `out/` folder you can host anywhere

### Pages
Home, About Us, History, Gallery, Events, News, Committee, Know About Vargani, Registration Details, Downloads, Contact Us, and **सभासद (Coming Soon)**. Plus a sticky glassmorphism navbar, language toggle, dark/light toggle, and a full footer.

---

## 🚀 Quick start

Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (http://localhost:3000)
npm run dev

# 3. Build a production static site → ./out
npm run build
```

After `npm run build`, the entire site is in the **`out/`** folder as static HTML/CSS/JS. Upload it to any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any shared cPanel/Apache/Nginx server. No Node runtime is needed in production.

> Tip: to preview the exported build locally, run `npx serve out`.

---

## 🐙 Deploy free on GitHub Pages (automated)

This project ships with a ready GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the site on every push. You don't run any build commands yourself.

**One-time setup:**

1. **Create a repo and push the code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. The workflow runs automatically, and within a minute or two your site is live. Every future `git push` to `main` redeploys it.

**Where it goes live:**
- Repo named `<username>.github.io` → served at `https://<username>.github.io/`
- Any other repo name (e.g. `mandal-site`) → served at `https://<username>.github.io/mandal-site/`

The subpath case is handled automatically — the workflow detects the repo name and sets the correct `basePath`, so CSS, links and assets all resolve correctly. (Locally, `npm run dev` always runs at the root, no prefix.) A `.nojekyll` file is included so GitHub doesn't strip Next.js's `_next/` assets.

**Custom domain (optional):** add your domain in Settings → Pages, create a `CNAME` DNS record, and add a file named `CNAME` (containing just your domain) into the `public/` folder so it's published with the site. With a custom domain the site is served from the root, so no subpath prefix is applied.

> If you'd rather deploy manually instead of via Actions: run `npm run build`, then publish the `out/` folder to a `gh-pages` branch (e.g. with the `gh-pages` npm package). The included `.nojekyll` makes this work too.

---

## ✏️ Editing content (no code needed)

All editorial content is plain JSON under **`/content`**. Every visitor-facing string is bilingual — an object with `en` and `mr` keys:

```json
{ "en": "Welcome", "mr": "स्वागत" }
```

| File | Controls |
| --- | --- |
| `settings.json` | Org name, motto, established/registered years, **registration no.**, **PAN**, countdown target date, contact details, map embed, social links |
| `navigation.json` | The navbar / footer links |
| `timeline.json` | "Our Journey" milestones |
| `stats.json` | Animated counters |
| `social-activities.json` | Social-service cards |
| `news.json` | News & announcements |
| `events.json` | Upcoming / past events |
| `gallery.json` | Gallery items (add `"src"` once you upload photos) |
| `committee.json` | Committee members |
| `testimonials.json` | Testimonials slider |
| `sponsors.json` | Sponsor marquee |
| `downloads.json` | Downloadable documents |
| `vargani.json` | "Know About Vargani" content + fund-utilisation bars |

Edit a value, save, and the dev server hot-reloads. Re-run `npm run build` to publish.

### ⚠️ Replace the placeholders
Several fields ship with **obvious placeholders** that you must replace with real data:
- Registration number `MH/XXXX/2025` and PAN `AAXXX0000X` → `content/settings.json`
- Phone numbers `+91 98XXX XXXXX` → `content/settings.json`
- Address line `[Street / Area Name]` and the Google Maps embed → `content/settings.json`
- Committee member names & phones → `content/committee.json`
- The map embed `src` → paste your own from Google Maps → *Share* → *Embed a map*

---

## 🖼️ Adding images & documents

Drop files into the matching folder under **`/public`**, then reference them from JSON:

- **Photos:** put files in `public/gallery/`, then set `"src": "/gallery/your-photo.jpg"` in `gallery.json`.
- **Logo / hero art / OG image:** `public/images/` → reference as `/images/your-file.png`.
- **PDFs (forms, notices, report):** `public/documents/` → set the `"href"` in `downloads.json` to `/documents/your-file.pdf`.
- **Favicon / app icons:** `public/icons/`.

Until real photos are added, the gallery and committee pages show tasteful gradient placeholders — the layout is already complete.

---

## 🎨 Design system

All brand colors, fonts, radii, shadows, and animations are defined **once** and reused everywhere:
- **Tokens:** `tailwind.config.ts` (brand palette: Maroon, Saffron, Royal Red, Gold, Cream) + theme-aware CSS variables in `src/app/globals.css`.
- **Reusable classes:** `.wrap`, `.card-surface`, `.btn` / `.btn-gold` / `.btn-outline`, `.eyebrow`, `.goldtext`.
- **Shared components:** `PageHero`, `SectionHeading`, `Reveal`, `Counter`, plus original decorative SVGs (`Emblem`, `TempleSilhouette`, `LotusDivider`, `FloatingPetals`) in `src/components/ui/decorations.tsx`.

Typography: **Noto Sans Devanagari** for Marathi (prominent throughout), **Poppins** for display headings, **Inter** for body — all self-hosted via `next/font`.

> Note on imagery: the emblem is an **original** abstract lotus + kalash motif, deliberately not a literal depiction of any deity, so the site carries no copyrighted artwork. Swap in your own registered logo via `public/images/` if you have one.

---

## 📁 Project structure

```
content/                 # ← all editable JSON content (bilingual)
public/                  # ← your images, gallery, documents, icons
src/
  app/
    layout.tsx           # root shell: fonts, metadata, SEO/JSON-LD, providers
    page.tsx             # homepage (composes all sections)
    <route>/page.tsx     # server component (per-page <title>/metadata)
    <route>/view.tsx     # client component (the actual page UI)
    robots.ts, sitemap.ts
  components/
    providers/           # theme + language context
    layout/              # navbar, footer, theme toggle
    ui/                  # PageHero, SectionHeading, Reveal, Counter, decorations
    sections/            # the homepage section blocks
  lib/                   # content getters, i18n dict, date + cn helpers
  types/                 # shared TypeScript content types
```

**Routing convention:** every route is a folder with a server `page.tsx` (which exports `metadata`) that renders a co-located client `view.tsx`. This keeps per-page SEO while still letting pages use the `useLanguage()` hook. If you add a page, copy this two-file pattern.

---

## 🔭 Roadmap / upgrade paths (V2+)

This V1 is intentionally static but **future-ready**:

- **Localized URLs / SSR i18n:** the in-app EN/MR switch can be upgraded to **next-intl** with `/en` and `/mr` route segments. Content is already fully bilingual, so this is mostly a routing change.
- **Real contact form:** the Contact page currently composes a `mailto:` (no backend). Point it at a form service (Formspree, Getform) or an API route when you move off static export.
- **Online Vargani + सभासद portal:** the Membership page is a polished "Coming Soon". Wire it to a backend (auth, payments, receipts) when ready — the design slots in cleanly.
- **Headless CMS:** the `src/lib/content.ts` getters are the single seam — swap their bodies from JSON imports to async CMS fetches and the component API stays identical.

---

## 📦 Two deliverables (why there are two files)

1. **`matoshri-shivgarjana-preview.html`** — a single self-contained HTML file that renders the **homepage** instantly in any browser (and in the chat preview). Great for a quick visual sign-off. It is a static approximation — not the production code.
2. **This Next.js project** — the real, production-grade, editable foundation described above. Use this to actually build and deploy the site.

---

## 📝 License & content

Code scaffold is yours to use and modify for the Mandal. All personal data, registration details, and photographs shown are **placeholders** — replace them with the Mandal's real information before going live.

*Designed with ❤ in Mumbai.*

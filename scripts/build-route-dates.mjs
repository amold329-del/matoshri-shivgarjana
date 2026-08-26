/**
 * Writes content/route-dates.json — the real last-modified date of each route,
 * taken from git history, for src/app/sitemap.ts to serve as <lastmod>.
 *
 * ## Why
 *
 * The sitemap used to emit `new Date()`, so every deploy told Google that all
 * 17 URLs had changed at that instant. Google detects unreliable lastmod and
 * discounts it — and lastmod is the only sitemap field it still uses
 * (`priority` and `changefreq` are ignored). On a young site that needs every
 * crawl signal it can get, that was throwing one away.
 *
 * ## What counts as a change
 *
 * A route's date is the most recent commit touching either the route's own
 * files or the content JSON it renders. Shared layout and component edits are
 * deliberately NOT counted: restyling a button does not make /history/ newer,
 * and claiming otherwise is how a sitemap loses Google's trust in the first
 * place. The homepage is the exception — it surfaces latest news, events and
 * gallery, so it watches all of content/ and the section components.
 *
 * ## Shallow clones
 *
 * `git log` needs real history, so .github/workflows/deploy.yml checks out with
 * fetch-depth: 0. If history is missing anyway (shallow clone, git absent, or
 * an exported tarball), each route falls back to the value already committed in
 * content/route-dates.json rather than to today — a stale-but-true date beats a
 * fresh lie.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";

const OUT = "content/route-dates.json";

/** route -> paths whose history defines its lastmod */
const ROUTES = {
  "/": ["src/app/page.tsx", "src/components/sections", "content"],
  "/about/": ["src/app/about", "content/settings.json", "content/stats.json"],
  "/history/": ["src/app/history", "content/timeline.json"],
  "/gallery/": ["src/app/gallery", "content/gallery.json", "public/gallery"],
  "/events/": ["src/app/events", "content/events.json"],
  "/news/": ["src/app/news", "content/news.json"],
  "/committee/": ["src/app/committee", "content/committee.json"],
  "/procession/": ["src/app/procession", "content/procession.json"],
  "/vargani/": ["src/app/vargani", "content/vargani.json"],
  "/registration/": ["src/app/registration", "content/settings.json"],
  "/advertisements/": ["src/app/advertisements", "content/advertisements.json"],
  "/downloads/": ["src/app/downloads", "content/downloads.json"],
  "/faq/": ["src/app/faq", "content/faq.json"],
  "/contact/": ["src/app/contact", "content/settings.json"],
  "/terms/": ["src/app/terms"],
  // Derived routes. The year pages follow the gallery content and the photos
  // themselves; the article pages follow the news content.
  "/gallery/YEAR/": ["src/app/gallery", "content/gallery.json", "public/gallery"],
  "/news/POST/": ["src/app/news", "content/news.json"],
};

const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};

function lastCommit(paths) {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    // Normalise to UTC so the file reads consistently regardless of the
    // committer's timezone.
    return iso ? new Date(iso).toISOString() : null;
  } catch {
    return null;
  }
}

const dates = {};
let fellBack = 0;

for (const [route, paths] of Object.entries(ROUTES)) {
  const iso = lastCommit(paths) ?? previous[route] ?? null;
  if (!lastCommit(paths) && previous[route]) fellBack++;
  if (iso) dates[route] = iso;
}

fs.writeFileSync(OUT, JSON.stringify(dates, null, 2) + "\n");

const distinct = new Set(Object.values(dates)).size;
console.log(
  `route dates: ${Object.keys(dates).length} routes, ${distinct} distinct` +
    (fellBack ? ` (${fellBack} fell back — no git history?)` : ""),
);

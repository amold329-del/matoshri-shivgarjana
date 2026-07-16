import type { MetadataRoute } from "next";
import { getNav } from "@/lib/content";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Static sitemap built from the navigation manifest (export-safe).
 *
 * Uses the same canonicalUrl() helper the pages use, so every sitemap entry is
 * byte-identical to that page's <link rel="canonical">. Previously this emitted
 * "https://…/about" while the page is served — and now canonicalised — at
 * "https://…/about/", so every entry was a redirect hop, and a sitemap that
 * disagrees with the canonical is a mixed signal to a crawler.
 *
 * No lastmod / changefreq / priority, on purpose:
 *   - Google ignores changefreq and priority outright. Its own docs say so.
 *   - lastmod was `new Date()`, i.e. build time, so every deploy claimed all 13
 *     pages had just changed. Google only honours lastmod when it is verifiably
 *     accurate; a build-time stamp trains it to ignore the field. Omitting it is
 *     better than lying. If you want it back, derive it from real content dates
 *     (news.json / events.json), not from the clock.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getNav().map((item) => ({
    url: canonicalUrl(item.href),
  }));
}

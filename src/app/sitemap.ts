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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getNav().map((item) => ({
    url: canonicalUrl(item.href),
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}

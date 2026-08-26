import type { MetadataRoute } from "next";
import routeDates from "@/../content/route-dates.json";
import galleryItems from "@/../content/gallery.json";
import newsItems from "@/../content/news.json";

export const dynamic = "force-static";

const SITE_URL = "https://matoshreechavighnaharta.co.in";

/**
 * Static sitemap (export-safe). Trailing slashes match the per-page canonicals
 * (trailingSlash: true). Keep this list in sync with the real app/ routes.
 *
 * `lastModified` comes from content/route-dates.json, written at prebuild by
 * scripts/build-route-dates.mjs from real git history. It used to be
 * `new Date()`, which told Google that all 17 URLs changed on every deploy;
 * Google discounts a lastmod that behaves like that, and lastmod is the only
 * field here it still reads — `priority` and `changeFrequency` are ignored by
 * Google and kept only for other crawlers.
 *
 * /sabhasad/ and /online-donation/ are deliberately absent: both are
 * placeholders and both send `robots: noindex`, so listing them would ask for a
 * crawl of pages we are telling Google not to index. Add them back — and drop
 * the noindex in their page.tsx — on the day they go live.
 */
const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/history/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/gallery/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/news/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/committee/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/procession/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vargani/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/registration/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/advertisements/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/downloads/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
];

const dates = routeDates as Record<string, string | undefined>;

/**
 * Photographs listed against /gallery/ so Google Images can discover them.
 * They are real photographs of the Mandal's own Ganeshotsav, each already
 * captioned on the page — this only tells Google where they are, it does not
 * claim anything the page does not.
 */
const galleryImages = (galleryItems as Array<{ type: string; src: string }>)
  .filter((item) => item.type === "photo")
  .map((item) => `${SITE_URL}${item.src}`);

/**
 * Year pages under /gallery/ and article pages under /news/, derived from the
 * same content the routes are generated from — so a new year of photographs or
 * a new article cannot be added to the site and forgotten by the sitemap.
 */
const galleryYears = Array.from(
  new Set((galleryItems as Array<{ year: number }>).map((i) => i.year)),
).sort((a, b) => b - a);

const newsPosts = (
  newsItems as Array<{ id: string; slug?: string; date: string; body?: unknown }>
).filter((item) => item.body);

const derived: MetadataRoute.Sitemap = [
  ...galleryYears.map((year) => ({
    url: `${SITE_URL}/gallery/${year}/`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: (galleryItems as Array<{ year: number; type: string; src: string }>)
      .filter((i) => i.year === year && i.type === "photo")
      .map((i) => `${SITE_URL}${i.src}`),
  })),
  ...newsPosts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug ?? post.id}/`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...derived, ...routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    // Omitted rather than faked if a route has no recorded date.
    ...(dates[path] ? { lastModified: new Date(dates[path] as string) } : {}),
    changeFrequency,
    priority,
    ...(path === "/gallery/" ? { images: galleryImages } : {}),
  }))];
}

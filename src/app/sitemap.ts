import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://matoshreechavighnaharta.co.in";

/**
 * Static sitemap (export-safe). Trailing slashes match the per-page canonicals
 * (trailingSlash: true). Keep this list in sync with the real app/ routes.
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
  { path: "/online-donation/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/registration/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/downloads/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/sabhasad/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { getNav } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://matoshri-shivgarjana.org";

/** Static sitemap built from the navigation manifest (export-safe). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getNav().map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}

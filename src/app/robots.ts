import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Static robots.txt — generated at build time (export-safe). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://matoshri-shivgarjana.org/sitemap.xml",
  };
}

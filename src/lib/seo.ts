import type { Metadata } from "next";

export const SITE_URL = "https://matoshreechavighnaharta.co.in";

/** Default share card. Relative — resolved against metadataBase. */
export const OG_DEFAULT = "/og-cover.jpg";

type BuildArgs = {
  /** Route path with leading and trailing slash, e.g. "/about/". Use "/" for home. */
  path: string;
  title?: string;
  /**
   * Full title, used verbatim instead of running through the root layout's
   * "%s · मातोश्री शिवगर्जना मंडळ" template. For routes that carry a Latin-script
   * clause of their own, where the template would push the title past the
   * ~60-character mark Google displays.
   */
  absoluteTitle?: string;
  description?: string;
  /** Override the share image for this route (relative path). */
  ogImage?: string;
  ogImageAlt?: string;
  robots?: Metadata["robots"];
};

/** English site name, for og:site_name and the Latin-script signal. */
export const SITE_NAME_MR = "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ";

/**
 * Per-route metadata.
 *
 * `metadataBase` is set once in the root layout, so `canonical` and
 * `openGraph.url` are given as relative paths and Next resolves them to
 * absolute URLs. This is what stops all 17 pages canonicalising to "/".
 *
 * `type`, `locale`, `alternateLocale` and `siteName` are repeated here on
 * purpose. Next REPLACES the whole `openGraph` object when a route declares
 * one — it does not deep-merge — so anything set only in the root layout
 * silently disappears from every page that has its own openGraph block. Every
 * route must therefore go through this function, or it loses those four tags.
 */
export function buildMetadata({
  path,
  title,
  absoluteTitle,
  description,
  ogImage = OG_DEFAULT,
  ogImageAlt = "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) — ४७ वे वर्ष",
  robots,
}: BuildArgs): Metadata {
  const images = [
    { url: ogImage, width: 1200, height: 630, alt: ogImageAlt },
  ];

  const resolvedTitle = absoluteTitle ? { absolute: absoluteTitle } : title;

  return {
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "mr_IN",
      alternateLocale: ["en_IN"],
      siteName: SITE_NAME_MR,
      url: path,
      ...(absoluteTitle ? { title: absoluteTitle } : title ? { title } : {}),
      ...(description ? { description } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      ...(absoluteTitle ? { title: absoluteTitle } : title ? { title } : {}),
      ...(description ? { description } : {}),
      images,
    },
    ...(robots ? { robots } : {}),
  };
}

/** BreadcrumbList JSON-LD: Home → current page. */
export function breadcrumbJsonLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "मुख्यपृष्ठ",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

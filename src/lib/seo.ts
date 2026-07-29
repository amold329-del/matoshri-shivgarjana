import type { Metadata } from "next";

export const SITE_URL = "https://matoshreechavighnaharta.co.in";

/** Default share card. Relative — resolved against metadataBase. */
export const OG_DEFAULT = "/og-cover.jpg";

type BuildArgs = {
  /** Route path with leading and trailing slash, e.g. "/about/". Use "/" for home. */
  path: string;
  title?: string;
  description?: string;
  /** Override the share image for this route (relative path). */
  ogImage?: string;
  ogImageAlt?: string;
  robots?: Metadata["robots"];
};

/**
 * Per-route metadata.
 *
 * `metadataBase` is set once in the root layout, so `canonical` and
 * `openGraph.url` are given as relative paths and Next resolves them to
 * absolute URLs. This is what stops all 17 pages canonicalising to "/".
 */
export function buildMetadata({
  path,
  title,
  description,
  ogImage = OG_DEFAULT,
  ogImageAlt = "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) — ४७ वे वर्ष",
  robots,
}: BuildArgs): Metadata {
  const images = [
    { url: ogImage, width: 1200, height: 630, alt: ogImageAlt },
  ];

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      url: path,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
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

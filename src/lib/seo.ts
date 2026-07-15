import type { Metadata } from "next";

/**
 * Single source of truth for per-page canonical / Open Graph metadata.
 *
 * Fixes:
 *   N-20  every inner page canonicalised to the homepage root, because
 *         `alternates: { canonical: SITE_URL }` lived in the root layout and
 *         Next.js inherits it into every child route that doesn't override it.
 *   N-21  same story for `openGraph.url`; plus no og:image / twitter:image at all.
 *   N-26  which is why WhatsApp / Facebook shares had no thumbnail.
 */

export const SITE_URL = "https://matoshreechavighnaharta.co.in";
export const SITE_NAME = "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ";
export const TITLE_SUFFIX = "मातोश्री शिवगर्जना मंडळ";

/** 1200x630 share card in public/. Regenerate with tools/generate-og-image.py. */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ · भोईवाडा, मुंबई",
  type: "image/png",
} as const;

/**
 * next.config.mjs sets `trailingSlash: true`, so /about is served as
 * /about/index.html and crawled as /about/. The canonical has to carry that
 * slash or it points at a URL that only 308-redirects to the real one.
 */
export function canonicalUrl(path: string): string {
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/")) p = `${p}/`;
  return `${SITE_URL}${p}`;
}

type PageSeo = {
  /** Bare page name. The root layout's title.template adds the site suffix. */
  title?: string;
  description: string;
  /** Route path exactly as it appears in content/navigation.json, e.g. "/about". */
  path: string;
};

/**
 * Build a complete per-page Metadata object.
 *
 * Note: Next.js merges metadata *shallowly* — a child's `openGraph` replaces the
 * parent's outright rather than merging into it. So every field openGraph needs
 * has to be repeated here; inheriting half of it from the layout is not an option.
 */
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = canonicalUrl(path);
  const socialTitle = title ? `${title} · ${TITLE_SUFFIX}` : SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,

    // N-20 — self-referencing, one per route.
    alternates: { canonical: url },

    openGraph: {
      type: "website",
      locale: "mr_IN",
      alternateLocale: "en_IN",
      url, // N-21 — was hard-coded to SITE_URL for every page
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [OG_IMAGE], // N-21 / N-26 — the missing thumbnail
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** PWA manifest (MCV-034) — a festival site consulted daily for ten days. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.)",
    short_name: "मातोश्री मंडळ",
    description:
      "१९८० पासून श्रद्धा, एकता आणि सेवा — परेल-भोईवाडा, मुंबई.",
    lang: "mr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#2a0712",
    background_color: "#fbf5e9",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Separate maskable art: Android crops maskable icons to a circle, which
      // would clip the quatrefoil tips off the edge-to-edge "any" icon. This
      // one is inset on cream inside the safe area.
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

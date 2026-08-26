/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  experimental: {
    /**
     * Inline the stylesheet into each page instead of linking it.
     *
     * PageSpeed (mobile, 26 Aug 2026) reported "Render-blocking requests —
     * est. savings 2,070 ms" as the single largest opportunity, with FCP 2.6 s
     * and LCP 4.7 s while TBT sat at 50 ms and CLS at 0. The site was not slow
     * because of JavaScript or images — the hero photograph is 14 KB — but
     * because nothing could paint until a separate 53 KB stylesheet had been
     * fetched over a high-latency mobile connection.
     *
     * Inlining trades a round trip for a larger HTML document. On a link with
     * ~150 ms RTT that is a good trade; verify with a fresh PageSpeed run
     * rather than trusting it, and drop this flag if the numbers disagree.
     */
    inlineCss: true,
  },
};

export default nextConfig;

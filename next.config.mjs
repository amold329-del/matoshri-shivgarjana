/** @type {import('next').NextConfig} */

/*
 * GitHub Pages support.
 * Project sites are served from https://<user>.github.io/<repo>/, so the app
 * must know that "/<repo>" prefix (basePath/assetPrefix) or every asset and
 * link 404s. The deploy workflow sets PAGES_BASE_PATH="/<repo>" automatically.
 *
 * Leave PAGES_BASE_PATH unset for:
 *   - local development (npm run dev)
 *   - a user/org site repo named <user>.github.io
 *   - any custom domain (CNAME)
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  // Fully static output — no server, database, or API required (Version 1.0).
  // Produces an `out/` folder on `npm run build` that can be hosted anywhere.
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Required for static export. Swap to a loader/remotePatterns when a CDN is added.
    unoptimized: true,
  },
  // Exposed to the browser so you can prefix manually-written asset URLs, e.g.
  // src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo.png`}
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

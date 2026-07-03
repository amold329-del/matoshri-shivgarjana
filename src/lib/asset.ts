/**
 * Prefixes a public asset path with the deployment base path.
 *
 * On GitHub Pages the site is served from `/<repo>/`, so a file in `public/`
 * (e.g. `/gallery/photo.jpg`) must be requested as `/<repo>/gallery/photo.jpg`.
 * Next.js does NOT add basePath to raw `<img src>` values, so we do it here.
 *
 * `NEXT_PUBLIC_BASE_PATH` is injected at build time from next.config.mjs
 * (empty locally, `/matoshri-shivgarjana` on GitHub Pages).
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path; // already absolute URL
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

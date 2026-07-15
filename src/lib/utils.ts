import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names while resolving conflicts
 * (later utility wins). Used by all UI primitives.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Is `href` the page currently being viewed?
 *
 * Fixes F-03. `next.config.mjs` sets `trailingSlash: true`, so usePathname()
 * returns "/about/", while content/navigation.json stores "/about". The old
 * `pathname === item.href` was therefore false on every inner page, and true
 * only on the homepage where "/" === "/" — which is exactly the symptom the
 * audit measured: Home gold on /, nothing highlighted anywhere else.
 *
 * Comparison is exact, not prefix-based: a startsWith() match on "/" would
 * light up Home on all 13 routes.
 */
export function isActivePath(pathname: string | null, href: string): boolean {
  const normalise = (p: string) => {
    const clean = (p || "/").split(/[?#]/)[0];
    return clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
  };
  return normalise(pathname ?? "/") === normalise(href);
}

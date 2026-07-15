/**
 * Skip-to-content link — fixes N-17 (WCAG 2.4.1 Bypass Blocks).
 *
 * Without this, a keyboard or screen-reader user has to tab through all 13
 * menu items before reaching the page content, on every one of the 13 pages.
 *
 * Rendered as the first focusable element in <body> (see app/layout.tsx), and
 * targets the <main id="main" tabIndex={-1}> landmark there.
 *
 * Visually hidden until focused: `sr-only` clips it, `focus:not-sr-only`
 * restores it. z-[70] puts it above the sticky navbar (z-50) and the gallery
 * lightbox (z-[60]).
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed focus:left-4 focus:top-4 focus:z-[70]
        focus:rounded-full focus:border focus:border-gold
        focus:bg-maroon-ink focus:px-5 focus:py-3
        focus:font-mr focus:text-sm focus:font-semibold focus:text-gold-light
        focus:shadow-gold focus:outline-none
      "
    >
      मुख्य मजकुराकडे जा
    </a>
  );
}

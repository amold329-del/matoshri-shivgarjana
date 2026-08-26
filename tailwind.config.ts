import type { Config } from "tailwindcss";

/**
 * Royal Maharashtrian heritage design system.
 * Semantic colours are driven by CSS variables (see globals.css) so that
 * light / dark themes flip cleanly via the `.dark` class (next-themes).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (fixed)
        maroon: {
          DEFAULT: "#6b1226",
          deep: "#4a0b19",
          ink: "#2a0712",
        },
        saffron: {
          DEFAULT: "#e07d16",
          bright: "#f59e2c",
        },
        royalred: "#9e1b32",
        gold: {
          DEFAULT: "#c9a227",
          light: "#e6c868",
          bright: "#f3df9a",
        },
        cream: {
          DEFAULT: "#fbf5e9",
          deep: "#f6ecd9",
        },
        // Semantic tokens (theme-aware via CSS vars)
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--text)",
        "ink-soft": "var(--text-soft)",
        card: "var(--card)",
        "card-border": "var(--card-border)",
        hairline: "var(--hairline)",
        // Theme-aware TEXT accents (use these for any text under 24px)
        accent: "var(--accent)",
        "accent-gold": "var(--accent-gold)",
        brand: "var(--brand-text)",
        "on-gold": "var(--on-gold)",
      },
      fontFamily: {
        mr: ["var(--font-devanagari)", "serif"],
        display: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      /* Single z-index scale so layers cannot fight (MCV-010). */
      zIndex: {
        header: "50",
        floating: "60",
        overlay: "90",
        toast: "100",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "28px",
        "3xl": "36px",
      },
      /* Fluid display scale — headings breathe instead of stepping at
         breakpoints, which is what makes large type feel editorial. */
      fontSize: {
        "display-sm": ["clamp(1.6rem,1.2rem+1.8vw,2.4rem)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem,1.4rem+2.6vw,3.2rem)", { lineHeight: "1.14", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2.4rem,1.5rem+3.6vw,4.2rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.8rem,1.6rem+5vw,5.6rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
      },
      /* Elevation ladder: ambient + directional, warm-tinted rather than
         neutral grey, so shadows sit inside the palette. */
      boxShadow: {
        soft: "0 2px 10px rgba(74,11,25,.06)",
        e1: "0 1px 2px rgba(74,11,25,.05), 0 4px 12px -4px rgba(74,11,25,.08)",
        e2: "0 2px 6px rgba(74,11,25,.06), 0 14px 34px -14px rgba(74,11,25,.18)",
        e3: "0 4px 12px rgba(74,11,25,.08), 0 28px 60px -22px rgba(74,11,25,.28)",
        md: "0 14px 40px -12px rgba(74,11,25,.20)",
        gold: "0 0 0 1px rgba(201,162,39,.35), 0 18px 50px -18px rgba(201,162,39,.45)",
        "gold-glow": "0 0 0 1px rgba(201,162,39,.45), 0 10px 30px -8px rgba(201,162,39,.55), 0 0 46px -12px rgba(230,200,104,.45)",
        inset: "inset 0 1px 0 rgba(255,255,255,.35)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        /**
         * Translate, not `left`. Lighthouse flagged this as a non-composited
         * animation: `left` runs on the main thread and forces layout on every
         * frame, while `transform` is handed to the compositor. Same movement,
         * measured from the element's own width (w-1/3), so -180% .. 360%
         * reproduces the old -60% .. 120% of the container.
         */
        shimmer: {
          "0%": { transform: "translateX(-180%)" },
          "55%, 100%": { transform: "translateX(360%)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: ".85" },
          "90%": { opacity: ".7" },
          "100%": { transform: "translateY(108vh) rotate(360deg)", opacity: "0" },
        },
        "scroll-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-dot": {
          "0%": { opacity: "0", transform: "translateY(-3px)" },
          "40%": { opacity: "1" },
          "80%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 4.5s ease-in-out infinite",
        fall: "fall linear infinite",
        "scroll-x": "scroll-x 26s linear infinite",
        "scroll-dot": "scroll-dot 1.6s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

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
      },
      fontFamily: {
        mr: ["var(--font-devanagari)", "serif"],
        display: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "18px",
        "2xl": "28px",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(74,11,25,.06)",
        md: "0 14px 40px -12px rgba(74,11,25,.20)",
        gold: "0 0 0 1px rgba(201,162,39,.35), 0 18px 50px -18px rgba(201,162,39,.45)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        shimmer: {
          "0%": { left: "-60%" },
          "55%, 100%": { left: "120%" },
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

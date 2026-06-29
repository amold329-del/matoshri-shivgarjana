import type { Lang } from "@/lib/i18n";

/**
 * Format an ISO date string for display.
 * Marathi uses the mr-IN locale (Devanagari month names + numerals); English
 * uses en-IN. Falls back to the raw string if parsing fails.
 */
export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

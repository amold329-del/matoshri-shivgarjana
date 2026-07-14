"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Both icons are always rendered and CSS (`dark:` variants) reveals the correct
 * one based on the `html.dark` class that next-themes sets in a blocking script
 * before first paint. This means the right icon is visible immediately — no
 * empty-circle flash — and server/client markup match, so there is no hydration
 * mismatch. The click handler reads the live DOM class, so it works even before
 * React finishes hydrating.
 */
export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle light or dark mode"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border transition-colors",
        onDark
          ? "border-white/25 text-[var(--dark-text)] hover:border-gold hover:text-gold-light"
          : "border-card-border text-ink hover:border-gold hover:text-saffron",
      )}
    >
      {/* Shown in dark mode (tap to switch to light) */}
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
      {/* Shown in light mode (tap to switch to dark) */}
      <Moon className="block h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}

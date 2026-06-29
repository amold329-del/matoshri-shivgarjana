"use client";

import { getSettings } from "@/lib/content";

/**
 * Gold celebration ribbon directly beneath the hero.
 * The shimmer is a single translating highlight (animate-shimmer) — subtle,
 * GPU-friendly, and disabled under prefers-reduced-motion via globals.
 */
export function Ribbon() {
  const { org } = getSettings();

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(120deg,#6b1226,#9e1b32,#6b1226)] py-5">
      {/* shimmer sweep */}
      <span className="pointer-events-none absolute top-0 h-full w-1/3 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(243,223,154,.35),transparent)]" />
      <div className="wrap relative flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-5">
        <p className="font-display text-lg font-bold uppercase tracking-[0.15em] text-gold-light sm:text-xl">
          {org.yearsCount} गौरवशाली वर्षांचा उत्सव
        </p>
        <span className="hidden h-6 w-px bg-gold/40 sm:block" />
        <p className="font-display text-2xl font-extrabold tracking-wider text-cream sm:text-3xl">
          {org.established} <span className="text-gold-light">—</span>{" "}
          {org.anniversaryYear}
        </p>
      </div>
    </div>
  );
}

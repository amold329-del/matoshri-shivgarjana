"use client";

import { useLanguage } from "@/components/providers/language-provider";
import type { Bilingual } from "@/types/content";
import {
  TempleSilhouette,
  FloatingPetals,
} from "@/components/ui/decorations";

/**
 * Compact dark hero used at the top of every inner page. Mirrors the homepage
 * hero's palette (deep maroon, gold glow, temple skyline) so navigation feels
 * cohesive, but is shorter to keep content above the fold.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  marathiTitle,
}: {
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle?: Bilingual;
  marathiTitle?: Bilingual;
}) {
  const { tr } = useLanguage();

  return (
    <header className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_-10%,#5a1024_0%,#2a0712_55%,#1b0410_100%)] pb-24 pt-36 text-center text-[var(--dark-text)]">
      {/* gold glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle,#e6c868,transparent 65%)" }}
      />
      <FloatingPetals count={8} />

      <div className="wrap relative z-10">
        <span className="eyebrow !text-gold-light">{tr(eyebrow)}</span>
        {marathiTitle && (
          <p className="mt-4 font-mr text-xl font-semibold text-gold-light sm:text-2xl">
            {tr(marathiTitle)}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {tr(title)}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] text-[var(--dark-text-soft)]">
            {tr(subtitle)}
          </p>
        )}
      </div>

      {/* temple skyline foot */}
      <TempleSilhouette className="absolute bottom-0 left-0 h-20 w-full text-[#1b0410] opacity-90" />
    </header>
  );
}

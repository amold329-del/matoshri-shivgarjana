"use client";

import { getSponsors } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";

/**
 * Sponsor logo marquee. Logos aren't supplied in V1, so each sponsor renders
 * as a refined name plate. The track is duplicated and translated -50% for a
 * seamless infinite scroll (animate-scroll-x), paused on hover.
 */
export function Sponsors() {
  const sponsors = getSponsors();
  const { tr } = useLanguage();
  const loop = [...sponsors, ...sponsors];

  return (
    <section className="border-y border-card-border bg-bg py-16">
      <div className="wrap">
        <p className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron">
          {tr(dict.sections.sponsors)}
        </p>
      </div>

      <div className="group relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

        <div className="flex w-max animate-scroll-x gap-4 group-hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="flex h-20 min-w-[180px] items-center justify-center rounded-xl border border-card-border bg-surface px-8"
            >
              <span className="text-center">
                <span className="block font-display text-base font-bold text-ink">
                  {s.name}
                </span>
                {s.tier && (
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                    {s.tier}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

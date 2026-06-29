"use client";

import { getStats } from "@/lib/content";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { FloatingPetals } from "@/components/ui/decorations";

/**
 * Animated statistics band on a dark maroon field (reads in both themes).
 * Counters animate once on scroll-in via the Counter primitive.
 */
export function Stats() {
  const stats = getStats();
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#5a1024,#2a0712_70%)] py-24 text-[var(--dark-text)]">
      <FloatingPetals count={9} />
      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow={dict.sections.stats}
          title={dict.sections.statsTitle}
          tone="dark"
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.08}>
              <div className="rounded-2xl border border-gold/25 bg-white/[0.04] p-7 text-center backdrop-blur-sm">
                <p className="font-display text-4xl font-extrabold goldtext sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--dark-text-soft)]">
                  {tr(s.label)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

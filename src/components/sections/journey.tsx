"use client";

import { Sparkles, Award, PartyPopper, Rocket } from "lucide-react";
import { getTimeline } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ICONS = [Sparkles, Award, PartyPopper, Rocket];

/**
 * "Journey Since 1980" — four milestone cards driven by timeline.json.
 * The current year (kind === "current") is highlighted with the gold treatment.
 */
export function Journey() {
  const timeline = getTimeline();
  const { tr } = useLanguage();

  return (
    <section className="bg-surface-2 py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.journey}
          title={dict.sections.journeyTitle}
        />

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line on desktop */}
          <span className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />

          {timeline.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const highlight = item.kind === "current";
            return (
              <Reveal key={item.year} delay={i * 0.1}>
                <article
                  className={cn(
                    "card-surface relative h-full p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md",
                    highlight && "border-gold shadow-gold",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md",
                      highlight
                        ? "bg-[linear-gradient(135deg,#c9a227,#e6c868)] text-maroon-ink"
                        : "bg-[linear-gradient(135deg,#6b1226,#9e1b32)] text-gold-light",
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <p
                    className={cn(
                      "mt-4 font-display text-3xl font-extrabold",
                      highlight ? "goldtext" : "text-maroon",
                    )}
                  >
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-ink">
                    {tr(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {tr(item.body)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

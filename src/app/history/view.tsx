"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTimeline } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HistoryView() {
  const { tr } = useLanguage();
  const timeline = getTimeline();

  return (
    <>
      <PageHero
        eyebrow={{ en: "Our History", mr: "आमचा इतिहास" }}
        title={{ en: "47 Years of Legacy", mr: "४७ वर्षांचा वारसा" }}
        subtitle={{
          en: "Trace our journey from a humble beginning in 1980 to a registered institution today.",
          mr: "१९८० मधील नम्र सुरुवातीपासून आजच्या नोंदणीकृत संस्थेपर्यंतचा आमचा प्रवास.",
        }}
      />

      <section className="bg-bg py-24">
        <div className="wrap max-w-3xl">
          <div className="relative">
            {/* central spine */}
            <span className="absolute bottom-0 left-[27px] top-0 w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-10">
              {timeline.map((item, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={item.year} delay={i * 0.08}>
                    <div
                      className={cn(
                        "relative flex items-start gap-6 sm:w-1/2",
                        left
                          ? "sm:mr-auto sm:flex-row-reverse sm:pr-10 sm:text-right"
                          : "sm:ml-auto sm:pl-10",
                      )}
                    >
                      {/* node */}
                      <span
                        className={cn(
                          "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 font-display text-xs font-bold shadow-md sm:absolute sm:top-1",
                          left ? "sm:-right-7" : "sm:-left-7",
                          item.kind === "current"
                            ? "border-gold bg-gold text-maroon-ink"
                            : "border-gold/50 bg-surface text-saffron",
                        )}
                      >
                        {item.year.length > 4 ? "★" : item.year}
                      </span>
                      <article className="card-surface flex-1 p-6">
                        <p className="font-display text-2xl font-extrabold text-maroon">
                          {item.year}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-bold text-ink">
                          {tr(item.title)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {tr(item.body)}
                        </p>
                      </article>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

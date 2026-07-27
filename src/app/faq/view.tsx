"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getFaq } from "@/lib/content";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function FaqView() {
  const { tr } = useLanguage();
  const faqs = getFaq();
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <>
      <PageHero
        eyebrow={dict.faq.eyebrow}
        title={dict.faq.title}
        subtitle={dict.faq.subtitle}
      />

      <section className="bg-bg section">
        <div className="wrap max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === f.id;
              return (
                <Reveal key={f.id} delay={Math.min(i * 0.04, 0.24)}>
                  {/* Answers stay in the DOM so they are always crawlable. */}
                  <article className="card-surface overflow-hidden p-0">
                    <h2>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : f.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className="font-display text-body-lg font-bold text-ink">
                          {tr(f.q)}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-saffron transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </h2>
                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-body leading-relaxed text-ink-soft">
                          {tr(f.a)}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

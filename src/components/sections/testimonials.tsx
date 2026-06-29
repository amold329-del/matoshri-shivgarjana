"use client";

import { useCallback, useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Testimonials slider with auto-advance + manual controls + dots.
 * Auto-rotation pauses on hover and respects manual navigation.
 */
export function Testimonials() {
  const items = getTestimonials();
  const { tr } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5500);
    return () => clearInterval(id);
  }, [paused, go]);

  const active = items[index];

  return (
    <section className="bg-surface-2 py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.testimonials}
          title={dict.sections.testimonialsTitle}
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <article className="card-surface relative px-7 py-12 text-center sm:px-14">
            <Quote className="mx-auto h-10 w-10 text-gold/40" />
            <p
              key={index}
              className="mt-5 font-display text-lg font-medium leading-relaxed text-ink sm:text-xl"
            >
              “{tr(active.quote)}”
            </p>
            <div className="mt-7">
              <p className="font-display font-bold text-maroon">{active.name}</p>
              <p className="text-sm text-ink-soft">{tr(active.role)}</p>
            </div>
          </article>

          {/* arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute -left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-card-border bg-surface text-ink shadow-soft transition-colors hover:border-gold hover:text-saffron sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute -right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-card-border bg-surface text-ink shadow-soft transition-colors hover:border-gold hover:text-saffron sm:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* dots */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-7 bg-gold" : "w-2 bg-card-border hover:bg-gold/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

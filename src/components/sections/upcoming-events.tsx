"use client";

import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { formatDate } from "@/lib/date";

/** Upcoming-events vertical timeline — homepage preview (next four). */
export function UpcomingEvents() {
  const { tr, lang } = useLanguage();
  const events = getEvents()
    .filter((e) => e.status === "upcoming")
    .slice(0, 4);

  return (
    <section className="bg-surface-2 py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.events}
          title={dict.sections.eventsTitle}
          align="left"
        />

        <div className="relative mx-auto max-w-3xl">
          {/* spine */}
          <span className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />

          <div className="space-y-5">
            {events.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08}>
                <div className="relative flex gap-5 pl-1">
                  <span className="relative z-10 mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 bg-surface text-sm font-bold text-saffron shadow-soft">
                    {new Date(e.date).getDate() || "•"}
                  </span>
                  <article className="card-surface flex-1 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-saffron">
                      {formatDate(e.date, lang)}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-ink">
                      {tr(e.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {tr(e.body)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold" />
                        {tr(e.venue)}
                      </span>
                      {e.time && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold" />
                          {e.time}
                        </span>
                      )}
                    </div>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 pl-16">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-saffron hover:gap-2.5"
            >
              {tr(dict.cta.viewAll)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getEvents } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/content";

export function EventsView() {
  const { tr, lang } = useLanguage();
  const events = getEvents();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => e.status === "upcoming")
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [events],
  );
  const past = useMemo(
    () =>
      events
        .filter((e) => e.status === "past")
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [events],
  );

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <>
      <PageHero
        eyebrow={{ en: "Events", mr: "कार्यक्रम" }}
        title={{ en: "Festival & Programs", mr: "उत्सव आणि कार्यक्रम" }}
        subtitle={{
          en: "From the daily aarti to grand cultural evenings — here is what's happening at the Mandal.",
          mr: "रोजच्या आरतीपासून भव्य सांस्कृतिक संध्याकाळपर्यंत — मंडळात काय घडत आहे ते येथे आहे.",
        }}
      />

      <section className="bg-bg py-20">
        <div className="wrap max-w-4xl">
          {/* Tabs */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-full border border-card-border bg-surface p-1">
              {(["upcoming", "past"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm font-semibold transition-all",
                    tab === key
                      ? "bg-maroon text-cream shadow-sm"
                      : "text-ink-soft hover:text-maroon",
                  )}
                >
                  {key === "upcoming"
                    ? tr({ en: "Upcoming", mr: "आगामी" })
                    : tr({ en: "Past", mr: "मागील" })}
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              {tr({
                en: "Nothing scheduled here right now. Please check back soon.",
                mr: "सध्या येथे काहीही नियोजित नाही. कृपया लवकरच पुन्हा भेट द्या.",
              })}
            </p>
          ) : (
            <div className="relative">
              <span className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent" />
              <div className="space-y-6">
                {list.map((ev, i) => (
                  <Reveal key={ev.id} delay={i * 0.06}>
                    <EventCard ev={ev} lang={lang} tr={tr} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventCard({
  ev,
  lang,
  tr,
}: {
  ev: EventItem;
  lang: "en" | "mr";
  tr: (v: { en: string; mr: string }) => string;
}) {
  return (
    <div className="relative flex gap-5 pl-1">
      <span className="relative z-10 mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold bg-surface text-saffron">
        <CalendarDays className="h-4 w-4" />
      </span>
      <article className="card-surface flex-1 p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-saffron">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(ev.date, lang)}
          </span>
          {ev.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {ev.time}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-ink">
          {tr(ev.title)}
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-3.5 w-3.5 text-maroon" />
          {tr(ev.venue)}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {tr(ev.body)}
        </p>
      </article>
    </div>
  );
}

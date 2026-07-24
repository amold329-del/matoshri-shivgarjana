"use client";

import { CalendarDays, Clock, MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getProcession, getSettings } from "@/lib/content";
import { dict } from "@/lib/i18n";

export function ProcessionView() {
  const { tr } = useLanguage();
  const routes = getProcession();
  const settings = getSettings();

  return (
    <>
      <PageHero
        eyebrow={dict.procession.eyebrow}
        title={dict.procession.title}
        subtitle={{
          en: "Route and timings for the arrival and immersion processions of Ganeshotsav 2026.",
          mr: "गणेशोत्सव २०२६ च्या आगमन व विसर्जन मिरवणुकीचा मार्ग आणि वेळ.",
        }}
      />

      <section className="bg-bg py-20">
        <div className="wrap max-w-4xl space-y-10">
          {routes.map((route, idx) => (
            <Reveal key={route.id} delay={idx * 0.08}>
              <article className="card-surface overflow-hidden p-0">
                {/* header */}
                <header
                  className={
                    route.type === "aagman"
                      ? "bg-[linear-gradient(120deg,#6b1226,#8a1a34)] p-6 text-cream"
                      : "bg-[linear-gradient(120deg,#7d3407,#c2560e)] p-6 text-cream"
                  }
                >
                  <h2 className="font-display text-2xl font-extrabold text-gold-light sm:text-3xl">
                    {tr(route.title)}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gold-light" />
                      {tr(route.dateLabel)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold-light" />
                      {tr(route.timeLabel)}
                    </span>
                  </div>
                </header>

                {/* route steps */}
                <div className="p-6">
                  <p className="mb-5 text-xs font-bold uppercase tracking-widest text-saffron">
                    {tr(dict.procession.route)}
                  </p>
                  <ol className="relative space-y-0">
                    {route.stops.map((stop, i) => {
                      const last = i === route.stops.length - 1;
                      return (
                        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                          {!last && (
                            <span
                              aria-hidden
                              className="absolute left-[13px] top-7 h-full w-0.5 bg-gradient-to-b from-gold/60 to-gold/10"
                            />
                          )}
                          <span
                            className={
                              "relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-extrabold " +
                              (i === 0 || last
                                ? "bg-[linear-gradient(120deg,#e6c868,#c9a227)] text-[#3a1206]"
                                : "border border-gold/50 bg-surface text-saffron")
                            }
                          >
                            {last ? (
                              <MapPin className="h-3.5 w-3.5" />
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span className="pt-0.5 font-mr text-[0.98rem] font-semibold text-ink">
                            {tr(stop)}
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <p className="mt-6 border-t border-card-border pt-4 text-xs text-ink-soft">
                    {tr(dict.procession.note)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="card-surface flex flex-wrap items-center justify-between gap-4 p-6">
              <p className="text-sm text-ink-soft">
                {tr({
                  en: "The Mandal is located in the Matoshree S.R.A. premises, Jerbai Wadia Road, Parel-Bhoiwada.",
                  mr: "मंडळ मातोश्री एस.आर.ए. आवार, जेरबाई वाडिया रोड, परेल-भोईवाडा येथे आहे.",
                })}
              </p>
              <a
                href={settings.contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold inline-flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                {tr(dict.cta.getDirections)}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

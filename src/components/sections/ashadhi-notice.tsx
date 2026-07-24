"use client";

import { CalendarDays, Heart } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { asset } from "@/lib/asset";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Timely announcement banner — Ashadhi Ekadashi banana distribution (25 Jul 2026).
 * Features the Mandal's own poster alongside the key details.
 */
export function AshadhiNotice() {
  const { tr } = useLanguage();
  const poster = asset("/announcements/ashadhi-ekadashi-2026.jpg");
  return (
    <section className="relative overflow-hidden bg-bg py-16">
      {/* soft festive glows */}
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-saffron/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="wrap relative">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gold/30 bg-surface shadow-soft">
          <div className="grid md:grid-cols-2">
            {/* poster (click to view full) */}
            <a
              href={poster}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#f7ecd5]"
              aria-label="आषाढी एकादशी केळी वितरण — पूर्ण चित्र पाहा"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt="आषाढी एकादशीनिमित्त केळी वितरण"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>

            {/* details */}
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-saffron/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-saffron">
                {tr({ en: "Ashadhi Ekadashi · Special Seva", mr: "आषाढी एकादशी · विशेष सेवा" })}
              </span>

              <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {tr({ en: "Banana Distribution", mr: "केळी वितरण" })}
              </h2>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-maroon">
                <CalendarDays className="h-4 w-4" />
                {tr({ en: "Saturday, 25 July 2026", mr: "शनिवार, २५ जुलै २०२६" })}
              </div>

              <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                {tr({
                  en: "On the sacred occasion of Ashadhi Ekadashi, the Mandal will distribute bananas to devotees. All are warmly invited to take part.",
                  mr: "या आषाढी एकादशीच्या पावन निमित्ताने आमच्या मंडळातर्फे भाविकांना केळीचे वितरण केले जाणार आहे. सर्व भाविकांना सहभागी होण्याचे प्रेमळ आमंत्रण.",
                })}
              </p>

              <p className="font-mr text-sm font-semibold text-saffron">
                {tr({ en: "|| Vitthal Vitthal Jai Hari Vitthal · Pundalik Varada Hari Vitthal ||", mr: "॥ विठ्ठल विठ्ठल जय हरी विठ्ठल · पुंडलिक वरदा हरी विठ्ठल ॥" })}
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <Heart className="h-4 w-4 shrink-0 text-maroon" />
                {tr({ en: "A small seva, a great joy — service is our identity.", mr: "लहान सेवा, मोठा आनंद — सेवा हीच आमची ओळख." })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Maximize2, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { asset } from "@/lib/asset";
import type { Bilingual } from "@/types/content";

type Programme = {
  id: string;
  image: string;
  title: Bilingual;
  occasion: Bilingual;
  when: Bilingual;
  note: Bilingual;
};

const PROGRAMMES: Programme[] = [
  {
    id: "keli-vatap-2026",
    image: "/programmes/keli-vatap-2026.jpg",
    title: { en: "Banana Distribution", mr: "केळी वाटप" },
    occasion: { en: "Ashadhi Ekadashi", mr: "आषाढी एकादशी निमित्त" },
    when: { en: "July 2026", mr: "जुलै २०२६" },
    note: {
      en: "Thanks to the cooperation, participation and affection of you all, this seva was completed successfully. May Pandurang grant us the chance to serve the same way next year.",
      mr: "आपल्या सर्वांच्या सहकार्य, सहभाग आणि प्रेमामुळे हा उपक्रम यशस्वी झाला. पांडुरंगाच्या कृपेने पुढील वर्षीही अशीच सेवा करण्याची संधी मिळूदे हीच प्रार्थना.",
    },
  },
  {
    id: "panati-utane-2025",
    image: "/programmes/panati-utane-2025.jpg",
    title: { en: "Panati & Utane Distribution", mr: "पणती व उटणे वाटप" },
    occasion: { en: "Diwali", mr: "दिवाळी निमित्त" },
    when: { en: "2025", mr: "२०२५" },
    note: {
      en: "For Diwali 2025, panati and utane were distributed to all residents of our society. This was possible only because of your love, trust and support.",
      mr: "२०२५ च्या दिवाळीनिमित्त आपल्या सर्व रहिवाशांना पणती व उटणे वाटप कार्यक्रम यशस्वीरीत्या पार पडला. आपल्या प्रेम, विश्वास आणि पाठिंब्यामुळेच हे शक्य झाले.",
    },
  },
];

export function CompletedProgrammes() {
  const { tr } = useLanguage();
  const [zoom, setZoom] = useState<string | null>(null);
  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom, close]);

  return (
    <section className="bg-bg section">
      <div className="wrap">
        <SectionHeading
          eyebrow={{ en: "Seva Completed", mr: "संपन्न उपक्रम" }}
          title={{
            en: "Programmes Successfully Completed",
            mr: "यशस्वीरीत्या संपन्न कार्यक्रम",
          }}
          intro={{
            en: "Seva carried out through the year with the support of our residents and devotees.",
            mr: "रहिवासी व भाविकांच्या सहकार्याने वर्षभर पार पडलेले सेवा उपक्रम.",
          }}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {PROGRAMMES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="card-surface h-full overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => setZoom(p.image)}
                  aria-label={tr({
                    en: `View full poster — ${p.title.en}`,
                    mr: `संपूर्ण पोस्टर पहा — ${p.title.mr}`,
                  })}
                  className="group relative block w-full overflow-hidden bg-maroon-ink"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(p.image)}
                    alt={`${tr(p.title)} — ${tr(p.occasion)}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {tr({ en: "View", mr: "पहा" })}
                  </span>
                </button>

                <div className="p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {tr({ en: "Completed", mr: "यशस्वीरीत्या संपन्न" })}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">
                    {tr(p.title)}
                  </h3>
                  <p className="mt-1 text-body-sm font-semibold text-saffron">
                    {tr(p.occasion)} · {tr(p.when)}
                  </p>
                  <p className="measure mt-3 text-body text-ink-soft">
                    {tr(p.note)}
                  </p>
                  <p className="mt-4 border-t border-card-border pt-3 font-mr text-body-sm font-bold text-maroon dark:text-gold-light">
                    {tr({
                      en: "Our heartfelt thanks!",
                      mr: "मनःपूर्वक धन्यवाद!",
                    })}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-cream"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={asset(zoom)}
              alt=""
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto block max-h-[88vh] w-auto max-w-[min(94vw,64rem)] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Maximize2, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { Lightbox } from "@/components/ui/lightbox";
import { Picture } from "@/components/ui/picture";
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
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);
  const close = useCallback(() => setZoomIdx(null), []);

  // Caption + occasion carried into the dialog (MCV-033).
  const lightboxItems = PROGRAMMES.map((p) => ({
    src: p.image,
    caption: tr(p.title),
    meta: `${tr(p.occasion)} · ${tr(p.when)}`,
  }));

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
                  onClick={() => setZoomIdx(i)}
                  aria-label={tr({
                    en: `View full poster — ${p.title.en}`,
                    mr: `संपूर्ण पोस्टर पहा — ${p.title.mr}`,
                  })}
                  className="group relative block w-full overflow-hidden bg-maroon-ink"
                >
                  <Picture
              src={p.image}
              alt={`${tr(p.title)} — ${tr(p.occasion)}`}
              sizes="(max-width: 768px) 92vw, 46vw"
              fit="cover"
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.8125rem] font-bold uppercase tracking-wider text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {tr({ en: "View", mr: "पहा" })}
                  </span>
                </button>

                <div className="p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {tr({ en: "Completed", mr: "यशस्वीरीत्या संपन्न" })}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">
                    {tr(p.title)}
                  </h3>
                  <p className="mt-1 text-body-sm font-semibold text-accent">
                    {tr(p.occasion)} · {tr(p.when)}
                  </p>
                  <p className="measure mt-3 text-body text-ink-soft">
                    {tr(p.note)}
                  </p>
                  <p className="mt-4 border-t border-card-border pt-3 font-mr text-body-sm font-bold text-brand dark:text-gold-light">
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

      <Lightbox
        items={lightboxItems}
        index={zoomIdx}
        onClose={close}
        onIndexChange={setZoomIdx}
      />
    </section>
  );
}

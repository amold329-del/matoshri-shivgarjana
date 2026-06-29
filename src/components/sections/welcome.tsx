"use client";

import { Target, Eye, ListChecks, Heart, Users, HandHeart } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import type { Bilingual } from "@/types/content";

const PILLARS: {
  icon: React.ComponentType<{ className?: string }>;
  title: Bilingual;
  body: Bilingual;
}[] = [
  {
    icon: Target,
    title: dict.sections.mission,
    body: {
      en: "To celebrate Ganeshotsav with devotion and discipline while uniting our community through faith, culture, and selfless service.",
      mr: "भक्ती आणि शिस्तीने गणेशोत्सव साजरा करताना श्रद्धा, संस्कृती आणि निःस्वार्थ सेवेच्या माध्यमातून समाजाला एकत्र आणणे.",
    },
  },
  {
    icon: Eye,
    title: dict.sections.vision,
    body: {
      en: "To be a model cultural institution that preserves Maharashtrian heritage and drives meaningful social change for generations.",
      mr: "महाराष्ट्रीय वारसा जपणारी आणि पिढ्यानपिढ्या अर्थपूर्ण सामाजिक बदल घडवणारी आदर्श सांस्कृतिक संस्था बनणे.",
    },
  },
  {
    icon: ListChecks,
    title: dict.sections.objectives,
    body: {
      en: "Organise the festival, run year-round social programs, support education and health, and uphold complete transparency.",
      mr: "उत्सवाचे आयोजन, वर्षभर सामाजिक उपक्रम, शिक्षण व आरोग्यासाठी मदत आणि संपूर्ण पारदर्शकता राखणे.",
    },
  },
];

const VALUES: { icon: React.ComponentType<{ className?: string }>; label: Bilingual }[] =
  [
    { icon: Heart, label: { en: "Faith", mr: "श्रद्धा" } },
    { icon: Users, label: { en: "Unity", mr: "एकता" } },
    { icon: HandHeart, label: { en: "Service", mr: "सेवा" } },
  ];

export function Welcome() {
  const { tr } = useLanguage();

  return (
    <section className="bg-bg py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.welcome}
          title={dict.sections.welcomeTitle}
          intro={{
            en: "For over four decades, our Mandal has been a home for devotion and a force for good — bringing people together in celebration and in service.",
            mr: "चार दशकांहून अधिक काळ आमचे मंडळ भक्तीचे घर आणि चांगुलपणाची शक्ती राहिले आहे — लोकांना उत्सवात आणि सेवेत एकत्र आणत आहे.",
          }}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title.en} delay={i * 0.1}>
              <article className="card-surface group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6b1226,#9e1b32)] text-gold-light shadow-soft transition-transform duration-300 group-hover:scale-105">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {tr(p.title)}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
                  {tr(p.body)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Core values */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-card-border bg-surface-2 p-6">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-saffron">
              {tr(dict.sections.coreValues)}
            </span>
            {VALUES.map((v) => (
              <span
                key={v.label.en}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface px-4 py-2 font-display text-sm font-semibold text-ink"
              >
                <v.icon className="h-4 w-4 text-saffron" />
                {tr(v.label)}
                <span className="font-mr text-ink-soft">· {v.label.mr}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

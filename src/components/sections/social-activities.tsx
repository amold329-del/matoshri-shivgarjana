"use client";

import {
  Droplet,
  Stethoscope,
  GraduationCap,
  Trees,
  PartyPopper,
  Flower2,
  HandHeart,
  HeartPulse,
} from "lucide-react";
import { getSocialActivities } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";

/** Map JSON icon keys → Lucide components (keeps content data icon-agnostic). */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  droplet: Droplet,
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  tree: Trees,
  festival: PartyPopper,
  women: Flower2,
  community: HandHeart,
  health: HeartPulse,
};

/** Premium icon-card grid for year-round social service work. */
export function SocialActivities() {
  const items = getSocialActivities();
  const { tr } = useLanguage();

  return (
    <section className="bg-surface-2 py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.social}
          title={dict.sections.socialTitle}
          intro={{
            en: "Devotion extends beyond the festival. Throughout the year we serve those around us — in health, education, and dignity.",
            mr: "भक्ती उत्सवापुरती मर्यादित नाही. वर्षभर आम्ही आरोग्य, शिक्षण आणि सन्मानाच्या क्षेत्रात समाजाची सेवा करतो.",
          }}
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? HandHeart;
            return (
              <Reveal key={item.title.en} delay={(i % 4) * 0.08}>
                <article className="card-surface group flex h-full flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-md">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6b1226,#9e1b32)] text-gold-light shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#c9a227,#e6c868)] group-hover:text-maroon-ink">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {tr(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {tr(item.body)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

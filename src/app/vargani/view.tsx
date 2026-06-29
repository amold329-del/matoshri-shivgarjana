"use client";

import Link from "next/link";
import { ShieldCheck, Users, HeartHandshake, PieChart } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getVargani } from "@/lib/content";
import { dict } from "@/lib/i18n";

const IMPORTANCE_ICONS = [ShieldCheck, Users, HeartHandshake];

const BAR_COLORS = [
  "linear-gradient(90deg,#6b1226,#9e1b32)",
  "linear-gradient(90deg,#9e1b32,#e07d16)",
  "linear-gradient(90deg,#e07d16,#f59e2c)",
  "linear-gradient(90deg,#c9a227,#e6c868)",
];

/** 2026 → २०२६ for the Marathi label. */
function toDevanagariYear(year: number) {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(year)
    .split("")
    .map((d) => map[Number(d)] ?? d)
    .join("");
}

export function VarganiView() {
  const { tr } = useLanguage();
  const v = getVargani();

  return (
    <>
      <PageHero
        eyebrow={{ en: "Transparency", mr: "पारदर्शकता" }}
        title={{ en: "Know About Vargani", mr: "वर्गणीबद्दल जाणून घ्या" }}
        marathiTitle={{ en: "वर्गणी म्हणजे काय?", mr: "" }}
        subtitle={{
          en: "The spirit behind every contribution — and our promise of how it is used.",
          mr: "प्रत्येक देणगीमागील भावना — आणि ती कशी वापरली जाते याचे आमचे वचन.",
        }}
      />

      {/* Intro + What is */}
      <section className="bg-bg py-20">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface h-full p-8">
              <h2 className="font-display text-2xl font-extrabold text-maroon">
                {tr({ en: "The Idea of Vargani", mr: "वर्गणीची संकल्पना" })}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{tr(v.intro)}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface h-full p-8">
              <h2 className="font-display text-2xl font-extrabold text-maroon">
                {tr({ en: "A Bond of Trust", mr: "विश्वासाचा बंध" })}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{tr(v.whatIs)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contribution amount for the year */}
      <section className="bg-bg pb-4">
        <div className="wrap max-w-4xl">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-gold/40 bg-gradient-to-br from-maroon to-maroon-ink p-7 text-cream shadow-gold sm:flex-row sm:p-8">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-light">
                  {tr({ en: `Vargani for ${v.contribution.year}`, mr: `वर्गणी ${toDevanagariYear(v.contribution.year)}` })}
                </p>
                <p className="mt-1 font-mr text-lg text-cream/85">
                  {tr({
                    en: "Suggested contribution per household",
                    mr: "प्रति कुटुंब सुचवलेली वर्गणी",
                  })}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold text-gold-light sm:text-6xl">
                  ₹{v.contribution.amount}
                </span>
                <span className="text-lg font-semibold text-cream/70">/-</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Importance */}
      <section className="bg-surface-2 py-20">
        <div className="wrap">
          <SectionHeading
            eyebrow={{ en: "Why It Matters", mr: "हे का महत्त्वाचे आहे" }}
            title={{ en: "Our Commitments", mr: "आमची वचने" }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {v.importance.map((item, i) => {
              const Icon = IMPORTANCE_ICONS[i % IMPORTANCE_ICONS.length];
              return (
                <Reveal key={item.title.en} delay={i * 0.08}>
                  <article className="card-surface h-full p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-maroon/10 text-maroon">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">
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

      {/* Fund utilisation */}
      <section className="bg-bg py-20">
        <div className="wrap max-w-3xl">
          <SectionHeading
            eyebrow={{ en: "Fund Utilisation", mr: "निधी विनियोग" }}
            title={{ en: "Where Every Rupee Goes", mr: "प्रत्येक रुपया कुठे जातो" }}
            intro={{
              en: "An indicative breakdown of how contributions are allocated each year.",
              mr: "दरवर्षी वर्गणी कशी वाटली जाते याचे सूचक विभाजन.",
            }}
          />
          <div className="card-surface space-y-6 p-8">
            {v.utilisation.map((u, i) => (
              <Reveal key={u.label.en} delay={i * 0.08}>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                    <span className="text-ink">{tr(u.label)}</span>
                    <span className="text-saffron">{u.percent}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-maroon/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${u.percent}%`,
                        background: BAR_COLORS[i % BAR_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
            <p className="flex items-center gap-2 pt-2 text-xs text-ink-soft">
              <PieChart className="h-4 w-4 text-maroon" />
              {tr({
                en: "Figures are illustrative. Audited annual accounts are shared with members.",
                mr: "आकडे उदाहरणादाखल आहेत. लेखापरीक्षित वार्षिक हिशेब सभासदांसोबत सामायिक केले जातात.",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Future-ready notice */}
      <section className="bg-surface-2 pb-24">
        <div className="wrap max-w-3xl">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-maroon to-maroon-ink p-8 text-center text-cream shadow-gold">
            <h3 className="font-display text-xl font-bold text-gold-light">
              {tr({ en: "Pay Vargani Online — Coming Soon", mr: "ऑनलाइन वर्गणी — लवकरच" })}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-cream/85">
              {tr({
                en: "Secure online contribution and instant receipts are planned for a future version. For now, please reach the committee directly.",
                mr: "सुरक्षित ऑनलाइन वर्गणी आणि त्वरित पावत्या भविष्यातील आवृत्तीसाठी नियोजित आहेत. सध्या, कृपया थेट कार्यकारिणीशी संपर्क साधा.",
              })}
            </p>
            <Link href="/contact" className="btn btn-gold mt-5">
              {tr(dict.cta.contactUs)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

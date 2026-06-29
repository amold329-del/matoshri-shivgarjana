"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getNews } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { formatDate } from "@/lib/date";

/** Latest-news preview — three most recent items from news.json. */
export function LatestNews() {
  const { tr, lang } = useLanguage();
  const news = getNews().slice(0, 3);

  return (
    <section className="bg-bg py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.news}
          title={dict.sections.newsTitle}
          align="left"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.1}>
              <article className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* gradient banner with category */}
                <div className="relative flex h-32 items-end bg-[linear-gradient(135deg,#6b1226,#9e1b32)] p-4">
                  <span className="rounded-full bg-black/25 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-gold-light backdrop-blur">
                    {tr(n.category)}
                  </span>
                  {n.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-maroon-ink">
                      ★
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(n.date, lang)}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                    {tr(n.title)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {tr(n.excerpt)}
                  </p>
                  <Link
                    href="/news"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron hover:gap-2.5"
                  >
                    {tr(dict.cta.readMore)} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

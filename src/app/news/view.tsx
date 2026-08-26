"use client";

import { useMemo, useState } from "react";
import { Search, Star, Check } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Picture } from "@/components/ui/picture";
import { useLanguage } from "@/components/providers/language-provider";
import { getNews } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export function NewsView() {
  const { tr, lang } = useLanguage();
  const news = getNews();
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("all");
  const [cat, setCat] = useState<string>("all");

  const featured = news.find((n) => n.featured) ?? news[0];

  // Year archive (MCV-046) — mirrors the gallery filter pattern.
  const years = useMemo(
    () =>
      Array.from(new Set(news.map((n) => n.date.slice(0, 4)))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [news],
  );

  const categories = useMemo(() => {
    const set = new Map<string, { en: string; mr: string }>();
    news.forEach((n) => set.set(n.category.en, n.category));
    return Array.from(set.values());
  }, [news]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return news
      .filter((n) => (cat === "all" ? true : n.category.en === cat))
      .filter((n) => (year === "all" ? true : n.date.startsWith(year)))
      .filter((n) => {
        if (!q) return true;
        return (
          n.title.en.toLowerCase().includes(q) ||
          n.title.mr.includes(query.trim()) ||
          n.excerpt.en.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [news, cat, query, year]);

  return (
    <>
      <PageHero
        eyebrow={{ en: "Newsroom", mr: "बातम्या" }}
        title={{ en: "Announcements & Updates", mr: "घोषणा आणि अद्यतने" }}
        subtitle={{
          en: "Stay informed about festival notices, social drives and Mandal decisions.",
          mr: "उत्सवाच्या सूचना, सामाजिक उपक्रम आणि मंडळाच्या निर्णयांबद्दल माहिती मिळवा.",
        }}
      />

      <section className="bg-bg section">
        <div className="wrap max-w-5xl">
          {/* Featured */}
          {featured && (
            <Reveal>
              <article className="mb-12 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-maroon to-maroon-ink text-cream shadow-gold">
                {featured.image && (
                  <Picture
                    src={featured.image}
                    alt={tr(featured.title)}
                    sizes="(max-width: 1024px) 92vw, 880px"
                    priority
                    className="block border-b border-gold/25"
                    imgClassName="block h-auto w-full"
                  />
                )}
                <div className="p-8 sm:p-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold-light">
                  <Star className="h-3.5 w-3.5" />
                  {tr({ en: "Featured", mr: "वैशिष्ट्यीकृत" })}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-light/80">
                  {tr(featured.category)} · {formatDate(featured.date, lang)}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  {tr(featured.title)}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/85">
                  {tr(featured.excerpt)}
                </p>
                </div>
              </article>
            </Reveal>
          )}

          {/* Controls */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="group" aria-label={tr({ en: "Filter news by category", mr: "प्रकारानुसार गाळा" })} className="flex flex-wrap gap-2">
              <Chip active={cat === "all"} onClick={() => setCat("all")}>
                {tr({ en: "All", mr: "सर्व" })}
              </Chip>
              {categories.map((c) => (
                <Chip
                  key={c.en}
                  active={cat === c.en}
                  onClick={() => setCat(c.en)}
                >
                  {tr(c)}
                </Chip>
              ))}
            </div>

            {/* year archive */}
            <div
              role="group"
              aria-label={tr({ en: "Filter news by year", mr: "वर्षानुसार गाळा" })}
              className="mt-3 flex flex-wrap items-center justify-center gap-2"
            >
              <Chip active={year === "all"} onClick={() => setYear("all")}>
                {tr({ en: "All years", mr: "सर्व वर्षे" })}
              </Chip>
              {years.map((y) => (
                <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                  {y}
                </Chip>
              ))}
            </div>
            <label className="relative flex items-center sm:w-64">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr({ en: "Search news…", mr: "बातम्या शोधा…" })}
                className="w-full rounded-full border border-card-border bg-surface py-2 pl-9 pr-4 text-sm text-ink outline-none transition-colors focus:border-gold"
              />
            </label>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              {tr({ en: "No matching news.", mr: "जुळणाऱ्या बातम्या नाहीत." })}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 0.06}>
                  <article className="card-surface flex h-full flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {tr(n.category)}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                      {tr(n.title)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {tr(n.excerpt)}
                    </p>
                    <div className="mt-4 border-t border-card-border pt-3">
                      <time className="text-xs text-ink-soft">
                        {formatDate(n.date, lang)}
                      </time>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
        <Reveal delay={0.1}>
            <ShareButtons
              path="/news/"
              title={tr({
                en: "Latest updates — Matoshree Shivgarjana Ganeshotsav Mandal",
                mr: "ताज्या घडामोडी — मातोश्री शिवगर्जना गणेशोत्सव मंडळ",
              })}
              className="wrap mt-4 border-t border-card-border pt-8"
            />
          </Reveal>
        </section>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all",
        active
          ? // non-colour affordance: heavier border + check glyph (WCAG 1.4.1)
            "border-2 border-gold bg-gold/15 text-accent"
          : "border border-card-border text-ink-soft hover:border-gold hover:text-accent",
      )}
    >
      {active && <Check aria-hidden className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}

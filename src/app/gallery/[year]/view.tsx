"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { useLanguage } from "@/components/providers/language-provider";
import { getGallery } from "@/lib/content";

const DEVANAGARI_DIGITS = "०१२३४५६७८९";
const toMarathiDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);

export function GalleryYearView({
  year,
  allYears,
}: {
  year: number;
  allYears: number[];
}) {
  const { tr, lang } = useLanguage();
  const items = getGallery().filter((item) => item.year === year);
  const label = lang === "mr" ? toMarathiDigits(year) : String(year);

  return (
    <section className="section bg-bg">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">
            {tr({ en: "Photo Gallery", mr: "छायाचित्र संग्रह" })}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-display-md font-extrabold text-ink">
            {tr({
              en: `Ganeshotsav ${label}`,
              mr: `गणेशोत्सव ${label}`,
            })}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="measure mt-4 text-body-lg text-ink-soft">
            {tr({
              en: `${items.length} photographs from the Mandal's Ganeshotsav in ${label} at Parel-Bhoiwada, Mumbai — the idol, the mandap, the processions and the Mandal's social work.`,
              mr: `परेल-भोईवाडा, मुंबई येथील मंडळाच्या गणेशोत्सव ${label} मधील ${toMarathiDigits(items.length)} छायाचित्रे — मूर्ती, मंडप, मिरवणूक आणि सामाजिक कार्य.`,
            })}
          </p>
        </Reveal>

        {/* Sibling years, as real links rather than filter state. */}
        <Reveal delay={0.14}>
          <nav
            aria-label={tr({ en: "Other years", mr: "इतर वर्षे" })}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {allYears.map((y) =>
              y === year ? (
                <span
                  key={y}
                  aria-current="page"
                  className="rounded-full border border-gold/50 bg-gold/15 px-4 py-1.5 text-body-sm font-bold text-ink"
                >
                  {lang === "mr" ? toMarathiDigits(y) : y}
                </span>
              ) : (
                <Link
                  key={y}
                  href={`/gallery/${y}`}
                  className="rounded-full border border-card-border px-4 py-1.5 text-body-sm font-semibold text-ink-soft transition-colors hover:border-gold/50 hover:text-ink"
                >
                  {lang === "mr" ? toMarathiDigits(y) : y}
                </Link>
              ),
            )}
          </nav>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={Math.min(index * 0.03, 0.3)}>
                <figure className="card-surface overflow-hidden p-0">
                  {item.src ? (
                    <Picture
                      src={item.src}
                      alt={`${tr(item.caption)} — ${tr({
                        en: `Matoshree Shivgarjana Ganeshotsav ${label}, Parel-Bhoiwada`,
                        mr: `मातोश्री शिवगर्जना गणेशोत्सव ${label}, परेल-भोईवाडा`,
                      })}`}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                      className="block"
                      imgClassName="block aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="aspect-[4/3] w-full bg-[linear-gradient(135deg,#6b1226,#2a0712)]"
                    />
                  )}
                  <figcaption className="px-4 py-3">
                    <span className="block font-mr text-body-sm font-bold text-ink">
                      {tr(item.caption)}
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide text-accent">
                      {tr(item.category)}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="/gallery" className="btn btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              {tr({ en: "All photographs", mr: "संपूर्ण गॅलरी" })}
            </Link>
            <Link href="/events" className="btn btn-ghost">
              {tr({ en: "Ganeshotsav 2026 programme", mr: "गणेशोत्सव २०२६ कार्यक्रम" })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <ShareButtons
            path={`/gallery/${year}/`}
            title={tr({
              en: `Ganeshotsav ${label} photos — Matoshree Shivgarjana, Parel`,
              mr: `गणेशोत्सव ${label} छायाचित्रे — मातोश्री शिवगर्जना, परेल`,
            })}
            className="mt-10 border-t border-card-border pt-8"
          />
        </Reveal>
      </div>
    </section>
  );
}

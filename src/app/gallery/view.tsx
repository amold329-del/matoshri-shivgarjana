"use client";

import Link from "next/link";

import { useMemo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon, Play, Check } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { useLanguage } from "@/components/providers/language-provider";
import { getGallery } from "@/lib/content";
import { asset } from "@/lib/asset";
import { Picture } from "@/components/ui/picture";
import { Lightbox } from "@/components/ui/lightbox";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

/** Deterministic gradients so placeholder tiles read as intentional design. */
const GRADIENTS = [
  "linear-gradient(135deg,#6b1226,#9e1b32)",
  "linear-gradient(135deg,#9e1b32,#e07d16)",
  "linear-gradient(135deg,#4a0b19,#6b1226)",
  "linear-gradient(135deg,#c9a227,#e6c868)",
  "linear-gradient(135deg,#e07d16,#f59e2c)",
  "linear-gradient(135deg,#2a0712,#5a1024)",
];

export function GalleryView() {
  const all = getGallery();
  const { tr } = useLanguage();
  const [year, setYear] = useState<number | "all">("all");
  const [shown, setShown] = useState(12);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const years = useMemo(
    () => Array.from(new Set(all.map((g) => g.year))).sort((a, b) => b - a),
    [all],
  );

  const filtered = useMemo(
    () => (year === "all" ? all : all.filter((g) => g.year === year)),
    [all, year],
  );
  const visible = filtered.slice(0, shown);

  const close = useCallback(() => setActiveIdx(null), []);

  // Caption + position are carried into the dialog (MCV-033).
  // Placeholder tiles carry no photograph, so they are not paged through.
  const lightboxItems = filtered
    .filter((i): i is typeof i & { src: string } => Boolean(i.src))
    .map((i) => ({
      src: i.src,
      caption: tr(i.caption),
      meta: `${tr(i.category)} · ${i.year}`,
    }));

  const active = activeIdx === null ? null : filtered[activeIdx];

  return (
    <>
      <PageHero
        eyebrow={{ en: "Gallery", mr: "गॅलरी" }}
        title={{ en: "Moments of Celebration", mr: "उत्सवाचे क्षण" }}
        subtitle={{
          en: "A glimpse of our festivals, processions and the people who make every year unforgettable.",
          mr: "आमचे उत्सव, मिरवणुका आणि दरवर्षी अविस्मरणीय बनवणाऱ्या लोकांची एक झलक.",
        }}
      />

      <section className="bg-bg section">
        <div className="wrap">
          {/* Year filter */}
          <div role="group" aria-label={tr({ en: "Filter gallery by year", mr: "वर्षानुसार गाळा" })} className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <Chip
              active={year === "all"}
              onClick={() => {
                setYear("all");
                setShown(12);
              }}
            >
              {tr({ en: "All Years", mr: "सर्व वर्षे" })}
            </Chip>
            {years.map((y) => (
              <Chip
                key={y}
                active={year === y}
                onClick={() => {
                  setYear(y);
                  setShown(12);
                }}
              >
                {y}
              </Chip>
            ))}
          </div>

          {/*
            The chips above are client state, so those views have no URL. These
            are real links to the per-year pages — how Google (and anyone sharing
            "the 2025 photos") reaches a single year.
          */}
          <nav
            aria-label={tr({ en: "Browse by year", mr: "वर्षानुसार पहा" })}
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm"
          >
            <span className="font-semibold text-ink-soft">
              {tr({ en: "Open a year:", mr: "वर्ष उघडा:" })}
            </span>
            {years.map((y) => (
              <Link
                key={y}
                href={`/gallery/${y}`}
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                {tr({ en: `Ganeshotsav ${y}`, mr: `गणेशोत्सव ${y}` })}
              </Link>
            ))}
          </nav>

          {/* Masonry grid */}
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {visible.map((item, i) => (
              <Reveal key={item.id} delay={(i % 4) * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(filtered.indexOf(item))}
                  className="group relative block w-full overflow-hidden rounded-xl border border-card-border text-left"
                  style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : "4 / 3" }}
                >
                  {item.src ? (
                    <Picture
                      src={item.src}
                      alt={tr(item.caption)}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
                      className="block h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <span
                      className="flex h-full w-full items-center justify-center"
                      style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                    >
                      {item.type === "video" ? (
                        <Play className="h-8 w-8 text-white/70" />
                      ) : (
                        <ImageIcon className="h-7 w-7 text-white/55" />
                      )}
                    </span>
                  )}
                  {item.type === "video" && item.src && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-black/45 backdrop-blur-sm">
                        <Play className="h-5 w-5 text-white" />
                      </span>
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xs font-semibold text-cream">
                      {tr(item.caption)}
                    </span>
                  </span>
                  <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[0.8125rem] font-semibold text-cream/90 backdrop-blur-sm">
                    {item.year}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="py-16 text-center text-ink-soft">
              {tr({
                en: "No items for this year yet.",
                mr: "या वर्षासाठी अद्याप काही नाही.",
              })}
            </p>
          )}

          {shown < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + 8)}
                className="btn btn-outline"
              >
                {tr(dict.cta.loadMore)}
              </button>
            </div>
          )}
        </div>
        <Reveal delay={0.1}>
            <ShareButtons
              path="/gallery/"
              title={tr({
                en: "Ganeshotsav photo gallery — Matoshree Shivgarjana, Parel",
                mr: "गणेशोत्सव गॅलरी — मातोश्री शिवगर्जना, परेल",
              })}
              className="wrap mt-4 border-t border-card-border pt-8"
            />
          </Reveal>
        </section>

      {/* Lightbox — shared accessible dialog (MCV-009/010/033) */}
      <Lightbox
        items={lightboxItems}
        index={activeIdx}
        onClose={close}
        onIndexChange={setActiveIdx}
      />
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

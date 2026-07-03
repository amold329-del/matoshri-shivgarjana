"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { X, ArrowRight, ImageIcon } from "lucide-react";
import { getGallery } from "@/lib/content";
import { asset } from "@/lib/asset";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

/** Deterministic gradient per item so placeholders look intentional, not broken. */
const GRADIENTS = [
  "linear-gradient(135deg,#6b1226,#9e1b32)",
  "linear-gradient(135deg,#9e1b32,#e07d16)",
  "linear-gradient(135deg,#4a0b19,#6b1226)",
  "linear-gradient(135deg,#c9a227,#e6c868)",
  "linear-gradient(135deg,#e07d16,#f59e2c)",
  "linear-gradient(135deg,#2a0712,#5a1024)",
];

/**
 * Homepage gallery preview.
 * Year filter chips + "Load More" + click-to-zoom lightbox. When an item has
 * no real `src`, a labelled gradient tile is shown so the layout is complete
 * before photos are dropped into /public/gallery.
 */
export function GalleryPreview() {
  const all = getGallery();
  const { tr } = useLanguage();
  const [year, setYear] = useState<number | "all">("all");
  const [shown, setShown] = useState(8);
  const [active, setActive] = useState<GalleryItem | null>(null);

  const years = useMemo(
    () => Array.from(new Set(all.map((g) => g.year))).sort((a, b) => b - a),
    [all],
  );

  const filtered = useMemo(
    () => (year === "all" ? all : all.filter((g) => g.year === year)),
    [all, year],
  );
  const visible = filtered.slice(0, shown);

  return (
    <section className="bg-bg py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.gallery}
          title={dict.sections.galleryTitle}
        />

        {/* Year filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <FilterChip
            active={year === "all"}
            onClick={() => {
              setYear("all");
              setShown(8);
            }}
          >
            {tr({ en: "All", mr: "सर्व" })}
          </FilterChip>
          {years.map((y) => (
            <FilterChip
              key={y}
              active={year === y}
              onClick={() => {
                setYear(y);
                setShown(8);
              }}
            >
              {y}
            </FilterChip>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.06}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-xl border border-card-border text-left"
                style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : "4 / 3" }}
              >
                {item.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(item.src)}
                    alt={tr(item.caption)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                  >
                    <ImageIcon className="h-7 w-7 text-white/55" />
                  </span>
                )}
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-semibold text-cream">
                    {tr(item.caption)}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {shown < filtered.length && (
            <button
              type="button"
              onClick={() => setShown((s) => s + 8)}
              className="btn btn-outline"
            >
              {tr(dict.cta.loadMore)}
            </button>
          )}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-saffron hover:gap-2.5"
          >
            {tr(dict.cta.viewAll)} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <figure
            className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(active.src)}
                alt={tr(active.caption)}
                className="h-full w-full object-contain"
              />
            ) : (
              <div
                className="flex aspect-video items-center justify-center"
                style={{ background: GRADIENTS[0] }}
              >
                <ImageIcon className="h-14 w-14 text-white/50" />
              </div>
            )}
            <figcaption className="bg-maroon-ink p-4 text-center text-sm text-cream">
              {tr(active.caption)} · {active.year}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function FilterChip({
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
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-semibold transition-all",
        active
          ? "border-gold bg-gold/15 text-saffron"
          : "border-card-border text-ink-soft hover:border-gold hover:text-saffron",
      )}
    >
      {children}
    </button>
  );
}

"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getGallery } from "@/lib/content";
import { asset } from "@/lib/asset";
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
  const next = useCallback(
    () => setActiveIdx((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setActiveIdx((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, close, next, prev]);

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

      <section className="bg-bg py-20">
        <div className="wrap">
          {/* Year filter */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
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
                  <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[0.65rem] font-semibold text-cream/90 backdrop-blur-sm">
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
      </section>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
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
                style={{ background: GRADIENTS[(activeIdx ?? 0) % GRADIENTS.length] }}
              >
                <ImageIcon className="h-14 w-14 text-white/50" />
              </div>
            )}
            <figcaption className="bg-maroon-ink p-4 text-center text-sm text-cream">
              {tr(active.caption)} · {tr(active.category)} · {active.year}
            </figcaption>
          </figure>
        </div>
      )}
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

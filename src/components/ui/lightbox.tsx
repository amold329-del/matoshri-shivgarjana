"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { useLanguage } from "@/components/providers/language-provider";

export type LightboxItem = {
  src: string;
  /** Rendered caption — also supplies the dialog's accessible name. */
  caption: string;
  /** Optional secondary line (category · year). */
  meta?: string;
};

/**
 * Accessible lightbox (MCV-009, MCV-010, MCV-033).
 *
 * Uses the native <dialog> element via showModal(), which gives us for free:
 *   • role="dialog" + aria-modal semantics
 *   • a real focus trap and focus restoration to the trigger
 *   • an inert background
 *   • top-layer stacking, so nothing can paint above it — this is what
 *     fixes the back-to-top (z-65) and scroll-progress (z-70) bleed-through
 *
 * Body scroll is locked while open, and paging is wired to
 * ArrowLeft / ArrowRight / Home / End.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  /** null = closed */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const { tr } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  // open/close the native dialog in step with the `index` prop
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // lock background scroll + hide floating chrome while open (MCV-010)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-modal-open", "true");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.removeAttribute("data-modal-open");
    };
  }, [open]);

  // keyboard paging (Escape is handled natively by <dialog>)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        onIndexChange(0);
      } else if (e.key === "End") {
        e.preventDefault();
        onIndexChange(items.length - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onIndexChange, items.length]);

  const active = index === null ? null : items[index];
  const many = items.length > 1;

  return (
    <dialog
      ref={ref}
      aria-label={active?.caption ?? tr({ en: "Photograph", mr: "छायाचित्र" })}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        // click on the backdrop (the dialog itself) closes
        if (e.target === ref.current) onClose();
      }}
      className="lightbox"
    >
      {active && (
        <figure className="relative m-0 flex max-h-[92vh] flex-col items-center">
          <Picture
            src={active.src}
            alt={active.caption}
            sizes="(max-width: 1024px) 92vw, 960px"
            fit="contain"
            priority
            className="block"
            imgClassName="mx-auto block max-h-[76vh] w-auto max-w-[min(92vw,60rem)] rounded-xl object-contain"
          />

          <figcaption className="mt-3 w-full max-w-[min(92vw,60rem)] rounded-xl bg-maroon-ink/90 px-4 py-3 text-center text-cream">
            <span className="block font-mr text-body">{active.caption}</span>
            {active.meta && (
              <span className="mt-0.5 block text-body-sm text-gold-light">
                {active.meta}
              </span>
            )}
            {many && (
              <span className="mt-1 block text-body-sm text-cream/70">
                {tr({
                  en: `${(index ?? 0) + 1} of ${items.length}`,
                  mr: `${items.length} पैकी ${(index ?? 0) + 1}`,
                })}
              </span>
            )}
          </figcaption>
        </figure>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={tr({ en: "Close", mr: "बंद करा" })}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-sm transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={tr({ en: "Previous photograph", mr: "मागील छायाचित्र" })}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-sm transition hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={tr({ en: "Next photograph", mr: "पुढील छायाचित्र" })}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-sm transition hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </dialog>
  );
}

"use client";

import { useEffect, type RefObject } from "react";

/**
 * Modal accessibility primitives — fixes N-13.
 *
 * The gallery lightbox already handles Esc and arrow keys (F-15/F-16 pass).
 * What the audit found missing was dialog semantics, focus management and a
 * background scroll lock. These two hooks cover the last two.
 */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
  );
}

/**
 * Move focus into `containerRef` while `active`, keep Tab inside it, and put
 * focus back where it came from on close.
 *
 * That last part is the keyboard equivalent of F-17 ("closing returns to the
 * grid at the right place") — focus returns to the thumbnail that was clicked,
 * not to the top of the document.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    (initialFocusRef?.current ?? focusableWithin(container)[0] ?? container).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const nodes = focusableWithin(container);
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;

      if (!current || !container.contains(current)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Capture phase, so this runs ahead of the component's own key handlers.
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (restoreTo && typeof restoreTo.focus === "function") restoreTo.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}

/**
 * Lock background scroll while `locked`.
 *
 * Uses `overflow: hidden` rather than the common `position: fixed` trick on
 * purpose: `position: fixed` discards the scroll offset, which would regress
 * F-17 ("grid shown at prior scroll position") — currently a Pass. Trading a
 * passing check for a failing one to close a Low is a bad deal.
 *
 * The padding compensation stops the page jogging sideways as the scrollbar
 * disappears on desktop. Previous values are saved and restored rather than
 * reset to "", so this composes with the navbar's own mobile-sheet lock.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const existing = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${existing + scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}

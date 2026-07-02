"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Count-up number that animates the first time it scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve; respects reduced motion
 * by snapping straight to the final value.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1800,
  plain = false,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  /** Render the value verbatim (no thousands separator, no count-up) — e.g. a year. */
  plain?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (plain) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce, plain]);

  return (
    <span ref={ref} className={className}>
      {plain ? value : display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

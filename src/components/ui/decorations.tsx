"use client";

import { useEffect, useState } from "react";

/**
 * Original, respectful decorative SVGs.
 *
 * The emblem is an abstract lotus + kalash motif — deliberately NOT a literal
 * depiction of a deity. This keeps the mark original (no copyrighted artwork)
 * while still reading as devotional and Maharashtrian.
 */

export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Mandal emblem"
      fill="none"
    >
      <defs>
        <linearGradient id="emb-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6c868" />
          <stop offset="0.5" stopColor="#c9a227" />
          <stop offset="1" stopColor="#9e7d12" />
        </linearGradient>
      </defs>
      {/* outer ring */}
      <circle cx="32" cy="32" r="29" stroke="url(#emb-g)" strokeWidth="2" />
      {/* kalash dome */}
      <path
        d="M32 14c4 4 6 7 6 10 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-3 2-6 6-10z"
        fill="url(#emb-g)"
      />
      {/* lotus petals */}
      <g fill="url(#emb-g)" opacity="0.95">
        <path d="M32 50c-2-6-7-9-13-9 3 6 7 9 13 9z" />
        <path d="M32 50c2-6 7-9 13-9-3 6-7 9-13 9z" />
        <path d="M32 50c0-6-3-11-8-14 0 6 3 11 8 14z" />
        <path d="M32 50c0-6 3-11 8-14 0 6-3 11-8 14z" />
        <path d="M32 50V34" stroke="url(#emb-g)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Temple skyline silhouette used along the foot of dark hero sections. */
export function TempleSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {/* central shikhara */}
        <path d="M700 40c6 10 10 16 10 24h20c0 8 6 14 10 22h-100c4-8 10-14 10-22h20c0-8 4-14 10-24z" />
        <path d="M660 96h80l14 30H646z" />
        <rect x="646" y="124" width="148" height="96" />
        {/* side towers */}
        <path d="M560 110c5 8 9 13 9 20h70c0-7 4-12 9-20l16 36H544z" />
        <rect x="544" y="144" width="160" height="76" opacity="0.95" />
        <path d="M740 110c5 8 9 13 9 20h70c0-7 4-12 9-20l16 36H724z" />
        <rect x="736" y="144" width="160" height="76" opacity="0.95" />
        {/* flanking domes */}
        <path d="M430 150a40 40 0 0 1 80 0v70h-80z" opacity="0.85" />
        <path d="M930 150a40 40 0 0 1 80 0v70h-80z" opacity="0.85" />
        {/* far rooflines */}
        <path d="M250 180c30-26 70-26 100 0v40H250z" opacity="0.7" />
        <path d="M1090 180c30-26 70-26 100 0v40h-100z" opacity="0.7" />
        <rect x="0" y="200" width="1440" height="20" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Temple-inspired gold divider with a central lotus bud. */
export function LotusDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className ?? ""}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg viewBox="0 0 40 28" className="h-5 w-7 text-gold" fill="none">
        <path
          d="M20 4c2 6 7 10 13 10-2 6-8 9-13 9s-11-3-13-9c6 0 11-4 13-10z"
          fill="currentColor"
          opacity="0.9"
        />
        <path d="M20 4v19" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}

/**
 * Gently falling gold petals for dark hero backgrounds.
 * Generated client-side after mount so SSR markup stays clean and the
 * randomized positions never cause hydration mismatches.
 */
export function FloatingPetals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<
    { left: number; delay: number; dur: number; size: number; rot: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 9,
      dur: 9 + Math.random() * 8,
      size: 8 + Math.random() * 10,
      rot: Math.random() * 360,
    }));
    setPetals(arr);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
            <path
              d="M10 1c3 5 8 6 8 10s-5 8-8 8-8-4-8-8 5-5 8-10z"
              fill="rgba(230,200,104,.7)"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

"use client";

import { asset } from "@/lib/asset";
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset("/logo-emblem.png")}
      alt="मातोश्रीचा विघ्नहर्ता — मातोश्री शिवगर्जना मंडळ"
      className={className}
    />
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

/**
 * Ganesha line-art motif — an original vector drawing (no external image).
 * Uses `currentColor` so callers set colour + opacity via className.
 * Rendered faintly behind hero backgrounds as a devotional watermark.
 */
export function GaneshaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 260"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* halo */}
        <circle cx="120" cy="120" r="104" strokeWidth="1.6" opacity="0.75" />
        <circle cx="120" cy="120" r="96" strokeWidth="1" opacity="0.5" />
        {/* crown */}
        <circle cx="120" cy="20" r="3.6" fill="currentColor" stroke="none" />
        <path d="M120 24 C131 42 131 54 120 60 C109 54 109 42 120 24 Z" />
        <path d="M105 58 C99 46 100 38 107 40 C111 41 111 50 109 56" />
        <path d="M135 58 C141 46 140 38 133 40 C129 41 129 50 131 56" />
        <path d="M93 60 C89 52 91 46 96 48 C99 49 99 55 98 58" />
        <path d="M147 60 C151 52 149 46 144 48 C141 49 141 55 142 58" />
        <path d="M88 62 Q120 71 152 62" />
        <path d="M90 70 Q120 79 150 70" />
        {/* head sides */}
        <path d="M94 72 C88 86 88 96 94 104" />
        <path d="M146 72 C152 86 152 96 146 104" />
        {/* ears */}
        <path d="M94 74 C64 66 46 82 50 102 C53 118 76 118 96 106" />
        <path d="M92 84 C76 81 65 91 69 103" />
        <path d="M146 74 C176 66 194 82 190 102 C187 118 164 118 144 106" />
        <path d="M148 84 C164 81 175 91 171 103" />
        {/* brows + eyes */}
        <path d="M100 92 C104 88 110 88 114 91" />
        <path d="M126 91 C130 88 136 88 140 92" />
        <path
          d="M101 99 C105 95 111 95 114 99 C111 102 105 102 101 99 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M126 99 C129 95 135 95 139 99 C135 102 129 102 126 99 Z"
          fill="currentColor"
          stroke="none"
        />
        {/* tilak */}
        <path d="M114 78 C114 92 126 92 126 78" />
        {/* trunk */}
        <path d="M114 104 C112 128 113 150 125 160" />
        <path d="M127 104 C126 126 128 146 138 156" />
        <path d="M125 160 C131 167 145 165 146 154 C147 146 138 144 137 152" />
        {/* tusks */}
        <path d="M108 118 C105 128 107 136 114 139" />
        <path d="M133 118 C136 126 135 133 129 138" />
        {/* modak */}
        <path d="M141 156 L152 156 L146 148 Z" />
      </g>
    </svg>
  );
}

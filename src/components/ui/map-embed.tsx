"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-load wrapper around the Google Maps embed.
 *
 * Fixes two findings with one change:
 *
 *   N-01  DOM-interactive is 118 ms but the load event sits at ~4.6 s. The
 *         iframe already carried loading="lazy" and the load event was still
 *         being held open, so lazy alone was not enough.
 *   S-16  the same iframe is in the footer of all 13 pages, so it set Google
 *         cookies and handed every visitor's IP to Google on every page view —
 *         on a site that otherwise has zero third-party cookies and zero
 *         trackers. Nothing is requested from Google until someone asks for
 *         the map.
 *
 * F-24 ("map shows the correct area") still passes — same embed URL, one click
 * later.
 */

type MapEmbedProps = {
  /** settings.contact.mapEmbedSrc — unchanged. */
  src: string;
  /** Accessible name for the iframe once loaded. */
  title: string;
  /** Matches the height the iframe used at this call site. */
  height: number;
  /** Address shown on the placeholder, so the info is there without a click. */
  addressLine?: string;
  className?: string;
};

export function MapEmbed({
  src,
  title,
  height,
  addressLine,
  className,
}: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      style={{ height }}
      className={cn(
        "group flex w-full flex-col items-center justify-center gap-2 px-4 text-center",
        "bg-[linear-gradient(135deg,#2a0712,#4a0e1f)] transition-colors",
        className,
      )}
    >
      <MapPin className="h-6 w-6 text-gold transition-transform group-hover:-translate-y-0.5" />
      <span className="font-mr text-sm font-semibold text-gold-light">
        नकाशा पाहा
      </span>
      {addressLine && (
        <span className="max-w-xs text-xs leading-relaxed text-[var(--dark-text-soft)]">
          {addressLine}
        </span>
      )}
      <span className="text-[0.65rem] text-[var(--dark-text-soft)]/70">
        क्लिक केल्यावर Google Maps लोड होईल
      </span>
    </button>
  );
}

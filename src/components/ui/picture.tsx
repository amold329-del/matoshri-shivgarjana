"use client";

import manifest from "@/../public/image-manifest.json";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const WIDTHS = [400, 800, 1200];
const dims = manifest as Record<string, { width: number; height: number }>;

/**
 * Responsive <picture> for the static export (MCV-008, MCV-017).
 *
 * Serves AVIF → WebP → JPEG, and always emits intrinsic width/height from
 * the build-time manifest so the browser reserves the right box before the
 * image loads (CLS 0). Variants come from scripts/optimize-images.mjs.
 */
export function Picture({
  src,
  alt,
  sizes = "100vw",
  className,
  imgClassName,
  priority = false,
  fit = "cover",
}: {
  /** Source path as it appears in /public, e.g. "/gallery/x.jpg" */
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold images skip lazy loading and decode eagerly. */
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const meta = dims[src];
  const ext = src.slice(src.lastIndexOf("."));
  const stem = src.slice(0, -ext.length);

  // Only offer widths the source can actually satisfy (no upscaling).
  const usable = meta ? WIDTHS.filter((w) => meta.width >= w * 0.85) : [];

  const set = (type: "avif" | "webp" | "jpg") =>
    usable.map((w) => `${asset(`${stem}-${w}w.${type}`)} ${w}w`).join(", ");

  // No manifest entry (e.g. an SVG or a file added since the last build):
  // fall back to the plain source rather than emitting broken srcsets.
  if (usable.length === 0) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(src)}
        alt={alt}
        {...(meta ? { width: meta.width, height: meta.height } : {})}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn(imgClassName ?? className)}
      />
    );
  }

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(`${stem}-${usable[usable.length - 1]}w.jpg`)}
        srcSet={set("jpg")}
        sizes={sizes}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          fit === "cover" ? "object-cover" : "object-contain",
          imgClassName ?? className,
        )}
      />
    </picture>
  );
}

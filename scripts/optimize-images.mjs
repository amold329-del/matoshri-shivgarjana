#!/usr/bin/env node
/**
 * Build-time responsive image pipeline (MCV-008, MCV-016, MCV-017).
 *
 * The site is a static export, so next/image optimisation is disabled.
 * This walks public/, and for every source raster emits:
 *
 *   <name>-400w.avif  -800w.avif  -1200w.avif
 *   <name>-400w.webp  -800w.webp  -1200w.webp
 *   <name>-400w.jpg   -800w.jpg   -1200w.jpg     (fallback)
 *
 * plus public/image-manifest.json holding intrinsic width/height for every
 * source, so components can emit width/height and reserve layout space
 * (MCV-017 → CLS 0).
 *
 * Runs from `prebuild`, so `npm run build` always ships current variants.
 * Variants are skipped when newer than the source, keeping rebuilds fast.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = "public";
const WIDTHS = [400, 800, 1200];
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);

/** Directories whose contents are already sized for their single use. */
const SKIP_DIRS = new Set(["icons", "og", "event"]);
/** Files that must not be rewritten (icons, manifest art, share cards). */
const SKIP_FILES = new Set(["logo-emblem.png", "og-cover.jpg"]);

const isVariant = (f) => /-\d+w\.(avif|webp|jpg)$/.test(f);

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function newerThan(target, source) {
  try {
    const [t, s] = await Promise.all([fs.stat(target), fs.stat(source)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

const manifest = {};
let made = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for await (const file of walk(PUBLIC)) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file);
  if (!SOURCE_EXT.has(ext) || isVariant(base) || SKIP_FILES.has(base)) continue;

  const img = sharp(file);
  const meta = await img.metadata();
  const key = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
  manifest[key] = { width: meta.width, height: meta.height };

  const stem = file.slice(0, -ext.length);
  bytesBefore += (await fs.stat(file)).size;

  for (const w of WIDTHS) {
    if (meta.width < w * 0.85) continue; // never upscale
    const resized = () =>
      sharp(file).resize({ width: w, withoutEnlargement: true });

    const targets = [
      [`${stem}-${w}w.avif`, (p) => p.avif({ quality: 52, effort: 2 })],
      [`${stem}-${w}w.webp`, (p) => p.webp({ quality: 74 })],
      [`${stem}-${w}w.jpg`, (p) => p.jpeg({ quality: 76, progressive: true, mozjpeg: true })],
    ];

    for (const [out, encode] of targets) {
      if (await newerThan(out, file)) {
        bytesAfter += (await fs.stat(out)).size;
        continue;
      }
      await encode(resized()).toFile(out);
      bytesAfter += (await fs.stat(out)).size;
      made++;
    }
  }
}

await fs.writeFile(
  path.join(PUBLIC, "image-manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(
  `images: ${made} variants written for ${Object.keys(manifest).length} sources`,
);
console.log(
  `sources ${(bytesBefore / 1048576).toFixed(1)} MB → variants ${(bytesAfter / 1048576).toFixed(1)} MB`,
);

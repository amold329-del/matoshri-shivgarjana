#!/usr/bin/env python3
"""
Regenerates every derived logo asset from the master artwork.

Master:  brand/logo-master.png   (the official मातोश्रीचा विघ्नहर्ता mark,
                                  2590x2576, transparent background)

Run from the repo root after replacing the master:

    pip install pillow
    python3 tools/generate-logo-assets.py

Outputs (all committed — none of these are produced by the image pipeline,
because scripts/optimize-images.mjs never upscales and so emits nothing for
sources under ~340px wide):

    public/logo-emblem.png            512  transparent   JSON-LD `logo`
    public/logo-emblem-512.png        512  transparent
    public/logo-emblem-{96,192,384}.png|.webp             <Emblem> srcSet
    public/icons/icon-192.png         192  transparent    PWA
    public/icons/icon-512.png         512  transparent    PWA
    public/icons/icon-maskable-512.png 512 cream, padded  PWA maskable
    src/app/icon.png                  256  transparent    favicon
    src/app/apple-icon.png            180  cream, padded  iOS home screen
    src/app/favicon.ico               16/32/48            legacy favicon

Three deliberate choices:

* **Derived web assets carry a thin gold keyline; the master does not.** The
  medallion body is deep maroon, and the navbar over the hero plus the whole
  footer are near-black plum (#2a0712 → #1b0410). Without a keyline the
  silhouette vanishes on those surfaces and only the gold calligraphy floats,
  unattached. A hairline in the brand gold (#e6c868) hugging the outline fixes
  it, and reads as an intentional gold rim on cream too — so one asset works on
  every surface and no theme-switching logic is needed.
  Set `KEYLINE_PCT = 0` for the untouched mark. `brand/logo-master.png` is never
  modified and stays the file to hand to printers.

* **Maskable and Apple icons sit on cream, not transparency.** Android crops
  maskable icons to a circle and iOS composites apple-touch-icon onto an opaque
  background of its own choosing; a quatrefoil whose points touch the canvas
  edge would lose its tips, and transparent corners would render as black on
  iOS. Both get the artwork inset inside the safe area on `#fbf5e9` — the same
  cream already declared as `background_color` in src/app/manifest.ts.

* **The artwork is padded to a square before resizing**, never stretched. The
  master is 2590x2576, so a plain resize would squash it by 0.5%.
"""

from pathlib import Path

from PIL import Image, ImageFilter

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
MASTER = ROOT / "brand" / "logo-master.png"

CREAM = (251, 245, 233, 255)  # manifest background_color / --cream
GOLD = (230, 200, 104)  # --gold-light, measured from the live site

# Keyline width as a fraction of the icon edge. 0.014 was chosen by rendering
# 0 / 0.008 / 0.014 / 0.020 at 40px and 96px against the real hero, cream and
# footer backgrounds: 0.008 disappears at 40px, 0.020 crowds the artwork.
KEYLINE_PCT = 0.014

# Fraction of the icon edge left clear on each side.
# 0.10 keeps the quatrefoil tips inside Android's circular maskable safe area.
MASKABLE_PAD = 0.10
APPLE_PAD = 0.07

# Keyline is applied once at this size, then downsampled per output.
WORK = 1024


def square_master() -> Image.Image:
    """Master artwork centred on a transparent square canvas."""
    im = Image.open(MASTER).convert("RGBA")
    side = max(im.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.alpha_composite(im, ((side - im.width) // 2, (side - im.height) // 2))
    return canvas


def add_keyline(art: Image.Image) -> Image.Image:
    """Gold hairline following the silhouette, drawn behind the artwork."""
    width = round(WORK * KEYLINE_PCT)
    if width < 1:
        return art
    dilated = art.getchannel("A").filter(ImageFilter.MaxFilter(width * 2 + 1))
    rim = Image.new("RGBA", art.size, GOLD + (0,))
    rim.putalpha(dilated)
    out = Image.new("RGBA", art.size, (0, 0, 0, 0))
    out.alpha_composite(rim)
    out.alpha_composite(art)
    return out


SQ = add_keyline(square_master().resize((WORK, WORK), Image.LANCZOS))


def transparent(size: int) -> Image.Image:
    return SQ.resize((size, size), Image.LANCZOS)


def on_cream(size: int, pad: float) -> Image.Image:
    inner = round(size * (1 - 2 * pad))
    out = Image.new("RGBA", (size, size), CREAM)
    offset = (size - inner) // 2
    out.alpha_composite(SQ.resize((inner, inner), Image.LANCZOS), (offset, offset))
    return out


def write_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    report(path)


def write_webp(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "WEBP", quality=90, method=6)
    report(path)


def report(path: Path) -> None:
    kb = path.stat().st_size / 1024
    with Image.open(path) as im:
        print(f"  {path.relative_to(ROOT)!s:42} {im.size[0]}x{im.size[1]:<5} {kb:6.1f} KB")


def main() -> None:
    print(f"master: {MASTER.relative_to(ROOT)} {SQ.size[0]}x{SQ.size[1]}\n")

    print("public/ — site emblem")
    write_png(transparent(512), ROOT / "public" / "logo-emblem.png")
    write_png(transparent(512), ROOT / "public" / "logo-emblem-512.png")
    for size in (96, 192, 384):
        write_png(transparent(size), ROOT / "public" / f"logo-emblem-{size}.png")
        write_webp(transparent(size), ROOT / "public" / f"logo-emblem-{size}.webp")

    print("\npublic/icons/ — PWA")
    write_png(transparent(192), ROOT / "public" / "icons" / "icon-192.png")
    write_png(transparent(512), ROOT / "public" / "icons" / "icon-512.png")
    write_png(
        on_cream(512, MASKABLE_PAD), ROOT / "public" / "icons" / "icon-maskable-512.png"
    )

    print("\nsrc/app/ — favicon + iOS")
    write_png(transparent(256), ROOT / "src" / "app" / "icon.png")
    write_png(on_cream(180, APPLE_PAD), ROOT / "src" / "app" / "apple-icon.png")

    ico = ROOT / "src" / "app" / "favicon.ico"
    transparent(48).save(ico, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  {ico.relative_to(ROOT)!s:42} 16/32/48  {ico.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()

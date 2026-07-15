#!/usr/bin/env python3
"""
Generates public/og-image.png (1200x630) for matoshreechavighnaharta.co.in
Fixes report items N-21 / N-26 (no og:image -> no WhatsApp/Facebook thumbnail).

Palette is NOT invented: every colour is taken from the live-site values the QA
report measured in Evidence section E3.

Run from the repo root:

    pip install pillow
    python3 tools/generate-og-image.py

Requires Pillow built with libraqm — without HarfBuzz shaping, Devanagari
matras and conjuncts render as loose glyphs and you would ship a broken card.
Check with:  python3 -c "from PIL import features; print(features.check('raqm'))"

The two Noto Devanagari fonts are downloaded on first run into tools/.fonts/
(gitignored) rather than committed.

Edit CONTENT below and re-run to change the wording.
"""

import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# --- Brand palette, measured from the live site (report E3) -----------------
INK        = (25, 5, 17)       # rgb(25,5,17)     dark bg
INK_WARM   = (42, 17, 25)      # rgb(42,17,25)    deep plum, light-theme heading
GOLD       = (230, 200, 104)   # rgb(230,200,104) active nav / hero accent
CREAM      = (245, 233, 214)   # rgb(245,233,214) hero name
ROSE_TAN   = (205, 176, 159)   # rgb(205,176,159) body text

W, H = 1200, 630

# --- Content ----------------------------------------------------------------
EYEBROW = "सार्वजनिक गणेशोत्सव मंडळ  ·  भोईवाडा, मुंबई"
DISPLAY = "मातोश्री शिवगर्जना"
SUB     = "मातोश्रीचा विघ्नहर्ता"
FOOTER  = "स्थापना १९८०  ·  ४७ वे वर्ष  ·  गणेशोत्सव २०२६"

HERE  = Path(__file__).resolve().parent
FONTS = HERE / ".fonts"
OUT   = HERE.parent / "public" / "og-image.png"

# Noto Sans/Serif Devanagari, variable. SIL Open Font License 1.1.
FONT_SOURCES = {
    "NotoSerifDevanagari-VF.ttf":
        "https://raw.githubusercontent.com/google/fonts/main/ofl/"
        "notoserifdevanagari/NotoSerifDevanagari%5Bwdth%2Cwght%5D.ttf",
    "NotoSansDevanagari-VF.ttf":
        "https://raw.githubusercontent.com/google/fonts/main/ofl/"
        "notosansdevanagari/NotoSansDevanagari%5Bwdth%2Cwght%5D.ttf",
}


def ensure_fonts() -> None:
    FONTS.mkdir(parents=True, exist_ok=True)
    for name, url in FONT_SOURCES.items():
        dest = FONTS / name
        if dest.exists():
            continue
        print(f"fetching {name} …")
        urllib.request.urlretrieve(url, dest)


def font(file: str, size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONTS / file), size)
    f.set_variation_by_axes([weight, 100])  # [Weight, Width]
    return f


def blend(bg, fg, alpha):
    return tuple(round(b + (f - b) * alpha) for b, f in zip(bg, fg))


def centered(draw, y, text, fnt, fill):
    """Draw text horizontally centred on the canvas. No letter-spacing:
    tracking Devanagari per-glyph would break conjuncts/matras."""
    l, t, r, b = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((W - (r - l)) / 2 - l, y), text, font=fnt, fill=fill)
    return b - t


def main():
    ensure_fonts()

    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img)

    # Warm radial glow behind the centre so the gold has something to sit on.
    cx, cy, radius = W / 2, H / 2 - 20, 640
    for i in range(radius, 0, -4):
        a = (1 - i / radius) ** 2.4 * 0.55
        d.ellipse(
            [cx - i, cy - i * 0.62, cx + i, cy + i * 0.62],
            fill=blend(INK, INK_WARM, a),
        )

    # Hairline gold frame.
    d.rectangle([28, 28, W - 29, H - 29], outline=blend(INK, GOLD, 0.30), width=1)

    # --- Signature: a toran (the strung arc pendants hung across a mandap
    # entrance during Ganeshotsav). Reads as a gold header band at thumbnail
    # size and comes from the subject's own world rather than generic ornament.
    top, n, span = 29, 27, W - 58 - 2
    step = span / n
    d.line([29, top, W - 30, top], fill=blend(INK, GOLD, 0.45), width=2)
    for i in range(n):
        x = 30 + i * step
        drop = 26 if i % 2 == 0 else 16
        a = 0.42 if i % 2 == 0 else 0.24
        d.arc(
            [x, top - drop, x + step, top + drop],
            start=0, end=180,
            fill=blend(INK, GOLD, a), width=2,
        )
        if i % 2 == 0:  # bead at the low point of the long pendants
            bx, by = x + step / 2, top + drop
            d.ellipse([bx - 2.5, by - 2.5, bx + 2.5, by + 2.5],
                      fill=blend(INK, GOLD, 0.5))

    # --- Type stack -----------------------------------------------------------
    y = 158
    centered(d, y, EYEBROW, font("NotoSansDevanagari-VF.ttf", 26, 500), ROSE_TAN)

    y += 74
    centered(d, y, DISPLAY, font("NotoSerifDevanagari-VF.ttf", 104, 700), GOLD)

    y += 172
    centered(d, y, SUB, font("NotoSerifDevanagari-VF.ttf", 46, 400), CREAM)

    # Divider with a centred diamond.
    y += 96
    half, gap = 190, 22
    d.line([cx - half, y, cx - gap, y], fill=blend(INK, GOLD, 0.5), width=1)
    d.line([cx + gap, y, cx + half, y], fill=blend(INK, GOLD, 0.5), width=1)
    d.polygon([(cx, y - 6), (cx + 6, y), (cx, y + 6), (cx - 6, y)], fill=GOLD)

    y += 34
    centered(d, y, FOOTER, font("NotoSansDevanagari-VF.ttf", 27, 500), ROSE_TAN)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size / 1024:.0f} KB, {W}x{H})")


if __name__ == "__main__":
    main()

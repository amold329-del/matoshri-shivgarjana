#!/usr/bin/env python3
"""
Regenerates the four Open Graph share cards so they carry the official logo.

    public/og-cover.jpg     default card (all routes without a specific one)
    public/og/gallery.jpg   /gallery/
    public/og/events.jpg    /events/
    public/og/news.jpg      /news/

Run from the repo root:

    pip install pillow
    python3 tools/generate-og-cards.py

Requires Pillow built with libraqm; without HarfBuzz shaping the Devanagari
matras and conjuncts break apart. Check with:

    python3 -c "from PIL import features; print(features.check('raqm'))"

The Noto Sans Devanagari variable font downloads on first run into
tools/.fonts/ (gitignored), same as tools/generate-og-image.py.

## Why this file exists

The previous cards were generated ad hoc and had no script in the repo, so the
old circular emblem was baked into all four with no way to re-render them. Every
number below was measured off those originals — frame inset, logo box, the ink
height and top edge of each text line, the pill box — so this reproduces the
design that was already shipping and only swaps the mark. `LAYOUT` is the whole
specification; edit it and re-run.

Type is fitted by *width*, not by point size or ink height: fit() binary-searches
the font size until the rendered line matches the width measured off the
original, and the line is then centred on that line's measured vertical centre.
Width is the only stable target here — a nominal point size differs between font
versions, and Devanagari ink height depends on which matras and conjuncts happen
to appear in the string.

Crops were solved the same way: each photo card scales its source to cover
1200x630 and anchors the crop 35% down the available slack (all three originals
agreed on 0.35, so it was deliberate, not incidental).
"""

import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
FONTS = HERE / ".fonts"
LOGO = ROOT / "public" / "logo-emblem-512.png"

W, H = 1200, 630

# --- Palette (site tokens; frame + veil solved against the original cards) ---
GOLD = (230, 200, 104)
GOLD_PALE = (232, 203, 152)
CREAM = (245, 233, 214)
ROSE_TAN = (205, 176, 159)
VEIL = (42, 7, 18)  # #2a0712, the footer/hero ground
VEIL_ALPHA = 0.79  # least-squares fit against public/og/gallery.jpg
GRAD_FROM = (78, 20, 35)  # og-cover.jpg top-left
GRAD_TO = (43, 7, 19)  # og-cover.jpg bottom-right

# --- Layout, measured from the shipped cards ---------------------------------
FRAME_INSET, FRAME_WIDTH, FRAME_ALPHA = 28, 2, 0.75
LOGO_BOX = (522, 56, 156)  # x, y, size — larger than the old 140px circle so
# the quatrefoil, whose corners are transparent, carries the same visual weight
LAYOUT = {
    # name:      (ink_centre_y, ink_width, weight, colour)
    "display": (262, 484, 600, CREAM),
    "sub1": (334, 427, 500, GOLD_PALE),
    "sub2": (379, 250, 500, GOLD),
    "pill": (473, 129, 600, (240, 210, 160)),
    "footer": (560, 326, 400, ROSE_TAN),
}
PILL_BOX = (436, 510)  # top, bottom
PILL_PAD_X = 35
CROP_ANCHOR = 0.35  # fraction of the vertical slack left above the crop

DISPLAY = "मातोश्री शिवगर्जना"
SUB1 = "सार्वजनिक गणेशोत्सव मंडळ (रजि.)"
SUB2 = "॥ मातोश्रीचा विघ्नहर्ता ॥"
FOOTER = "स्थापना १९८०  ·  परेल-भोईवाडा, मुंबई"

# card file, background source (None = gradient), pill label
CARDS = [
    ("public/og-cover.jpg", None, "४७ वे वर्ष"),
    ("public/og/gallery.jpg", "public/gallery/ganeshotsav-2025-01.jpg", "गॅलरी"),
    ("public/og/events.jpg", "public/event/ganeshotsav-16x9.jpg", "कार्यक्रम"),
    ("public/og/news.jpg", "public/gallery/ganeshotsav-2024-01.jpg", "बातम्या"),
]

FONT_FILE = "NotoSansDevanagari-VF.ttf"
FONT_URL = (
    "https://raw.githubusercontent.com/google/fonts/main/ofl/"
    "notosansdevanagari/NotoSansDevanagari%5Bwdth%2Cwght%5D.ttf"
)


def ensure_font() -> None:
    FONTS.mkdir(parents=True, exist_ok=True)
    dest = FONTS / FONT_FILE
    if not dest.exists():
        print(f"fetching {FONT_FILE} …")
        urllib.request.urlretrieve(FONT_URL, dest)


def font(size: int, weight: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONTS / FONT_FILE), size)
    f.set_variation_by_axes([weight, 100])  # [Weight, Width]
    return f


_probe = ImageDraw.Draw(Image.new("RGB", (1, 1)))


def fit(text: str, weight: int, target_w: int) -> ImageFont.FreeTypeFont:
    """Largest font size whose rendered ink width is <= target_w."""
    lo, hi, best = 6, 220, None
    while lo <= hi:
        mid = (lo + hi) // 2
        f = font(mid, weight)
        l, _, r, _ = _probe.textbbox((0, 0), text, font=f)
        if r - l <= target_w:
            best, lo = f, mid + 1
        else:
            hi = mid - 1
    return best or font(6, weight)


def draw_centred(d: ImageDraw.ImageDraw, text: str, spec) -> int:
    """Centre text on the page and on the measured vertical centre of its line."""
    centre_y, target_w, weight, colour = spec
    f = fit(text, weight, target_w)
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    x = (W - (r - l)) / 2 - l
    y = centre_y - (b - t) / 2 - t
    d.text((x, y), text, font=f, fill=colour)
    return int(r - l)


def blend(bg, fg, alpha):
    return tuple(round(b + (f - b) * alpha) for b, f in zip(bg, fg))


def gradient() -> Image.Image:
    """Diagonal wash, top-left to bottom-right, as on the original cover."""
    img = Image.new("RGB", (W, H))
    px = img.load()
    span = W + H
    for y in range(H):
        for x in range(0, W, 4):
            c = blend(GRAD_FROM, GRAD_TO, (x + y) / span)
            for dx in range(4):
                if x + dx < W:
                    px[x + dx, y] = c
    return img


def photo_background(path: Path) -> Image.Image:
    """Cover-crop to 1200x630, then lay the maroon veil over it."""
    im = Image.open(path).convert("RGB")
    ratio = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
    left = round((im.width - W) * 0.5)
    top = round((im.height - H) * CROP_ANCHOR)
    im = im.crop((left, top, left + W, top + H))
    veil = Image.new("RGB", (W, H), VEIL)
    return Image.blend(im, veil, VEIL_ALPHA)


def build(out: Path, source: str | None, pill_label: str) -> None:
    img = gradient() if source is None else photo_background(ROOT / source)
    d = ImageDraw.Draw(img)

    # Sample the ground under the frame so its gold reads the same on photo
    # cards as on the gradient one.
    ground = img.getpixel((FRAME_INSET + 6, H // 2))
    d.rectangle(
        [FRAME_INSET, FRAME_INSET, W - FRAME_INSET - 1, H - FRAME_INSET - 1],
        outline=blend(ground, GOLD, FRAME_ALPHA),
        width=FRAME_WIDTH,
    )

    lx, ly, ls = LOGO_BOX
    logo = Image.open(LOGO).convert("RGBA").resize((ls, ls), Image.LANCZOS)
    img.paste(logo, (lx, ly), logo)

    draw_centred(d, DISPLAY, LAYOUT["display"])
    draw_centred(d, SUB1, LAYOUT["sub1"])
    draw_centred(d, SUB2, LAYOUT["sub2"])

    # Pill: width follows the label, height and radius are the measured box.
    top, bottom = PILL_BOX
    label_w = draw_centred(d, pill_label, LAYOUT["pill"])
    half = label_w / 2 + PILL_PAD_X
    ground = img.getpixel((int(W / 2 - half - 12), (top + bottom) // 2))
    d.rounded_rectangle(
        [W / 2 - half, top, W / 2 + half, bottom],
        radius=(bottom - top) / 2,
        outline=blend(ground, GOLD, 0.8),
        width=2,
    )

    draw_centred(d, FOOTER, LAYOUT["footer"])

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=84, progressive=True, optimize=True)
    print(f"  {out.relative_to(ROOT)!s:26} {out.stat().st_size / 1024:6.1f} KB")


def main() -> None:
    ensure_font()
    print(f"logo: {LOGO.relative_to(ROOT)}\n")
    for name, source, label in CARDS:
        build(ROOT / name, source, label)


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Re-runs the objectively checkable findings from the 14 July 2026 QA report
# against a deployed build. Run from the repo root: tools/verify.sh [base-url]
# Everything here was a Fail or a Warning; all of it should be PASS once the
# fix pack is deployed and Cloudflare is in front of the site.
#
#   ./verify.sh                                    # defaults to production
#   ./verify.sh http://localhost:3000              # against a local build
#
# Needs only bash + curl. Exits non-zero if anything still fails.
#
# Not covered here — these genuinely need a human or a real browser, exactly as
# the report's "Needs a manual step" section says:
#   N-04  Lighthouse / field Core Web Vitals
#   N-05  Slow-3G re-test
#   N-06  true mobile reflow + hamburger drawer
#   N-10  Safari / Firefox / Edge spot-check
#   N-13  a screen-reader pass over the lightbox
# ---------------------------------------------------------------------------

set -uo pipefail

BASE="${1:-https://matoshreechavighnaharta.co.in}"
BASE="${BASE%/}"

if [[ -t 1 ]]; then
  G=$'\e[32m'; R=$'\e[31m'; Y=$'\e[33m'; D=$'\e[2m'; N=$'\e[0m'
else
  G=""; R=""; Y=""; D=""; N=""
fi

pass=0; fail=0; warn=0
ok()   { printf "  ${G}PASS${N}  %-8s %s\n" "$1" "$2"; pass=$((pass+1)); }
no()   { printf "  ${R}FAIL${N}  %-8s %s\n" "$1" "$2"; fail=$((fail+1)); }
meh()  { printf "  ${Y}WARN${N}  %-8s %s\n" "$1" "$2"; warn=$((warn+1)); }
head_() { printf "\n${D}%s${N}\n" "$1"; }

ROUTES=(/ /about/ /history/ /gallery/ /events/ /news/ /committee/ /vargani/
        /online-donation/ /registration/ /downloads/ /contact/ /sabhasad/)

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

printf "QA re-test — %s\n" "$BASE"

# --- routes still alive (F-01, F-05, F-26) ---------------------------------
head_ "Routing"
bad=0
for r in "${ROUTES[@]}"; do
  code=$(curl -sS -o "$TMP/body" -w "%{http_code}" -L --max-time 20 "$BASE$r")
  [[ "$code" == "200" ]] || { no "F-01" "$r returned $code"; bad=1; }
done
[[ $bad -eq 0 ]] && ok "F-01" "all ${#ROUTES[@]} routes return 200"

code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "$BASE/does-not-exist-xyz/")
[[ "$code" == "404" ]] && ok "F-07" "unknown URL still returns a real 404" \
                       || no "F-07" "unknown URL returned $code, expected 404"

# --- security headers (S-04 … S-09) ----------------------------------------
head_ "Security headers  (E2 in the report: all six ABSENT)"
curl -sS -D "$TMP/h" -o /dev/null -L --max-time 20 "$BASE/"
lc() { tr 'A-Z' 'a-z' < "$TMP/h" | grep -i "^$1:" | head -1 | cut -d: -f2- | sed 's/^ *//;s/\r//'; }

hsts=$(lc "strict-transport-security")
if [[ -n "$hsts" ]]; then
  age=$(sed -n 's/.*max-age=\([0-9]*\).*/\1/p' <<<"$hsts")
  if [[ -n "$age" && "$age" -ge 86400 ]]; then ok "S-04" "HSTS present (max-age=$age)"
  else meh "S-04" "HSTS present but max-age=${age:-?} — still ramping, expected"; fi
else no "S-04" "Strict-Transport-Security absent"; fi

[[ "$(lc x-content-type-options)" == "nosniff" ]] && ok "S-05" "X-Content-Type-Options: nosniff" \
                                                  || no "S-05" "X-Content-Type-Options absent"

xfo=$(lc x-frame-options); csp=$(lc content-security-policy)
if [[ -n "$xfo" ]] || grep -q "frame-ancestors" <<<"$csp"; then
  ok "S-06" "framing controlled (${xfo:-frame-ancestors in CSP})"
  ok "S-10" "clickjacking closed"
else
  no "S-06" "no X-Frame-Options and no frame-ancestors"
  no "S-10" "site can still be iframed on any origin"
fi

[[ -n "$(lc referrer-policy)" ]] && ok "S-07" "Referrer-Policy: $(lc referrer-policy)" \
                                 || no "S-07" "Referrer-Policy absent"
[[ -n "$csp" ]] && ok "S-08" "Content-Security-Policy present" \
                || no "S-08" "Content-Security-Policy absent"
[[ -n "$(lc permissions-policy)" ]] && ok "S-09" "Permissions-Policy present" \
                                    || no "S-09" "Permissions-Policy absent"

# --- canonical + og:url per page (N-20, N-21) ------------------------------
head_ "Canonical & og:url  (E1: every inner page pointed at the homepage)"
for r in / /about/ /gallery/ /contact/ /downloads/; do
  curl -sS -L --max-time 20 "$BASE$r" -o "$TMP/p"
  canon=$(grep -o '<link[^>]*rel="canonical"[^>]*>' "$TMP/p" | head -1 |
          sed -n 's/.*href="\([^"]*\)".*/\1/p')
  ogurl=$(grep -o '<meta[^>]*property="og:url"[^>]*>' "$TMP/p" | head -1 |
          sed -n 's/.*content="\([^"]*\)".*/\1/p')
  want="$BASE$r"
  [[ "${canon%/}/" == "${want%/}/" ]] && ok "N-20" "$r canonical is self-referencing" \
                                      || no "N-20" "$r canonical = ${canon:-NONE} (want $want)"
  [[ "${ogurl%/}/" == "${want%/}/" ]] && ok "N-21" "$r og:url is self-referencing" \
                                      || no "N-21" "$r og:url = ${ogurl:-NONE} (want $want)"
done

# --- share preview image (N-21, N-26) --------------------------------------
head_ "Share preview  (N-26: WhatsApp/FB shares had no thumbnail)"
curl -sS -L --max-time 20 "$BASE/" -o "$TMP/home"
ogimg=$(grep -o '<meta[^>]*property="og:image"[^>]*>' "$TMP/home" | head -1 |
        sed -n 's/.*content="\([^"]*\)".*/\1/p')
twimg=$(grep -o '<meta[^>]*name="twitter:image"[^>]*>' "$TMP/home" | head -1 |
        sed -n 's/.*content="\([^"]*\)".*/\1/p')

if [[ -n "$ogimg" ]]; then
  ok "N-21" "og:image = $ogimg"
  read -r code type < <(curl -sS -o "$TMP/img" -w "%{http_code} %{content_type}" -L --max-time 25 "$ogimg")
  if [[ "$code" == "200" ]]; then
    ok "N-26" "og:image reachable (200, $type)"
    # PNG IHDR: width/height are big-endian uint32 at bytes 16-23.
    if command -v python3 >/dev/null && python3 - "$TMP/img" <<'PY' 2>/dev/null
import struct, sys
with open(sys.argv[1], "rb") as f: b = f.read(24)
assert b[:8] == b"\x89PNG\r\n\x1a\n"
w, h = struct.unpack(">II", b[16:24])
print(f"     {w}x{h}", end="")
sys.exit(0 if (w, h) == (1200, 630) else 1)
PY
    then echo " ${G}(1200x630 as required)${N}"
    else meh "N-26" "og:image is not 1200x630 — WhatsApp may crop it oddly"; fi
  else
    no "N-26" "og:image returned $code — the thumbnail will not render"
  fi
else
  no "N-21" "og:image still absent"
  no "N-26" "shared links will still show no thumbnail"
fi
[[ -n "$twimg" ]] && ok "N-21" "twitter:image = $twimg" \
                  || no "N-21" "twitter:image absent (twitter:card is summary_large_image)"

# --- accessibility markers (F-03, N-16, N-17) ------------------------------
head_ "Accessibility markers"
curl -sS -L --max-time 20 "$BASE/about/" -o "$TMP/about"
grep -q 'aria-current="page"' "$TMP/about" \
  && ok "N-16" "/about/ exposes aria-current=\"page\"" \
  || no "N-16" "/about/ has no aria-current — F-03 active state likely still broken"

grep -qiE 'href="#(main|content)"' "$TMP/home" \
  && ok "N-17" "skip link present in the homepage markup" \
  || no "N-17" "no skip-to-content link found"

grep -q 'id="main"' "$TMP/home" \
  && ok "N-17" "main landmark carries id=\"main\"" \
  || meh "N-17" "no id=\"main\" — the skip link needs a target"

# --- external link hardening (S-11) ----------------------------------------
head_ "External links"
curl -sS -L --max-time 20 "$BASE/downloads/" -o "$TMP/dl"
if grep -o '<a[^>]*target="_blank"[^>]*>' "$TMP/dl" | grep -qv 'rel="[^"]*noopener'; then
  meh "S-11" "a target=_blank link on /downloads/ still lacks rel=noopener"
else
  ok "S-11" "all target=_blank links carry rel=noopener"
fi

# --- summary ---------------------------------------------------------------
printf "\n${D}%s${N}\n" "────────────────────────────────────"
printf "  ${G}%d passed${N}   ${R}%d failed${N}   ${Y}%d warnings${N}\n\n" "$pass" "$fail" "$warn"
[[ $fail -eq 0 ]] || exit 1

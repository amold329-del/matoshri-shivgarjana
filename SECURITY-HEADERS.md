# Security headers — S-04 … S-10

Everything else from the QA report is fixed in this repo. This part cannot be.

Evidence E2 is the whole problem:

```
server: GitHub.com (via Fastly)
strict-transport-security : ABSENT     x-content-type-options : ABSENT
x-frame-options           : ABSENT     content-security-policy: ABSENT
referrer-policy           : ABSENT     permissions-policy     : ABSENT
```

GitHub Pages has no mechanism for custom response headers — no `_headers` file,
no config, nothing. The site has to be fronted by something that can set them.
Cloudflare's free plan does it, keeps GitHub Pages as the origin, and needs no
change to `deploy.yml` or the build.

Budget ~30 minutes, and access to wherever `matoshreechavighnaharta.co.in` is
registered.

## What's already shipped in the repo

`src/app/layout.tsx` carries a `<meta http-equiv="Content-Security-Policy">`.
That is a **partial** measure and the report said as much. Being precise about
what it does and doesn't buy:

- ✅ It is emitted, and it governs everything parsed after it — including any
  script injected at runtime, which is the actual XSS vector for a React app.
- ⚠️ It lands at head tag #17 of 43, after 12 of Next's own `/_next/` bundles.
  Next's App Router gives you no control over head ordering. Those 12 are
  first-party and are what `'self'` would allow anyway, so little is lost — but
  it is weaker than the real header, unavoidably.
- ❌ `frame-ancestors` is **ignored** in a meta CSP. So **S-10 (clickjacking)
  stays open until the header below is live.** `X-Frame-Options` cannot be set
  from a meta tag either, whatever the blog posts say.

Delete that `<head>` block from `layout.tsx` once Cloudflare is serving the real
header — two sources setting the same policy is a debugging trap.

---

## Step 1 — Put Cloudflare in front

1. Free Cloudflare account → **Add a site** → `matoshreechavighnaharta.co.in`.
2. Check the imported A/CNAME records pointing at GitHub Pages came across.
3. Change the nameservers at your registrar to Cloudflare's two. Usually under
   an hour to propagate.

### The ordering trap that will bite you

**Leave the records on grey cloud (DNS only) at first.**

GitHub needs to reach the domain directly to issue and renew its Let's Encrypt
certificate. Proxy it before GitHub has a cert and *Enforce HTTPS* in
Settings → Pages greys out and visitors get certificate errors.

1. Grey cloud → wait until Settings → Pages shows the cert issued and
   **Enforce HTTPS** ticked.
2. *Then* switch to orange cloud (Proxied).
3. SSL/TLS → Overview → **Full**. Not Flexible — Flexible causes a redirect
   loop against Pages, which already redirects HTTP→HTTPS itself.
4. SSL/TLS → Edge Certificates → **Always Use HTTPS** on.

Keep the `CNAME` file in the repo as it is.

S-01/S-02 (valid cert, http→https) currently pass. Re-run `tools/verify.sh`
after the cutover and confirm they still do.

## Step 2 — Set the headers

Rules → **Transform Rules** → **Modify Response Header** → *Create rule*.
Name `security-headers`, match **All incoming requests**, then **Set static**:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | *(below)* |
| `Content-Security-Policy` | *(below)* |

**Permissions-Policy** (S-09):

```
accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), xr-spatial-tracking=(), fullscreen=(self "https://www.google.com")
```

`fullscreen` isn't locked to `self` alone on purpose — the Maps embed would lose
its expand control.

**Content-Security-Policy** (S-08, plus S-06/S-10 via `frame-ancestors`) — this
is the policy already in `layout.tsx` plus the one directive meta can't carry:

```
default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://maps.google.com https://www.google.com; upgrade-insecure-requests
```

The origins are exhaustive, not guessed. The only external resource this site
loads is the Google Maps iframe — `next/font/google` self-hosts the three
families at build time, and every image lives in `public/`.

### Why `'unsafe-inline'` is in there

`output: "export"` inlines Next's hydration bootstrap (and the desktop-viewport
script) into every HTML file. Nonces need a server to mint a value per request,
and a static export has no server. Hashes work but Next regenerates that inline
content every build, so the policy would break on a deploy you didn't think was
risky.

So this CSP is **not** meaningfully stopping XSS in the injected-inline sense.
What it does buy: `frame-ancestors` (closes S-10), `object-src 'none'`,
`base-uri 'self'`, `upgrade-insecure-requests`, and a tight allow-list on where
images, fonts, frames and XHR may go. That's real, and it's the honest ceiling
for a static export. With S-15 finding no DOM-XSS and no login, cookie or form
anywhere on the site, residual risk is low — which is what the report said.

## Step 3 — HSTS (S-04), ramped

Do **not** paste a two-year `max-age` on day one. HSTS is not reversible from
the server: if anything about HTTPS is wrong, that visitor cannot reach the site
until the max-age expires.

SSL/TLS → Edge Certificates → **HTTP Strict Transport Security**:

1. Enable at **max-age = 1 day**, `includeSubDomains` off, preload off.
2. Browse for a week.
3. Raise to 6 months, then `max-age=63072000; includeSubDomains`.
4. **Preload is optional and effectively permanent** — removal takes months and
   ships with browser releases. There's no reason to submit a mandal site. Skip.

## Alternative — a Worker

If you'd rather keep this in version control than a dashboard, `tools/worker.js`
does the same job; deploy with route `matoshreechavighnaharta.co.in/*`. Use one
or the other, never both.

## Step 4 — Verify

```bash
tools/verify.sh https://matoshreechavighnaharta.co.in
```

Every `S-0x` line should flip to PASS. Cross-check at <https://securityheaders.com>.
Then open the site with DevTools → Console and click through the gallery
lightbox, the theme toggle and the contact map: **CSP violations print there as
red errors.** If one appears, add that origin to the matching directive rather
than widening `default-src`.

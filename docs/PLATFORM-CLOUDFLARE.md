# Platform setup — Cloudflare in front of GitHub Pages

Closes audit issues **MCV-012, MCV-015, MCV-031, MCV-036, MCV-037, MCV-042**.

These six are not code defects. GitHub Pages cannot set custom response
headers, caps `Cache-Control` at `max-age=600` even for content-hashed
immutable assets, serves gzip rather than brotli, offers no HTTP/3, and
returns `Access-Control-Allow-Origin: *` on HTML documents. One change fixes
all of them.

**Nothing about the deployment workflow changes.** GitHub Pages stays the
origin; GitHub Actions keeps publishing exactly as it does now.

---

## 1. Point the domain at Cloudflare

1. Create a free account at `dash.cloudflare.com`
2. **Add a site** → `matoshreechavighnaharta.co.in` → **Free** plan
3. Cloudflare imports the existing DNS. Confirm these survived the import:
   - four `A` records on `@` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
   - the `CNAME` on `www`
   - Set all of them to **Proxied** (orange cloud), not DNS-only
4. Cloudflare gives you two nameservers. In **GoDaddy → DNS → Nameservers**,
   switch from GoDaddy's to Cloudflare's two.
5. Propagation takes anywhere from minutes to a few hours. The site stays up
   throughout.

> Keep **Enforce HTTPS** ticked in GitHub Pages, and set Cloudflare
> **SSL/TLS → Overview → Full (strict)**. Anything less re-introduces an
> unencrypted hop between Cloudflare and GitHub.

---

## 2. Security headers — MCV-042

**Rules → Transform Rules → Modify Response Header → Create rule**
Name: `security headers`, apply to *All incoming requests*, then **Set static**:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `Content-Security-Policy` | see below |

### Content-Security-Policy — start permissive, then tighten

The site has ~18 inline scripts (Next.js hydration payloads) and ~106 inline
style attributes, so a strict policy will break it. Start with this, confirm
zero console violations across all 17 pages, and only then tighten:

```
frame-ancestors 'none'; base-uri 'self'; object-src 'none'
```

Once that is stable, move to:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: https:;
frame-src https://www.google.com https://maps.google.com;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
object-src 'none'
```

`'unsafe-inline'` on `script-src` is required until Next.js hydration scripts
carry a nonce. Moving to hashes is the follow-up, not a launch blocker.

**`frame-src`** must stay for the embedded Google Map on `/contact/`.

---

## 3. Immutable asset caching — MCV-015

**Caching → Cache Rules → Create rule**

- Name: `hashed assets immutable`
- When: `URI Path starts with /_next/static/`
- Then: **Eligible for cache**, **Edge TTL** = 1 year,
  **Browser TTL** = 1 year

Add a second Transform Rule setting, for the same path match:

```
Cache-Control: public, max-age=31536000, immutable
```

Safe because Next.js content-hashes every filename in `/_next/static/`.

---

## 4. Brotli and HTTP/3 — MCV-012, MCV-031

Both are **on by default** on the free plan. Verify under
**Speed → Optimization** (Brotli) and **Network** (HTTP/3 QUIC).

---

## 5. Scope CORS off HTML — MCV-042

GitHub Pages returns `Access-Control-Allow-Origin: *` on HTML documents.
**Transform Rules → Modify Response Header → Remove**
`Access-Control-Allow-Origin` when `URI Path does not start with /_next/`.

---

## 6. `/index.html` duplicate — MCV-036

**Rules → Redirect Rules → Create**

- When: `URI Path equals /index.html`
- Then: **Static redirect**, `https://matoshreechavighnaharta.co.in/`, **301**

---

## 7. Case-sensitive URLs — MCV-037

**Rules → Transform Rules → Rewrite URL → Create**

- When: `URI Path matches regex` `.*[A-Z].*`
- Then: **Rewrite to → Dynamic** → `lower(http.request.uri.path)`

So `/ABOUT/` resolves instead of 404ing.

---

## 8. Optional safety net

**Speed → Optimization → Polish** = *Lossy* with *WebP* on, and **Mirage** on.
The build-time pipeline in `scripts/optimize-images.mjs` already handles this
properly; Polish only catches anything added to `public/` that bypasses it.

---

## Verify

```bash
curl -sI https://matoshreechavighnaharta.co.in | grep -iE \
  'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy'

# immutable assets
curl -sI https://matoshreechavighnaharta.co.in/_next/static/<hashed-file>.js | grep -i cache-control

# brotli + http/3
curl -sI --compressed https://matoshreechavighnaharta.co.in | grep -i 'content-encoding\|alt-svc'
```

Then run `securityheaders.com` and confirm no CSP violations in the console
on all 17 pages.

---

## If the mandal ever leaves Cloudflare

Every item above is edge configuration, not code. Moving to another host
(Netlify, Vercel, Cloudflare Pages) would let all six be expressed as a
`_headers` / `netlify.toml` / `next.config` file instead — but it would also
mean giving up the free, simple GitHub Pages deployment the mandal uses today.
Not recommended without a reason.

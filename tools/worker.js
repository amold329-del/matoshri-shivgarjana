/**
 * Cloudflare Worker — adds the response headers GitHub Pages cannot set.
 * Closes report items S-04, S-05, S-06, S-07, S-08, S-09 and S-10.
 *
 * Deploy with a route of: matoshreechavighnaharta.co.in/*
 * Use EITHER this Worker OR the Transform Rules in SETUP-CLOUDFLARE.md.
 * Running both means two things set the same header — a debugging trap.
 *
 * See ../SECURITY-HEADERS.md for why script-src carries 'unsafe-inline'
 * (static export = no nonce possible) and why HSTS should be ramped.
 */

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'self'", // S-06 / S-10 — header-only, cannot go in <meta>
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://maps.google.com https://www.google.com",
  "upgrade-insecure-requests",
].join("; ");

const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "usb=()",
  "xr-spatial-tracking=()",
  // Not (self) alone: the Maps embed is allowfullscreen and would break.
  'fullscreen=(self "https://www.google.com")',
].join(", ");

const HEADERS = {
  // S-04. Start at max-age=86400 for the first week, then raise.
  // Add includeSubDomains only once every subdomain is confirmed HTTPS.
  "Strict-Transport-Security": "max-age=86400",
  "X-Content-Type-Options": "nosniff", // S-05
  "X-Frame-Options": "SAMEORIGIN", // S-06
  "Referrer-Policy": "strict-origin-when-cross-origin", // S-07
  "Content-Security-Policy": CSP, // S-08
  "Permissions-Policy": PERMISSIONS_POLICY, // S-09
};

export default {
  async fetch(request, _env, ctx) {
    const response = await fetch(request);

    // Response headers are immutable until cloned.
    const patched = new Response(response.body, response);

    for (const [name, value] of Object.entries(HEADERS)) {
      patched.headers.set(name, value);
    }

    // access-control-allow-origin: * is correct for public static assets
    // (S-12 confirmed nothing sensitive is served), so it is left alone.

    return patched;
  },
};

import type { Metadata, Viewport } from "next";
import {
  Inter,
  Poppins,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { SkipLink } from "@/components/ui/skip-link";
import { JsonLd } from "@/components/ui/json-ld";
import { OG_IMAGE, SITE_NAME, SITE_URL, TITLE_SUFFIX } from "@/lib/seo";
import { organisationJsonLd } from "@/lib/structured-data";

/* ---- Fonts wired to the CSS variables used in tailwind.config ---- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "॥ मातोश्रीचा विघ्नहर्ता ॥ · मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    template: `%s · ${TITLE_SUFFIX}`,
  },
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.), मुंबई — १९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे. गणेशोत्सव, सांस्कृतिक वारसा आणि वर्षभर सामाजिक कार्य.",
  keywords: [
    "Ganeshotsav",
    "Ganesh Mandal Mumbai",
    "Matoshri Shivgarjana",
    "सार्वजनिक गणेशोत्सव मंडळ",
    "Ganpati Mandal",
    "Mumbai Ganesh festival",
    "Maharashtrian culture",
  ],
  authors: [{ name: "Matoshri Shivgarjana Mandal" }],

  /* N-20 / N-21 — `alternates.canonical` and `openGraph.url` deliberately do
   * NOT live here any more. Next.js inherits root-layout metadata into every
   * child route that doesn't override it, which is exactly how all 13 pages
   * ended up canonicalising to "/". Each page.tsx now calls
   * buildMetadata({ path }) from @/lib/seo instead.
   *
   * The og:image below IS inherited on purpose: a route that forgets its
   * metadata still gets a share thumbnail, and a missing canonical is far
   * less harmful than a wrong one — Google just self-canonicalises. */
  openGraph: {
    type: "website",
    locale: "mr_IN",
    alternateLocale: "en_IN",
    siteName: SITE_NAME,
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description:
      "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे. मुंबईतील आघाडीचे सार्वजनिक गणेशोत्सव मंडळ.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description: "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे.",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2a0712",
  width: "device-width",
  initialScale: 1,
};

/* JSON-LD now lives in @/lib/structured-data — it grew past the point where
   inlining it here made sense, and /events/ needs the Place block too.
   N-24 (missing telephone) is fixed there, along with the street address,
   postal code and geo slot that Google needs to tie the site to a real
   location in Bhoiwada. */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${devanagari.variable}`}
    >
      <head>
        {/* S-08, PARTIAL. GitHub Pages cannot set response headers, so this is
            the only CSP available until a proxy fronts the site.
            Origins are exhaustive, not guessed: the only external resource the
            site loads is the Google-Maps iframe (S-16 confirmed this — fonts
            are self-hosted by next/font, and every image lives in public/).

            Known limits of a <meta> CSP — read before assuming S-04..S-10 are
            closed by this:
              - `frame-ancestors` is IGNORED in meta, so this does NOT fix S-10
                (clickjacking). Header-only. Same for X-Frame-Options.
              - It only governs content parsed after it, so it is weaker than
                the real header regardless.
            Delete this block once Cloudflare is serving the real headers —
            see SECURITY-HEADERS.md. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "form-action 'self'",
            // Static export inlines Next's hydration bootstrap and the viewport
            // script below; a nonce needs a server, so 'unsafe-inline' is the
            // honest ceiling here.
            "script-src 'self' 'unsafe-inline'",
            // framer-motion writes inline style attributes.
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-src https://maps.google.com https://www.google.com",
            "upgrade-insecure-requests",
          ].join("; ")}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var u=navigator.userAgent||"";var m=/iPhone|iPod|iPad|Android|Mobile|Windows Phone/i.test(u);var t=(navigator.maxTouchPoints||0)>1;var d=Math.min(screen.width||9999,screen.height||9999);if(!m&&t&&d<=480){var v=document.querySelector('meta[name="viewport"]');if(v){v.setAttribute("content","width=1366");}}}catch(e){}})();`,
          }}
        />
        <JsonLd data={organisationJsonLd()} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider defaultLang="mr">
            {/* N-17 — must be the first focusable element in the document. */}
            <SkipLink />
            <ScrollProgress />
            <Navbar />
            {/* N-17 — tabIndex={-1} is required: without it Safari moves the
                URL fragment but leaves focus at the top of the document, so
                the skip link looks like it works and doesn't. */}
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <BackToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

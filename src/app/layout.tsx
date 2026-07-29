import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Mukta } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import StructuredData from "./structured-data";
import { asset } from "@/lib/asset";

/* ---- Fonts wired to the CSS variables used in tailwind.config ---- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // Body face — not needed for the LCP paint, so it must not compete with
  // the hero image for bandwidth (MCV-014).
  preload: false,
});
const poppins = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  // Display face used by the H1 — the only family worth preloading.
  preload: true,
});
const devanagari = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

const SITE_URL = "https://matoshreechavighnaharta.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "॥ मातोश्रीचा विघ्नहर्ता ॥ · मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    template: "%s · मातोश्री शिवगर्जना मंडळ",
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
  openGraph: {
    type: "website",
    locale: "mr_IN",
    siteName: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description:
      "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे. मुंबईतील आघाडीचे सार्वजनिक गणेशोत्सव मंडळ.",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) — ४७ वे वर्ष",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description: "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे.",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) — ४७ वे वर्ष",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2a0712",
  width: "device-width",
  initialScale: 1,
};

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
      <body
        style={
          {
            "--page-bg-image": `url(${asset("/bg-ganpati.jpg")})`,
          } as React.CSSProperties
        }
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var applied=null,raf=0;function dm(){var u=navigator.userAgent||"";var mob=/iPhone|iPod|Android.*Mobile|Mobile Safari|Windows Phone|IEMobile/i.test(u);var touch=(navigator.maxTouchPoints||0)>1;var small=Math.min(screen.width||9999,screen.height||9999)<=1024;return !mob&&touch&&small;}function vp(c){var o=document.querySelector('meta[name="viewport"]');if(!o||o.getAttribute("content")===c)return;var m=document.createElement("meta");m.setAttribute("name","viewport");m.setAttribute("content",c);o.parentNode.replaceChild(m,o);}function apply(){var on=dm();if(on===applied)return;applied=on;var e=document.documentElement;if(on){e.setAttribute("data-desktop-mode","1");vp("width=1280");}else{e.removeAttribute("data-desktop-mode");vp("width=device-width, initial-scale=1");}void e.offsetHeight;}try{apply();}catch(e){}function onR(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;try{apply();}catch(e){}});}window.addEventListener("resize",onR);window.addEventListener("orientationchange",onR);window.addEventListener("pageshow",onR);})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `/*btnRipple*/document.addEventListener("pointermove",function(e){var b=e.target&&e.target.closest&&e.target.closest(".btn");if(!b)return;var r=b.getBoundingClientRect();b.style.setProperty("--rx",((e.clientX-r.left)/r.width*100)+"%");b.style.setProperty("--ry",((e.clientY-r.top)/r.height*100)+"%");},{passive:true});`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-on-gold"
        >
          {/* server-rendered: both scripts, so it is correct in either language */}
          मुख्य मजकुरावर जा · Skip to content
        </a>
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider defaultLang="mr">
            <ScrollProgress />
            <Navbar />
            <main id="main" tabIndex={-1}>{children}</main>
            <Footer />
            <BackToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

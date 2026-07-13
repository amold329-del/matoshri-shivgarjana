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
import { getSettings } from "@/lib/content";

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

const settings = getSettings();
const SITE_URL = "https://matoshri-shivgarjana.org";

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
    alternateLocale: "en_IN",
    url: SITE_URL,
    siteName: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description:
      "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे. मुंबईतील आघाडीचे सार्वजनिक गणेशोत्सव मंडळ.",
  },
  twitter: {
    card: "summary_large_image",
    title: "मातोश्री शिवगर्जना मंडळ · ४७ वे वर्ष",
    description: "१९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#2a0712",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD structured data for the organisation (SEO / rich results). */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
  alternateName: "Matoshri Shivgarjana Sarvajanik Ganeshotsav Mandal",
  foundingDate: "1980",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  email: settings.contact.email,
  sameAs: settings.social.map((s) => s.href),
  slogan: "श्रद्धा • एकता • सेवा",
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
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var u=navigator.userAgent||"";var m=/iPhone|iPod|iPad|Android|Mobile|Windows Phone/i.test(u);var t=(navigator.maxTouchPoints||0)>1;var d=Math.min(screen.width||9999,screen.height||9999);if(!m&&t&&d<=480){var v=document.querySelector('meta[name="viewport"]');if(v){v.setAttribute("content","width=1366");}}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider defaultLang="mr">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

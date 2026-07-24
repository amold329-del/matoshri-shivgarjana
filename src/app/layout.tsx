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
import StructuredData from "./structured-data";

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
            __html: `(function(){function f(){try{var u=navigator.userAgent||"";var m=/iPhone|iPod|Android.*Mobile|Mobile Safari|Windows Phone|IEMobile/i.test(u);var t=(navigator.maxTouchPoints||0)>1;var p=Math.min(screen.width||9999,screen.height||9999);var w=window.innerWidth||document.documentElement.clientWidth||0;var on=!m&&t&&p<=1024&&w<1200;var e=document.documentElement;if(on){e.setAttribute("data-desktop-mode","1");var v=document.querySelector('meta[name="viewport"]');if(v&&v.getAttribute("content").indexOf("1280")<0){v.setAttribute("content","width=1280");}}else{e.removeAttribute("data-desktop-mode");}}catch(e){}}f();window.addEventListener("resize",f);window.addEventListener("orientationchange",f);})();`,
          }}
        />
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
            <main>{children}</main>
            <Footer />
            <BackToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { AboutView } from "./view";

export const metadata: Metadata = {
  title: "आमच्याबद्दल",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाची कहाणी — १९८० पासूनची भक्ती, संस्कृती आणि सामाजिक सेवेची चार दशके.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/", title: "आमच्याबद्दल", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/about/" name="आमच्याबद्दल" />
      <AboutView />
    </>
  );
}

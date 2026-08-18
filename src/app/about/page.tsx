import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { AboutView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/about/",
  absoluteTitle:
    "आमच्याबद्दल · About Matoshree Shivgarjana Mandal, Parel",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाची कहाणी — १९८० पासूनची भक्ती, संस्कृती आणि सामाजिक सेवेची चार दशके.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/about/" name="आमच्याबद्दल" />
      <AboutView />
    </>
  );
}

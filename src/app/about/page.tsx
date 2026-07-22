import type { Metadata } from "next";
import { AboutView } from "./view";

export const metadata: Metadata = {
  title: "आमच्याबद्दल",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाची कहाणी — १९८० पासूनची भक्ती, संस्कृती आणि सामाजिक सेवेची चार दशके.",
};

export default function Page() {
  return <AboutView />;
}

import { AboutView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "आमच्याबद्दल",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाची कहाणी — १९८० पासूनची भक्ती, संस्कृती आणि सामाजिक सेवेची चार दशके.",
  path: "/about",
});

export default function Page() {
  return <AboutView />;
}

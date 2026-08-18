import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { AdvertisementsView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/advertisements/",
  title: "जाहिराती व प्रायोजक",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाला पाठिंबा देणाऱ्या स्थानिक दुकानांच्या जाहिराती — परेल-भोईवाडा, मुंबई.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/advertisements/" name="जाहिराती व प्रायोजक" />
      <AdvertisementsView />
    </>
  );
}

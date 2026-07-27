import type { Metadata } from "next";
import { AdvertisementsView } from "./view";

export const metadata: Metadata = {
  title: "जाहिराती व प्रायोजक",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाला पाठिंबा देणाऱ्या स्थानिक दुकानांच्या जाहिराती — परेल-भोईवाडा, मुंबई.",
};

export default function Page() {
  return <AdvertisementsView />;
}

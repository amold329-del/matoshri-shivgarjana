import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { AdvertisementsView } from "./view";

export const metadata: Metadata = {
  title: "जाहिराती व प्रायोजक",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाला पाठिंबा देणाऱ्या स्थानिक दुकानांच्या जाहिराती — परेल-भोईवाडा, मुंबई.",
  alternates: { canonical: "/advertisements/" },
  openGraph: { url: "/advertisements/", title: "जाहिराती व प्रायोजक", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/advertisements/" name="जाहिराती व प्रायोजक" />
      <AdvertisementsView />
    </>
  );
}

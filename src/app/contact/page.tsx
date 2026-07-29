import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ContactView } from "./view";

export const metadata: Metadata = {
  title: "संपर्क करा",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाशी संपर्क साधा — पत्ता, दूरध्वनी, ईमेल आणि स्थान नकाशा.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/", title: "संपर्क करा", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/contact/" name="संपर्क करा" />
      <ContactView />
    </>
  );
}

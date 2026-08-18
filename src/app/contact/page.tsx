import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ContactView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/contact/",
  absoluteTitle:
    "संपर्क · Contact Matoshree Shivgarjana Mandal, Mumbai",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाशी संपर्क साधा — पत्ता, दूरध्वनी, ईमेल आणि स्थान नकाशा.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/contact/" name="संपर्क करा" />
      <ContactView />
    </>
  );
}

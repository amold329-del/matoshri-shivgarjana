import type { Metadata } from "next";
import { ContactView } from "./view";

export const metadata: Metadata = {
  title: "संपर्क करा",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाशी संपर्क साधा — पत्ता, दूरध्वनी, ईमेल आणि स्थान नकाशा.",
};

export default function Page() {
  return <ContactView />;
}

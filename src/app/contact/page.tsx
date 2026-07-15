import { ContactView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "संपर्क करा",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाशी संपर्क साधा — पत्ता, दूरध्वनी, ईमेल आणि स्थान नकाशा.",
  path: "/contact",
});

export default function Page() {
  return <ContactView />;
}

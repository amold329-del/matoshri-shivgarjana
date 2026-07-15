import { RegistrationView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "नोंदणी तपशील",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) ची अधिकृत नोंदणी माहिती — नोंदणी क्रमांक, पॅन आणि कायदेशीर स्थिती.",
  path: "/registration",
});

export default function Page() {
  return <RegistrationView />;
}

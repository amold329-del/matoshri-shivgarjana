import type { Metadata } from "next";
import { RegistrationView } from "./view";

export const metadata: Metadata = {
  title: "नोंदणी तपशील",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) ची अधिकृत नोंदणी माहिती — नोंदणी क्रमांक, पॅन आणि कायदेशीर स्थिती.",
};

export default function Page() {
  return <RegistrationView />;
}

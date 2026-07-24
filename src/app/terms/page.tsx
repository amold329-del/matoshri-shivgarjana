import type { Metadata } from "next";
import { TermsView } from "./view";

export const metadata: Metadata = {
  title: "अटी व गोपनीयता",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ संकेतस्थळाच्या वापराच्या अटी आणि गोपनीयता धोरण.",
};

export default function Page() {
  return <TermsView />;
}

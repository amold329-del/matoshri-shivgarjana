import type { Metadata } from "next";
import { CommitteeView } from "./view";

export const metadata: Metadata = {
  title: "कार्यकारिणी",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाचे नेतृत्व करणारे पदाधिकारी आणि स्वयंसेवक.",
};

export default function Page() {
  return <CommitteeView />;
}

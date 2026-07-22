import type { Metadata } from "next";
import { NewsView } from "./view";

export const metadata: Metadata = {
  title: "बातम्या",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाच्या घोषणा, अद्यतने आणि सूचना.",
};

export default function Page() {
  return <NewsView />;
}

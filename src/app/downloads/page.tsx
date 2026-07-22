import type { Metadata } from "next";
import { DownloadsView } from "./view";

export const metadata: Metadata = {
  title: "डाउनलोड",
  description:
    "मातोश्री शिवगर्जना मंडळाचे फॉर्म, सूचना, वार्षिक अहवाल आणि इतर दस्तऐवज डाउनलोड करा.",
};

export default function Page() {
  return <DownloadsView />;
}

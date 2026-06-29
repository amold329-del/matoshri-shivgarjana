import type { Metadata } from "next";
import { HistoryView } from "./view";

export const metadata: Metadata = {
  title: "इतिहास",
  description:
    "१९८० मधील पहिल्या गणेशोत्सवापासून ते अधिकृत नोंदणी आणि ४७ व्या वर्षाच्या सोहळ्यापर्यंत — मातोश्री शिवगर्जना मंडळाचे टप्पे.",
};

export default function Page() {
  return <HistoryView />;
}

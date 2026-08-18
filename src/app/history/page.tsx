import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { HistoryView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/history/",
  absoluteTitle:
    "इतिहास · History of Matoshree Shivgarjana Mandal, 1980",
  description:
    "१९८० मधील पहिल्या गणेशोत्सवापासून ते अधिकृत नोंदणी आणि ४७ व्या वर्षाच्या सोहळ्यापर्यंत — मातोश्री शिवगर्जना मंडळाचे टप्पे.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/history/" name="इतिहास" />
      <HistoryView />
    </>
  );
}

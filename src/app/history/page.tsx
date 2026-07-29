import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { HistoryView } from "./view";

export const metadata: Metadata = {
  title: "इतिहास",
  description:
    "१९८० मधील पहिल्या गणेशोत्सवापासून ते अधिकृत नोंदणी आणि ४७ व्या वर्षाच्या सोहळ्यापर्यंत — मातोश्री शिवगर्जना मंडळाचे टप्पे.",
  alternates: { canonical: "/history/" },
  openGraph: { url: "/history/", title: "इतिहास", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/history/" name="इतिहास" />
      <HistoryView />
    </>
  );
}

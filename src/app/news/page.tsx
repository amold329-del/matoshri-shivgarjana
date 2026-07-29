import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { NewsView } from "./view";

export const metadata: Metadata = {
  title: "बातम्या",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाच्या घोषणा, अद्यतने आणि सूचना.",
  alternates: { canonical: "/news/" },
  openGraph: { url: "/news/", title: "बातम्या", images: [{ url: "/og/news.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/news.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/news/" name="बातम्या" />
      <NewsView />
    </>
  );
}

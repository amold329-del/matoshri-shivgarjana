import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { NewsView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/news/",
  title: "बातम्या",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाच्या घोषणा, अद्यतने आणि सूचना.",
  ogImage: "/og/news.jpg",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/news/" name="बातम्या" />
      <NewsView />
    </>
  );
}

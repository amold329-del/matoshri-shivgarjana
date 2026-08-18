import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { DownloadsView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/downloads/",
  title: "डाउनलोड",
  description:
    "मातोश्री शिवगर्जना मंडळाचे फॉर्म, सूचना, वार्षिक अहवाल आणि इतर दस्तऐवज डाउनलोड करा.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/downloads/" name="डाउनलोड" />
      <DownloadsView />
    </>
  );
}

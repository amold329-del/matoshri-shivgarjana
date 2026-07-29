import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { DownloadsView } from "./view";

export const metadata: Metadata = {
  title: "डाउनलोड",
  description:
    "मातोश्री शिवगर्जना मंडळाचे फॉर्म, सूचना, वार्षिक अहवाल आणि इतर दस्तऐवज डाउनलोड करा.",
  alternates: { canonical: "/downloads/" },
  openGraph: { url: "/downloads/", title: "डाउनलोड", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/downloads/" name="डाउनलोड" />
      <DownloadsView />
    </>
  );
}

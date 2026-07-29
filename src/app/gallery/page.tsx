import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { GalleryView } from "./view";

export const metadata: Metadata = {
  title: "गॅलरी",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव, सामाजिक उपक्रम आणि सांस्कृतिक कार्यक्रमांची छायाचित्रे आणि क्षण.",
  alternates: { canonical: "/gallery/" },
  openGraph: { url: "/gallery/", title: "गॅलरी", images: [{ url: "/og/gallery.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og/gallery.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/gallery/" name="गॅलरी" />
      <GalleryView />
    </>
  );
}

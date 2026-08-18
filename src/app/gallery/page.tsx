import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { GalleryView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/gallery/",
  absoluteTitle:
    "गॅलरी · Ganeshotsav Photo Gallery, Parel Mumbai",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव, सामाजिक उपक्रम आणि सांस्कृतिक कार्यक्रमांची छायाचित्रे आणि क्षण.",
  ogImage: "/og/gallery.jpg",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/gallery/" name="गॅलरी" />
      <GalleryView />
    </>
  );
}

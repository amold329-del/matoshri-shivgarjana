import type { Metadata } from "next";
import { GalleryView } from "./view";

export const metadata: Metadata = {
  title: "गॅलरी",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव, सामाजिक उपक्रम आणि सांस्कृतिक कार्यक्रमांची छायाचित्रे आणि क्षण.",
};

export default function Page() {
  return <GalleryView />;
}

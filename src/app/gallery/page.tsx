import { GalleryView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "गॅलरी",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव, सामाजिक उपक्रम आणि सांस्कृतिक कार्यक्रमांची छायाचित्रे आणि क्षण.",
  path: "/gallery",
});

export default function Page() {
  return <GalleryView />;
}

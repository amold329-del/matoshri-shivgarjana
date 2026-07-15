import { DownloadsView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "डाउनलोड",
  description:
    "मातोश्री शिवगर्जना मंडळाचे फॉर्म, सूचना, वार्षिक अहवाल आणि इतर दस्तऐवज डाउनलोड करा.",
  path: "/downloads",
});

export default function Page() {
  return <DownloadsView />;
}

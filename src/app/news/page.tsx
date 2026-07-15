import { NewsView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "बातम्या",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाच्या घोषणा, अद्यतने आणि सूचना.",
  path: "/news",
});

export default function Page() {
  return <NewsView />;
}

import { CommitteeView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "कार्यकारिणी",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाचे नेतृत्व करणारे पदाधिकारी आणि स्वयंसेवक.",
  path: "/committee",
});

export default function Page() {
  return <CommitteeView />;
}

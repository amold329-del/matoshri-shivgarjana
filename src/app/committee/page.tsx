import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { CommitteeView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/committee/",
  absoluteTitle:
    "कार्यकारिणी · Mandal Committee, Parel Mumbai",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाचे नेतृत्व करणारे पदाधिकारी आणि स्वयंसेवक.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/committee/" name="कार्यकारिणी" />
      <CommitteeView />
    </>
  );
}

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { RegistrationView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/registration/",
  title: "नोंदणी तपशील",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) ची अधिकृत नोंदणी माहिती — नोंदणी क्रमांक, पॅन आणि कायदेशीर स्थिती.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/registration/" name="नोंदणी तपशील" />
      <RegistrationView />
    </>
  );
}

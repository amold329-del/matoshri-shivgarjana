import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { TermsView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/terms/",
  title: "अटी व गोपनीयता",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ संकेतस्थळाच्या वापराच्या अटी आणि गोपनीयता धोरण.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/terms/" name="अटी व गोपनीयता" />
      <TermsView />
    </>
  );
}

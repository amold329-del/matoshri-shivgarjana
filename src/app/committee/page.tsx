import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { CommitteeView } from "./view";

export const metadata: Metadata = {
  title: "कार्यकारिणी",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाचे नेतृत्व करणारे पदाधिकारी आणि स्वयंसेवक.",
  alternates: { canonical: "/committee/" },
  openGraph: { url: "/committee/", title: "कार्यकारिणी", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/committee/" name="कार्यकारिणी" />
      <CommitteeView />
    </>
  );
}

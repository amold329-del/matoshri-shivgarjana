import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { RegistrationView } from "./view";

export const metadata: Metadata = {
  title: "नोंदणी तपशील",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.) ची अधिकृत नोंदणी माहिती — नोंदणी क्रमांक, पॅन आणि कायदेशीर स्थिती.",
  alternates: { canonical: "/registration/" },
  openGraph: { url: "/registration/", title: "नोंदणी तपशील", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/registration/" name="नोंदणी तपशील" />
      <RegistrationView />
    </>
  );
}

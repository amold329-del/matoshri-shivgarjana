import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { VarganiView } from "./view";

export const metadata: Metadata = {
  title: "वर्गणीबद्दल",
  description:
    "वर्गणी म्हणजे काय, ती का महत्त्वाची आहे आणि मातोश्री शिवगर्जना मंडळाला मिळणाऱ्या प्रत्येक देणगीचा विनियोग — संपूर्ण पारदर्शकतेसह.",
  alternates: { canonical: "/vargani/" },
  openGraph: { url: "/vargani/", title: "वर्गणीबद्दल", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/vargani/" name="वर्गणीबद्दल" />
      <VarganiView />
    </>
  );
}

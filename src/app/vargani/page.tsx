import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { VarganiView } from "./view";

export const metadata: Metadata = buildMetadata({
  path: "/vargani/",
  title: "वर्गणीबद्दल",
  description:
    "वर्गणी म्हणजे काय, ती का महत्त्वाची आहे आणि मातोश्री शिवगर्जना मंडळाला मिळणाऱ्या प्रत्येक देणगीचा विनियोग — संपूर्ण पारदर्शकतेसह.",
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/vargani/" name="वर्गणीबद्दल" />
      <VarganiView />
    </>
  );
}

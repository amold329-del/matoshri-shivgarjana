import type { Metadata } from "next";
import { VarganiView } from "./view";

export const metadata: Metadata = {
  title: "वर्गणीबद्दल",
  description:
    "वर्गणी म्हणजे काय, ती का महत्त्वाची आहे आणि मातोश्री शिवगर्जना मंडळाला मिळणाऱ्या प्रत्येक देणगीचा विनियोग — संपूर्ण पारदर्शकतेसह.",
};

export default function Page() {
  return <VarganiView />;
}

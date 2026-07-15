import { VarganiView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "वर्गणीबद्दल",
  description:
    "वर्गणी म्हणजे काय, ती का महत्त्वाची आहे आणि मातोश्री शिवगर्जना मंडळाला मिळणाऱ्या प्रत्येक देणगीचा विनियोग — संपूर्ण पारदर्शकतेसह.",
  path: "/vargani",
});

export default function Page() {
  return <VarganiView />;
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { FaqView } from "./view";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "वारंवार विचारले जाणारे प्रश्न",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाबद्दलचे प्रश्न — ठिकाण, आगमन व विसर्जन मार्ग, गणेश चतुर्थी २०२६, वर्गणी, हिशोब आणि संपर्क.",
  alternates: { canonical: "/faq/" },
  openGraph: { url: "/faq/", title: "वारंवार विचारले जाणारे प्रश्न", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

/**
 * FAQPage structured data. Each question/answer is an individually
 * extractable passage, which is what answer engines quote from.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: getFaq().map((f) => ({
    "@type": "Question",
    name: f.q.mr,
    acceptedAnswer: { "@type": "Answer", text: f.a.mr },
  })),
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/faq/" name="वारंवार विचारले जाणारे प्रश्न" />
      <FaqView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

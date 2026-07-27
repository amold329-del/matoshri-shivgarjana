import type { Metadata } from "next";
import { FaqView } from "./view";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "वारंवार विचारले जाणारे प्रश्न",
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाबद्दलचे प्रश्न — ठिकाण, आगमन व विसर्जन मार्ग, गणेश चतुर्थी २०२६, वर्गणी, हिशोब आणि संपर्क.",
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
      <FaqView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

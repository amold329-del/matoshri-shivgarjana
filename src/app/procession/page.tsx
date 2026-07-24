import type { Metadata } from "next";
import { ProcessionView } from "./view";
import { getProcession } from "@/lib/content";

export const metadata: Metadata = {
  title: "आगमन व विसर्जन मार्ग",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव २०२६ आगमन व विसर्जन मिरवणुकीचा संपूर्ण मार्ग आणि वेळापत्रक — भोईवाडा, परेल, मुंबई.",
};

const SITE_URL = "https://matoshreechavighnaharta.co.in";

const processionJsonLd = getProcession().map((route) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: route.title.mr,
  startDate: route.date,
  description: `${route.title.mr} — ${route.stops
    .map((s) => s.mr)
    .join(" → ")}. ${route.timeLabel.mr}.`,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400012",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    url: SITE_URL,
  },
}));

export default function Page() {
  return (
    <>
      <ProcessionView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processionJsonLd) }}
      />
    </>
  );
}

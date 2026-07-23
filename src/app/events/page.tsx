import type { Metadata } from "next";
import { EventsView } from "./view";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "कार्यक्रम",
  description:
    "मातोश्री शिवगर्जना मंडळाचे आगामी व मागील कार्यक्रम — गणेशोत्सव वेळापत्रक, सांस्कृतिक संध्या, आरत्या आणि सामुदायिक उपक्रम.",
};

const SITE_URL = "https://matoshreechavighnaharta.co.in";

const EVENT_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
  addressLocality: "Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400012",
  addressCountry: "IN",
};

const EVENT_ORGANIZER = {
  "@type": "Organization",
  name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
  url: SITE_URL,
};

/** "6:00 AM" -> "06:00:00"; returns null when time is missing/unparseable. */
function toIsoTime(time?: string): string | null {
  if (!time) return null;
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
}

/** schema.org startDate: date-only, or date + time in IST (+05:30). */
function toStartDate(date: string, time?: string): string {
  const isoTime = toIsoTime(time);
  return isoTime ? `${date}T${isoTime}+05:30` : date;
}

const eventsJsonLd = getEvents().map((event) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.title.mr,
  startDate: toStartDate(event.date, event.time),
  description: event.body.mr,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: event.venue.mr,
    address: EVENT_ADDRESS,
  },
  organizer: EVENT_ORGANIZER,
}));

export default function Page() {
  return (
    <>
      <EventsView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
    </>
  );
}

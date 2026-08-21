import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { EventsView } from "./view";
import { getEvents } from "@/lib/content";
import { buildEvent } from "@/lib/event-schema";

export const metadata: Metadata = buildMetadata({
  path: "/events/",
  absoluteTitle:
    "कार्यक्रम · Ganeshotsav 2026 Events, Parel Mumbai",
  description:
    "मातोश्री शिवगर्जना मंडळाचे आगामी व मागील कार्यक्रम — गणेशोत्सव वेळापत्रक, सांस्कृतिक संध्या, आरत्या आणि सामुदायिक उपक्रम.",
  ogImage: "/og/events.jpg",
});

/**
 * One Event per programme in content/events.json, all through the shared
 * builder in src/lib/event-schema.ts. `endTime` is optional there: the events
 * whose finishing time the Mandal has not set emit no `endDate` rather than a
 * guessed one.
 */
const eventsJsonLd = getEvents()
  // Events whose schema another page owns (see EventItem.schemaRef) are skipped
  // here so the same procession is not emitted twice under two @ids.
  .filter((event) => !event.schemaRef)
  .map((event) =>
  buildEvent({
    id: event.id,
    path: "/events/",
    name: event.title.mr,
    description: event.body.mr,
    date: event.date,
    startTime: event.time,
    endTime: event.endTime,
    endDate: event.endDate,
    venueName: event.venue.mr,
  }),
);

export default function Page() {
  return (
    <>
      <Breadcrumb path="/events/" name="कार्यक्रम" />
      <EventsView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
    </>
  );
}

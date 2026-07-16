import { EventsView } from "./view";
import { JsonLd } from "@/components/ui/json-ld";
import { buildMetadata } from "@/lib/seo";
import { eventsJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "कार्यक्रम",
  description:
    "मातोश्री शिवगर्जना मंडळाचे आगामी व मागील कार्यक्रम — गणेशोत्सव वेळापत्रक, सांस्कृतिक संध्या, आरत्या आणि सामुदायिक उपक्रम.",
  path: "/events",
});

export default function Page() {
  return (
    <>
      {/* Event markup for the Ganeshotsav programme — makes these eligible for
          date-stamped results rather than a plain blue link. */}
      <JsonLd data={eventsJsonLd()} />
      <EventsView />
    </>
  );
}

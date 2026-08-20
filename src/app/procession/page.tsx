import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ProcessionView } from "./view";
import { getProcession } from "@/lib/content";
import { buildEvent } from "@/lib/event-schema";

export const metadata: Metadata = buildMetadata({
  path: "/procession/",
  absoluteTitle:
    "आगमन व विसर्जन मार्ग · Ganesh Procession Route, Parel",
  description:
    "मातोश्री शिवगर्जना मंडळाच्या गणेशोत्सव २०२६ आगमन व विसर्जन मिरवणुकीचा संपूर्ण मार्ग आणि वेळापत्रक — भोईवाडा, परेल, मुंबई.",
});

/**
 * The aagman and visarjan processions. Both have a real finishing time in
 * content/procession.json (timeLabel, e.g. "4:00 PM to 9:00 PM"), which the
 * previous inline schema spent on the description string while emitting a
 * date-only startDate. startTime/endTime now feed the builder directly, so both
 * events carry a precise startDate and a true endDate.
 */
const processionJsonLd = getProcession().map((route) =>
  buildEvent({
    id: route.id,
    path: "/procession/",
    name: route.title.mr,
    description: `${route.title.mr} — ${route.stops
      .map((s) => s.mr)
      .join(" → ")}. ${route.timeLabel.mr}.`,
    date: route.date,
    startTime: route.startTime,
    endTime: route.endTime,
  }),
);

export default function Page() {
  return (
    <>
      <Breadcrumb path="/procession/" name="आगमन व विसर्जन मार्ग" />
      <ProcessionView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processionJsonLd) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { EventsView } from "./view";

export const metadata: Metadata = {
  title: "कार्यक्रम",
  description:
    "मातोश्री शिवगर्जना मंडळाचे आगामी व मागील कार्यक्रम — गणेशोत्सव वेळापत्रक, सांस्कृतिक संध्या, आरत्या आणि सामुदायिक उपक्रम.",
};

export default function Page() {
  return <EventsView />;
}

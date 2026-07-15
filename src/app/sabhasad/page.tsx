import { SabhasadView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "सभासद — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची ऑनलाइन सभासद नोंदणी लवकरच येत आहे. तोपर्यंत सभासद होण्यासाठी कार्यकारिणीशी संपर्क साधा.",
  path: "/sabhasad",
});

export default function Page() {
  return <SabhasadView />;
}

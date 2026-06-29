import type { Metadata } from "next";
import { SabhasadView } from "./view";

export const metadata: Metadata = {
  title: "सभासद — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची ऑनलाइन सभासद नोंदणी लवकरच येत आहे. तोपर्यंत सभासद होण्यासाठी कार्यकारिणीशी संपर्क साधा.",
};

export default function Page() {
  return <SabhasadView />;
}

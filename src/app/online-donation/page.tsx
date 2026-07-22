import type { Metadata } from "next";
import { OnlineDonationView } from "./view";

export const metadata: Metadata = {
  title: "ऑनलाइन देणगी — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची सुरक्षित ऑनलाइन वर्गणी व देणगी सुविधा लवकरच येत आहे. तोपर्यंत वर्गणीसाठी कार्यकारिणीशी संपर्क साधा.",
};

export default function Page() {
  return <OnlineDonationView />;
}

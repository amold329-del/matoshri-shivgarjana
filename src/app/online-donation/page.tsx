import { OnlineDonationView } from "./view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ऑनलाइन देणगी — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची सुरक्षित ऑनलाइन वर्गणी व देणगी सुविधा लवकरच येत आहे. तोपर्यंत वर्गणीसाठी कार्यकारिणीशी संपर्क साधा.",
  path: "/online-donation",
});

export default function Page() {
  return <OnlineDonationView />;
}

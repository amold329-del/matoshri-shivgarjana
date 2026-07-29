import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { OnlineDonationView } from "./view";

export const metadata: Metadata = {
  title: "ऑनलाइन देणगी — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची सुरक्षित ऑनलाइन वर्गणी व देणगी सुविधा लवकरच येत आहे. तोपर्यंत वर्गणीसाठी कार्यकारिणीशी संपर्क साधा.",
  alternates: { canonical: "/online-donation/" },
  openGraph: { url: "/online-donation/", title: "ऑनलाइन देणगी — लवकरच", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/online-donation/" name="ऑनलाइन देणगी — लवकरच" />
      <OnlineDonationView />
    </>
  );
}

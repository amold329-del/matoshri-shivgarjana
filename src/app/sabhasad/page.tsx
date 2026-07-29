import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { SabhasadView } from "./view";

export const metadata: Metadata = {
  title: "सभासद — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची ऑनलाइन सभासद नोंदणी लवकरच येत आहे. तोपर्यंत सभासद होण्यासाठी कार्यकारिणीशी संपर्क साधा.",
  alternates: { canonical: "/sabhasad/" },
  openGraph: { url: "/sabhasad/", title: "सभासद — लवकरच", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/og-cover.jpg"] },
};

export default function Page() {
  return (
    <>
      <Breadcrumb path="/sabhasad/" name="सभासद — लवकरच" />
      <SabhasadView />
    </>
  );
}

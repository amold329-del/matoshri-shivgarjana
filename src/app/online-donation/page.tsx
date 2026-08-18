import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { OnlineDonationView } from "./view";

/**
 * Placeholder page — noindex until the feature actually exists.
 *
 * The page stays in the navigation so visitors can see what is coming, but
 * there is nothing here for a search result yet, and asking Google to index a
 * "coming soon" notice spends crawl budget the real pages need. `follow` is
 * kept so the links out of it still carry.
 *
 * On launch: drop the `robots` line below and add "/online-donation/" back to
 * src/app/sitemap.ts.
 */
export const metadata: Metadata = buildMetadata({
  path: "/online-donation/",
  title: "ऑनलाइन देणगी — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची सुरक्षित ऑनलाइन वर्गणी व देणगी सुविधा लवकरच येत आहे. तोपर्यंत वर्गणीसाठी कार्यकारिणीशी संपर्क साधा.",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/online-donation/" name="ऑनलाइन देणगी — लवकरच" />
      <OnlineDonationView />
    </>
  );
}

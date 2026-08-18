import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { SabhasadView } from "./view";

/**
 * Placeholder page — noindex until the feature actually exists.
 *
 * The page stays in the navigation so visitors can see what is coming, but
 * there is nothing here for a search result yet, and asking Google to index a
 * "coming soon" notice spends crawl budget the real pages need. `follow` is
 * kept so the links out of it still carry.
 *
 * On launch: drop the `robots` line below and add "/sabhasad/" back to
 * src/app/sitemap.ts.
 */
export const metadata: Metadata = buildMetadata({
  path: "/sabhasad/",
  title: "सभासद — लवकरच",
  description:
    "मातोश्री शिवगर्जना मंडळाची ऑनलाइन सभासद नोंदणी लवकरच येत आहे. तोपर्यंत सभासद होण्यासाठी कार्यकारिणीशी संपर्क साधा.",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <>
      <Breadcrumb path="/sabhasad/" name="सभासद — लवकरच" />
      <SabhasadView />
    </>
  );
}

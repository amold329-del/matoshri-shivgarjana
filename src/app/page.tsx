import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Ribbon } from "@/components/sections/ribbon";
import { Welcome } from "@/components/sections/welcome";
import { Journey } from "@/components/sections/journey";
import { Stats } from "@/components/sections/stats";
import { Countdown } from "@/components/sections/countdown";
import { LatestNews } from "@/components/sections/latest-news";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { SocialActivities } from "@/components/sections/social-activities";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Sponsors } from "@/components/sections/sponsors";

export const metadata = buildMetadata({
  description:
    "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.), मुंबई — १९८० पासून श्रद्धा, एकता आणि सेवेची ४७ वर्षे. गणेशोत्सव, सांस्कृतिक वारसा आणि वर्षभर सामाजिक कार्य.",
  path: "/",
});

/**
 * Homepage — composes the full narrative in the order set by the brief:
 * hero → celebration ribbon → welcome → journey → stats → countdown →
 * news → events → social work → gallery → testimonials → sponsors.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ribbon />
      <Welcome />
      <Journey />
      <Stats />
      <Countdown />
      <LatestNews />
      <UpcomingEvents />
      <SocialActivities />
      <GalleryPreview />
      <Testimonials />
      <Sponsors />
    </>
  );
}

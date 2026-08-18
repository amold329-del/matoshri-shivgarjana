import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Ribbon } from "@/components/sections/ribbon";
import { LogoUnveiling } from "@/components/sections/logo-unveiling";
import { Welcome } from "@/components/sections/welcome";
import { Journey } from "@/components/sections/journey";
import { SuvarnaMahotsav } from "@/components/sections/suvarna-mahotsav";
import { Stats } from "@/components/sections/stats";
import { Countdown } from "@/components/sections/countdown";
import { LatestNews } from "@/components/sections/latest-news";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { SocialActivities } from "@/components/sections/social-activities";
import { CompletedProgrammes } from "@/components/sections/completed-programmes";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Sponsors } from "@/components/sections/sponsors";

/**
 * Homepage — composes the full narrative in the order set by the brief:
 * hero → celebration ribbon → golden-jubilee journey → welcome → journey →
 * stats → countdown → news → events → social work → completed programmes →
 * gallery → testimonials → sponsors.
 */
export const metadata: Metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ribbon />
      <LogoUnveiling />
      <SuvarnaMahotsav />
      <Welcome />
      <Journey />
      <Stats />
      <Countdown />
      <LatestNews />
      <UpcomingEvents />
      <SocialActivities />
      <CompletedProgrammes />
      <GalleryPreview />
      <Testimonials />
      <Sponsors />
    </>
  );
}

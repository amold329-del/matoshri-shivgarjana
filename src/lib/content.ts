/**
 * Content access layer.
 *
 * Every JSON file under /content is imported here and re-exported with a
 * precise type. Because `resolveJsonModule` is on, these are bundled at build
 * time — no fetch, no backend, fully static-export safe.
 *
 * To swap in a real CMS later, replace the bodies of these getters with async
 * fetches; the component API stays identical.
 */
import type {
  SiteSettings,
  NavItem,
  TimelineItem,
  StatItem,
  SocialActivity,
  NewsItem,
  EventItem,
  GalleryItem,
  CommitteeMember,
  Testimonial,
  Sponsor,
  DownloadItem,
  VarganiContent,
  ProcessionRoute,
} from "@/types/content";

import settings from "@/../content/settings.json";
import navigation from "@/../content/navigation.json";
import procession from "@/../content/procession.json";
import timeline from "@/../content/timeline.json";
import stats from "@/../content/stats.json";
import social from "@/../content/social-activities.json";
import news from "@/../content/news.json";
import events from "@/../content/events.json";
import gallery from "@/../content/gallery.json";
import committee from "@/../content/committee.json";
import testimonials from "@/../content/testimonials.json";
import sponsors from "@/../content/sponsors.json";
import downloads from "@/../content/downloads.json";
import vargani from "@/../content/vargani.json";

export const getSettings = (): SiteSettings => settings as SiteSettings;
export const getNav = (): NavItem[] => navigation as NavItem[];
export const getTimeline = (): TimelineItem[] => timeline as TimelineItem[];
export const getStats = (): StatItem[] => stats as StatItem[];
export const getSocialActivities = (): SocialActivity[] =>
  social as SocialActivity[];
export const getNews = (): NewsItem[] => news as NewsItem[];
export const getEvents = (): EventItem[] => events as EventItem[];
export const getGallery = (): GalleryItem[] => gallery as GalleryItem[];
export const getCommittee = (): CommitteeMember[] =>
  committee as CommitteeMember[];
export const getTestimonials = (): Testimonial[] =>
  testimonials as Testimonial[];
export const getSponsors = (): Sponsor[] => sponsors as Sponsor[];
export const getDownloads = (): DownloadItem[] => downloads as DownloadItem[];
export const getVargani = (): VarganiContent => vargani as VarganiContent;
export const getProcession = (): ProcessionRoute[] =>
  procession as ProcessionRoute[];

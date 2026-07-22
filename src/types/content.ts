/**
 * Shared content types.
 * All site content is authored as JSON under /content and typed here so the
 * UI stays strict even though there is no backend (V1.0 static site).
 *
 * `Bilingual` is the core primitive: every user-facing string carries an
 * English (en) and Marathi (mr) variant. The LanguageProvider picks one.
 */
export interface Bilingual {
  en: string;
  mr: string;
}

export interface SiteSettings {
  org: {
    nameShort: Bilingual;
    nameFull: Bilingual;
    tagline: Bilingual;
    motto: Bilingual;
    established: number;
    registered: number;
    anniversaryYear: number;
    yearsCount: number;
    registrationNo: string;
    panNo: string;
  };
  countdown: {
    /** ISO datetime with IST offset, e.g. 2026-09-14T06:00:00+05:30 */
    targetISO: string;
    label: Bilingual;
  };
  contact: {
    addressLines: string[];
    phones: string[];
    email: string;
    hours: Bilingual;
    mapEmbedSrc: string;
    mapLink: string;
  };
  social: { label: string; href: string; icon: string }[];
}

export interface NavItem {
  label: Bilingual;
  href: string;
  comingSoon?: boolean;
}

export interface TimelineItem {
  year: string;
  title: Bilingual;
  body: Bilingual;
  kind: "past" | "current" | "future";
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: Bilingual;
  /** Render the value verbatim (e.g. a year) — no thousands separator, no count-up. */
  plain?: boolean;
}

export interface SocialActivity {
  icon: string;
  title: Bilingual;
  body: Bilingual;
  /** Marks an initiative the Mandal plans to start (shown with a "planned" badge). */
  planned?: boolean;
}

export interface NewsItem {
  id: string;
  date: string;
  category: Bilingual;
  title: Bilingual;
  excerpt: Bilingual;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  date: string;
  time?: string;
  title: Bilingual;
  venue: Bilingual;
  body: Bilingual;
  status: "upcoming" | "past";
}

export interface GalleryItem {
  id: string;
  year: number;
  category: Bilingual;
  caption: Bilingual;
  /** Optional real asset path; when absent a gradient placeholder is shown. */
  src?: string;
  type?: "photo" | "video";
}

export interface CommitteeMember {
  name: string;
  role: Bilingual;
  responsibilities: Bilingual;
  tenure: string;
  phone?: string;
  photo?: string;
}

export interface Testimonial {
  quote: Bilingual;
  name: string;
  role: Bilingual;
}

export interface Sponsor {
  name: string;
  tier?: string;
}

export interface DownloadItem {
  title: Bilingual;
  description: Bilingual;
  category: Bilingual;
  /** Path under /public/documents. Placeholder until real PDFs are added. */
  href: string;
  size?: string;
}

export interface VarganiContent {
  intro: Bilingual;
  whatIs: Bilingual;
  contribution: { amount: number; year: number };
  importance: { title: Bilingual; body: Bilingual }[];
  utilisation: { label: Bilingual; percent: number }[];
}

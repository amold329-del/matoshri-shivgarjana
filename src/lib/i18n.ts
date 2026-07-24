import type { Bilingual } from "@/types/content";

export type Lang = "en" | "mr";

/**
 * UI chrome strings (buttons, section eyebrows, labels).
 * Editorial / data strings live in the JSON content files instead.
 * Keeping these here avoids prop-drilling copy through every component.
 */
export const dict = {
  nav: {
    languageToggle: { en: "मराठी", mr: "EN" },
    themeLight: { en: "Light", mr: "उजेड" },
    themeDark: { en: "Dark", mr: "अंधार" },
    menu: { en: "Menu", mr: "मेनू" },
  },
  cta: {
    gallery: { en: "Gallery", mr: "गॅलरी" },
    about: { en: "About Us", mr: "आमच्याबद्दल" },
    vargani: { en: "Know About Vargani", mr: "वर्गणीबद्दल" },
    sabhasad: { en: "सभासद", mr: "सभासद" },
    comingSoon: { en: "Coming Soon", mr: "लवकरच" },
    planned: { en: "Planned", mr: "नियोजित" },
    getDirections: { en: "Get Directions", mr: "दिशा मिळवा" },
    contactUs: { en: "Contact Us", mr: "संपर्क करा" },
    readMore: { en: "Read More", mr: "अधिक वाचा" },
    loadMore: { en: "Load More", mr: "अधिक पाहा" },
    viewAll: { en: "View All", mr: "सर्व पाहा" },
    download: { en: "Download", mr: "डाउनलोड" },
    backHome: { en: "Back to Home", mr: "मुख्यपृष्ठ" },
  },
  sections: {
    welcome: { en: "Welcome", mr: "स्वागत" },
    welcomeTitle: {
      en: "A Legacy of Devotion & Service",
      mr: "भक्ती आणि सेवेचा वारसा",
    },
    mission: { en: "Mission", mr: "ध्येय" },
    vision: { en: "Vision", mr: "दृष्टी" },
    objectives: { en: "Objectives", mr: "उद्दिष्टे" },
    coreValues: { en: "Core Values", mr: "मूल्ये" },
    journey: { en: "Our Journey", mr: "आमचा प्रवास" },
    journeyTitle: { en: "Since 1980", mr: "१९८० पासून" },
    stats: { en: "By the Numbers", mr: "आकडेवारी" },
    statsTitle: { en: "Four Decades of Impact", mr: "चार दशकांचा प्रभाव" },
    countdown: { en: "Countdown", mr: "उरलेले दिवस" },
    countdownTitle: {
      en: "Ganeshotsav 2026 Begins In",
      mr: "गणेशोत्सव २०२६ सुरू होण्यास",
    },
    news: { en: "Latest News", mr: "ताज्या बातम्या" },
    newsTitle: { en: "Announcements & Updates", mr: "घोषणा आणि अद्यतने" },
    events: { en: "Events", mr: "कार्यक्रम" },
    eventsTitle: { en: "Upcoming Programs", mr: "आगामी कार्यक्रम" },
    social: { en: "Social Service", mr: "सामाजिक सेवा" },
    socialTitle: { en: "Serving the Community", mr: "समाजाची सेवा" },
    gallery: { en: "Gallery", mr: "गॅलरी" },
    galleryTitle: { en: "Moments of Celebration", mr: "उत्सवाचे क्षण" },
    testimonials: { en: "Testimonials", mr: "अभिप्राय" },
    testimonialsTitle: { en: "Voices of Our Community", mr: "समाजाचा आवाज" },
    sponsors: { en: "Our Sponsors", mr: "आमचे प्रायोजक" },
  },
  countdown: {
    days: { en: "Days", mr: "दिवस" },
    hours: { en: "Hours", mr: "तास" },
    minutes: { en: "Minutes", mr: "मिनिटे" },
    seconds: { en: "Seconds", mr: "सेकंद" },
    live: { en: "The celebration has begun!", mr: "उत्सव सुरू झाला आहे!" },
  },
  footer: {
    quickLinks: { en: "Quick Links", mr: "द्रुत दुवे" },
    contact: { en: "Contact", mr: "संपर्क" },
    follow: { en: "Follow Us", mr: "आम्हाला फॉलो करा" },
    rights: { en: "All rights reserved.", mr: "सर्व हक्क राखीव." },
    designed: { en: "Designed with ❤ in Mumbai", mr: "मुंबईत ❤ ने तयार केले" },
    regNo: { en: "Reg. No.", mr: "नोंदणी क्र." },
    values: { en: "Faith • Unity • Service", mr: "श्रद्धा • एकता • सेवा" },
  },
  hero: {
    yearBadge: { en: "47th Year", mr: "४७ वे वर्ष" },
    subtitle: {
      en: "Celebrating 47 years of faith, unity and service",
      mr: "श्रद्धा, एकता आणि सेवेची ४७ वर्षे साजरी करत आहोत",
    },
  },
  comingSoonPage: {
    donation: { en: "Online Donation Coming Soon", mr: "ऑनलाइन देणगी लवकरच" },
    membership: {
      en: "Membership Registration Coming Soon",
      mr: "सभासद नोंदणी लवकरच",
    },
  },
  notFound: {
    title: { en: "Page Not Found", mr: "पृष्ठ सापडले नाही" },
    body: {
      en: "The page you are looking for is unavailable or has been moved.",
      mr: "तुम्ही शोधत असलेले पृष्ठ उपलब्ध नाही किंवा दुसरीकडे हलवले गेले आहे.",
    },
  },
  reach: {
    eyebrow: { en: "How to Reach", mr: "कसे पोहोचाल" },
    title: { en: "Getting to the Mandal", mr: "मंडळापर्यंत कसे याल" },
    byTrain: { en: "By Local Train", mr: "लोकल ट्रेनने" },
    byBus: { en: "By Bus", mr: "बसने" },
    byRoad: { en: "By Road / Taxi", mr: "रस्त्याने / टॅक्सीने" },
    landmark: { en: "Landmark", mr: "खूण" },
  },
  procession: {
    eyebrow: { en: "Procession", mr: "मिरवणूक" },
    title: { en: "Aagman & Visarjan Route", mr: "आगमन व विसर्जन मार्ग" },
    aagman: { en: "Aagman Procession", mr: "आगमन मिरवणूक" },
    visarjan: { en: "Visarjan Procession", mr: "विसर्जन मिरवणूक" },
    route: { en: "Route", mr: "मार्ग" },
    note: {
      en: "Timings are indicative and may shift with crowd and traffic conditions.",
      mr: "वेळा अंदाजे असून गर्दी व वाहतुकीनुसार बदलू शकतात.",
    },
  },
  legal: {
    terms: { en: "Terms of Use", mr: "वापराच्या अटी" },
    privacy: { en: "Privacy Policy", mr: "गोपनीयता धोरण" },
  },
} satisfies Record<string, Record<string, Bilingual | string>>;

/** Pick the active-language string from any Bilingual value. */
export function t(value: Bilingual, lang: Lang): string {
  return value[lang];
}

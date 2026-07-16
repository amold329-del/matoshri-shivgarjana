import { getEvents, getSettings } from "@/lib/content";
import { OG_IMAGE, SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/seo";

/**
 * schema.org structured data.
 *
 * The previous NGO block was valid but thin: address had only locality/region/
 * country — no street, no postal code, no geo — which is most of what Google
 * needs to associate the site with a physical place in Bhoiwada. Everything
 * here is sourced from content/settings.json rather than duplicated, so it
 * stays in step with what /contact/ actually renders.
 */

const settings = getSettings();

/** Organisation — rendered site-wide from app/layout.tsx. */
export function organisationJsonLd() {
  const { contact, org, social } = settings;

  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organisation`,
    name: SITE_NAME,
    alternateName: [
      org.nameFull.en,
      org.nameShort.mr,
      "मातोश्रीचा विघ्नहर्ता",
    ],
    description: org.motto.en,
    foundingDate: String(org.established),
    url: `${SITE_URL}/`,
    logo: OG_IMAGE.url,
    image: OG_IMAGE.url,
    email: contact.email,
    telephone: contact.phones[0]?.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      ...contact.postal,
    },
    // Omitted entirely rather than guessed — a wrong pin is worse than none.
    ...(contact.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: contact.geo.lat,
            longitude: contact.geo.lng,
          },
        }
      : {}),
    areaServed: { "@type": "Place", name: "Bhoiwada, Parel, Mumbai" },
    knowsLanguage: ["mr", "en"],
    sameAs: social.map((s) => s.href),
    slogan: "श्रद्धा • एकता • सेवा",
  };
}

/**
 * Event schema for the Ganeshotsav programme — rendered from app/events/page.tsx.
 *
 * This is the highest-value structured data on the site: "Ganpati mandal
 * Bhoiwada" style searches spike for a few weeks a year, and event markup is
 * what makes a listing eligible for date-stamped results rather than a plain
 * blue link.
 *
 * Only upcoming events are emitted. Past events with no real end date are noise
 * to a crawler, and stale event markup is worse than none.
 */
export function eventsJsonLd() {
  const { contact, org } = settings;

  const location = {
    "@type": "Place",
    name: org.nameShort.en,
    address: { "@type": "PostalAddress", ...contact.postal },
    ...(contact.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: contact.geo.lat,
            longitude: contact.geo.lng,
          },
        }
      : {}),
  };

  return getEvents()
    .filter((e) => e.status === "upcoming")
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `${e.title.mr} · ${e.title.en}`,
      description: e.body.en,
      startDate: toIsoStart(e.date, e.time),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location,
      image: [OG_IMAGE.url],
      url: canonicalUrl("/events"),
      isAccessibleForFree: true,
      // Google requires `offers` for a free event to be marked free explicitly.
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl("/events"),
        validFrom: `${settings.org.anniversaryYear}-01-01T00:00:00+05:30`,
      },
      organizer: {
        "@type": "NGO",
        "@id": `${SITE_URL}/#organisation`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      performer: { "@type": "Organization", name: SITE_NAME },
    }));
}

/**
 * "2026-09-14" + "6:00 AM" -> "2026-09-14T06:00:00+05:30".
 * Google rejects Event markup with no timezone, and reads a bare date as
 * midnight UTC — which lands on the wrong day in IST.
 */
function toIsoStart(date: string, time?: string): string {
  if (!time) return `${date}T00:00:00+05:30`;
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!m) return `${date}T00:00:00+05:30`;

  let hour = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") hour += 12;
  const hh = String(hour).padStart(2, "0");
  return `${date}T${hh}:${m[2]}:00+05:30`;
}

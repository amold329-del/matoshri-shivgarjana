/**
 * The one place Event structured data is built.
 *
 * ## Why this file exists
 *
 * Event JSON-LD used to be assembled as an inline object literal in
 * src/app/events/page.tsx and again in src/app/procession/page.tsx. Neither
 * literal had an `endDate` key at all, so Search Console reported
 * "Missing field 'endDate'" for all 8 events. Two copies of the same shape
 * meant a field could be missing from both without anything noticing.
 *
 * Worse, /procession/ *had* the end times all along — content/procession.json
 * carries "7:00 PM to 9:00 PM" and "4:00 PM to 9:00 PM" — but the mapper
 * dropped that range into the description sentence and emitted a bare
 * date-only `startDate`. The data existed; the mapping threw it away.
 *
 * Every Event on the site now comes from `buildEvent` below.
 *
 * ## What it will not do
 *
 * `endDate` is emitted only when the content supplies a real end time. There is
 * no fallback to `startDate`, no assumed duration, no `new Date()`. An event
 * whose end time the Mandal has not decided simply has no `endDate` — that is
 * a Google *recommendation*, not a requirement, and an invented timestamp on a
 * page devotees plan their evening around is worse than a warning in a console.
 *
 * ## Invariants
 *
 * `buildEvent` throws rather than emitting questionable markup, and it runs at
 * module scope in the route files, so a violation fails `next build` instead of
 * shipping. Guarded: malformed dates, unparseable clock times, and any end that
 * is not strictly after its start.
 */

const SITE_URL = "https://matoshreechavighnaharta.co.in";

/** Asia/Kolkata. The Mandal's events are all in Mumbai; no DST to handle. */
const IST_OFFSET = "+05:30";

const ORGANIZATION_NAME = "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ";

const EVENT_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
  addressLocality: "Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400012",
  addressCountry: "IN",
} as const;

const EVENT_IMAGES = [
  `${SITE_URL}/event/ganeshotsav-16x9.jpg`,
  `${SITE_URL}/event/ganeshotsav-4x3.jpg`,
  `${SITE_URL}/event/ganeshotsav-1x1.jpg`,
];

const ORGANIZER = {
  "@type": "Organization",
  name: ORGANIZATION_NAME,
  url: SITE_URL,
} as const;

const PERFORMER = {
  "@type": "PerformingGroup",
  name: ORGANIZATION_NAME,
  url: SITE_URL,
} as const;

/** Darshan and all programmes are free; this mirrors what the pages state. */
const FREE_OFFER = {
  "@type": "Offer",
  description: "विनामूल्य — सर्वांसाठी खुले",
  price: 0,
  priceCurrency: "INR",
  availability: "https://schema.org/InStock",
  validFrom: "2026-01-01",
  url: SITE_URL,
} as const;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const CLOCK_RE = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

/** "7:30 PM" -> "19:30:00". Throws on anything it cannot read. */
function parseClock(time: string, context: string): string {
  const match = CLOCK_RE.exec(time.trim());
  if (!match) {
    throw new Error(
      `Event schema (${context}): cannot parse time "${time}". ` +
        `Expected a 12-hour clock like "7:30 PM".`,
    );
  }
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (match[3].toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (match[3].toUpperCase() === "AM" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) {
    throw new Error(`Event schema (${context}): "${time}" is not a real time.`);
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

/** ISO-8601: date-only when no clock time is known, otherwise date + IST offset. */
function toIso(date: string, time: string | undefined, context: string): string {
  if (!DATE_RE.test(date)) {
    throw new Error(
      `Event schema (${context}): date "${date}" is not YYYY-MM-DD.`,
    );
  }
  if (!time) return date;
  return `${date}T${parseClock(time, context)}${IST_OFFSET}`;
}

export interface EventSchemaInput {
  /** Stable fragment id, so the same event keeps one identity across builds. */
  id: string;
  /** Page the event is described on, e.g. "/events/". */
  path: string;
  name: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  /** 12-hour clock, e.g. "6:00 AM". Omit when only the day is known. */
  startTime?: string;
  /** 12-hour clock. Omit unless the Mandal has actually set an end time. */
  endTime?: string;
  /** YYYY-MM-DD, for events that end on a later day than they start. */
  endDate?: string;
  /** Venue name as shown on the page. */
  venueName?: string;
}

export function buildEvent(input: EventSchemaInput) {
  const {
    id,
    path,
    name,
    description,
    date,
    startTime,
    endTime,
    endDate,
    venueName,
  } = input;
  const context = `${path}#${id}`;

  const startIso = toIso(date, startTime, context);

  // An end is emitted only from real data: an explicit end day, an end clock
  // time, or both. Nothing is inferred.
  const endIso =
    endDate || endTime
      ? toIso(endDate ?? date, endTime ?? startTime, context)
      : undefined;

  if (endIso) {
    if (Date.parse(endIso) <= Date.parse(startIso)) {
      throw new Error(
        `Event schema (${context}): endDate ${endIso} is not after startDate ${startIso}.`,
      );
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}${path}#${id}`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    startDate: startIso,
    ...(endIso ? { endDate: endIso } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    image: EVENT_IMAGES,
    performer: PERFORMER,
    offers: FREE_OFFER,
    location: {
      "@type": "Place",
      name: venueName ?? ORGANIZATION_NAME,
      address: EVENT_ADDRESS,
    },
    organizer: ORGANIZER,
  };
}

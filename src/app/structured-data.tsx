const SITE_URL = "https://matoshreechavighnaharta.co.in";

/**
 * Site-wide structured data.
 *
 * Organization + Place/geo + FestivalEvent. Google's May 2026 generative-AI
 * guidance is explicit that there is no AI-specific schema — AI Overviews and
 * AI Mode run on the normal search pipeline — so this is ordinary, accurate
 * structured data that helps any engine (search or answer) understand who the
 * Mandal is, where it is, and when the festival happens.
 */
export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": ["NGO", "PlaceOfWorship"],
    "@id": `${SITE_URL}/#organization`,
    name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    alternateName: [
      "Matoshri Shivgarjana Sarvajanik Ganeshotsav Mandal",
      "मातोश्रीचा विघ्नहर्ता",
      "Matoshreecha Vighnaharta",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/logo-emblem.png`,
    image: `${SITE_URL}/hero-idol.jpg`,
    foundingDate: "1980",
    slogan: "श्रद्धा • एकता • सेवा",
    description:
      "मुंबईतील परेल-भोईवाडा येथील नोंदणीकृत सार्वजनिक गणेशोत्सव मंडळ. १९८० पासून श्रद्धा, एकता आणि सेवेची परंपरा; २०२६ मध्ये ४७ वे वर्ष.",
    knowsLanguage: ["mr", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400012",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.0052,
      longitude: 72.8485,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=MATOSHREE%20S.R.A%20CHS%20A%20WING%2C%20Jerbai%20Wadia%20Rd%2C%20Bhoiwada%2C%20Parel%2C%20Mumbai%20400012",
    areaServed: [
      { "@type": "Place", name: "Parel-Bhoiwada, Mumbai" },
      { "@type": "City", name: "Mumbai" },
    ],
    email: "matoshreeshivgarjanasarvajanik@gmail.com",
    telephone: "+91-77383-37412",
    sameAs: ["https://www.instagram.com/matoshree.cha.vighnaharta/"],
    subjectOf: {
      "@type": "CreativeWork",
      name: "वार्षिक अहवाल २०२५",
      url: `${SITE_URL}/documents/ahawal-2025.pdf`,
    },
  };

  const festival = {
    "@context": "https://schema.org",
    "@type": "Festival",
    "@id": `${SITE_URL}/#ganeshotsav2026`,
    name: "मातोश्री शिवगर्जना गणेशोत्सव २०२६ (४७ वे वर्ष)",
    alternateName: "Matoshri Shivgarjana Ganeshotsav 2026",
    startDate: "2026-09-14",
    endDate: "2026-09-25",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${SITE_URL}/events/`,
    isAccessibleForFree: true,
    /* Google flags these three as optional-but-recommended on Event.
       All are filled with accurate information: darshan is free and open
       to all (no pass or ticket), the Mandal itself presents the aartis
       and cultural programme, and the images are of our own idol. */
    image: [
      `${SITE_URL}/event/ganeshotsav-16x9.jpg`,
      `${SITE_URL}/event/ganeshotsav-4x3.jpg`,
      `${SITE_URL}/event/ganeshotsav-1x1.jpg`,
    ],
    performer: {
      "@type": "PerformingGroup",
      name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      description: "दर्शन विनामूल्य — सर्व भाविकांसाठी खुले",
      price: 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: `${SITE_URL}/events/`,
    },
    description:
      "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळाचा ४७ वा गणेशोत्सव — आगमन, आरती, सांस्कृतिक कार्यक्रम, महाप्रसाद व विसर्जन मिरवणूक.",
    location: {
      "@type": "Place",
      name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400012",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 19.0052,
        longitude: 72.8485,
      },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "मातोश्रीचा विघ्नहर्ता — मातोश्री शिवगर्जना मंडळ",
    inLanguage: ["mr", "en"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([org, festival, website]),
      }}
    />
  );
}

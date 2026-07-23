export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
    alternateName: "Matoshri Shivgarjana Sarvajanik Ganeshotsav Mandal",
    url: "https://matoshreechavighnaharta.co.in",
    logo: "https://matoshreechavighnaharta.co.in/logo-emblem.png",
    foundingDate: "1980",
    description:
      "मुंबईतील नोंदणीकृत सार्वजनिक गणेशोत्सव मंडळ — १९८० पासून श्रद्धा, एकता आणि सेवा.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "A Wing 1/102, Matoshree SRA CHS, Jerbai Wadia Road, Parel-Bhoiwada",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400012",
      addressCountry: "IN",
    },
    email: "matoshreeshivgarjanasarvajanik@gmail.com",
    telephone: "+91-77383-37412",
    sameAs: ["https://www.instagram.com/matoshree.cha.vighnaharta/"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
    />
  );
}

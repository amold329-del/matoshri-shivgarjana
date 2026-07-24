"use client";

import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";
import { dict } from "@/lib/i18n";
import type { Bilingual } from "@/types/content";

type Block = { heading: Bilingual; body: Bilingual[] };

export function TermsView() {
  const { tr } = useLanguage();
  const settings = getSettings();
  const email = settings.contact.email;

  const terms: Block[] = [
    {
      heading: { en: "About this website", mr: "या संकेतस्थळाबद्दल" },
      body: [
        {
          en: "This is the official website of Matoshri Shivgarjana Sarvajanik Ganeshotsav Mandal (Regd.), Parel-Bhoiwada, Mumbai. It exists to share information about the Mandal, its festival programmes and its social activities.",
          mr: "हे मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.), परेल-भोईवाडा, मुंबई यांचे अधिकृत संकेतस्थळ आहे. मंडळ, उत्सवाचे कार्यक्रम आणि सामाजिक उपक्रम यांची माहिती देणे हा त्याचा उद्देश आहे.",
        },
      ],
    },
    {
      heading: { en: "Accuracy of information", mr: "माहितीची अचूकता" },
      body: [
        {
          en: "We take care to keep dates, timings and procession routes accurate. However, these depend on permissions, crowd conditions, weather and traffic, and may change at short notice. Please treat published timings as indicative and confirm important details with the Mandal.",
          mr: "तारखा, वेळा आणि मिरवणूक मार्ग अचूक ठेवण्याची आम्ही काळजी घेतो. तथापि, या गोष्टी परवानग्या, गर्दी, हवामान व वाहतुकीवर अवलंबून असून ऐनवेळी बदलू शकतात. प्रसिद्ध केलेल्या वेळा अंदाजे माना आणि महत्त्वाच्या तपशिलांची मंडळाकडून खात्री करा.",
        },
      ],
    },
    {
      heading: { en: "Photographs and content", mr: "छायाचित्रे व मजकूर" },
      body: [
        {
          en: "Photographs, text, the emblem and documents on this site belong to the Mandal. You are welcome to view and share them for personal and devotional purposes. Please do not use them for commercial purposes without written permission.",
          mr: "या संकेतस्थळावरील छायाचित्रे, मजकूर, बोधचिन्ह व कागदपत्रे मंडळाच्या मालकीची आहेत. वैयक्तिक व भक्तिपर वापरासाठी ती पाहणे व शेअर करणे मुक्त आहे. लेखी परवानगीशिवाय व्यावसायिक वापर करू नये.",
        },
        {
          en: "If you appear in a photograph and would like it removed, write to us and we will take it down.",
          mr: "एखाद्या छायाचित्रात तुम्ही असाल आणि ते काढून टाकावे असे वाटत असेल, तर आम्हाला कळवा; आम्ही ते हटवू.",
        },
      ],
    },
    {
      heading: { en: "Donations and vargani", mr: "देणगी व वर्गणी" },
      body: [
        {
          en: "Contributions are voluntary. Every contribution is recorded and reflected in the Mandal's annual report of accounts, which is published on this site. The Mandal does not appoint agents to collect money on its behalf online.",
          mr: "वर्गणी व देणगी ऐच्छिक आहे. प्रत्येक वर्गणीची नोंद होते व ती मंडळाच्या वार्षिक अहवालातील हिशोबात दर्शवली जाते, जो या संकेतस्थळावर प्रसिद्ध केला जातो. मंडळ ऑनलाइन पैसे गोळा करण्यासाठी कोणतेही प्रतिनिधी नेमत नाही.",
        },
      ],
    },
    {
      heading: { en: "External links", mr: "बाह्य दुवे" },
      body: [
        {
          en: "This site links to external services such as Instagram and Google Maps. We are not responsible for the content or practices of those websites.",
          mr: "या संकेतस्थळावरून इन्स्टाग्राम व गूगल मॅप्ससारख्या बाह्य सेवांचे दुवे दिले आहेत. त्या संकेतस्थळांवरील मजकूर किंवा धोरणांसाठी आम्ही जबाबदार नाही.",
        },
      ],
    },
  ];

  const privacy: Block[] = [
    {
      heading: {
        en: "We do not collect personal information",
        mr: "आम्ही वैयक्तिक माहिती गोळा करत नाही",
      },
      body: [
        {
          en: "This is a static website. There is no account, no login and no database. We do not ask for, store or sell your personal information.",
          mr: "हे एक स्थिर (static) संकेतस्थळ आहे. येथे खाते, लॉगिन किंवा डेटाबेस नाही. आम्ही तुमची वैयक्तिक माहिती मागत नाही, साठवत नाही किंवा विकत नाही.",
        },
      ],
    },
    {
      heading: { en: "The contact form", mr: "संपर्क फॉर्म" },
      body: [
        {
          en: "The contact form does not send anything to a server. It simply opens your own email app with the message filled in, so the message travels from your email account directly to ours. Nothing is stored on this website.",
          mr: "संपर्क फॉर्म कोणत्याही सर्व्हरवर काहीही पाठवत नाही. तो फक्त तुमचे ईमेल अ‍ॅप उघडून संदेश भरून देतो, म्हणजे संदेश तुमच्या ईमेलमधून थेट आमच्याकडे येतो. या संकेतस्थळावर काहीही साठवले जात नाही.",
        },
      ],
    },
    {
      heading: {
        en: "What is stored in your browser",
        mr: "तुमच्या ब्राउझरमध्ये काय साठवले जाते",
      },
      body: [
        {
          en: "Only your display preferences — the language you chose (Marathi or English) and light or dark mode. These stay on your own device so the site remembers them next time. You can clear them at any time from your browser settings.",
          mr: "फक्त तुमच्या पसंती — तुम्ही निवडलेली भाषा (मराठी किंवा इंग्रजी) आणि उजेड/अंधार मोड. या तुमच्याच उपकरणावर राहतात, जेणेकरून पुढच्या वेळी संकेतस्थळ त्या लक्षात ठेवेल. ब्राउझर सेटिंग्जमधून तुम्ही त्या कधीही पुसू शकता.",
        },
      ],
    },
    {
      heading: { en: "Third-party services", mr: "तृतीय-पक्ष सेवा" },
      body: [
        {
          en: "The contact page embeds a Google Map, and the site loads fonts from Google Fonts. These are provided by Google and may record your visit under Google's own privacy policy. Links to Instagram open on Instagram's own website.",
          mr: "संपर्क पृष्ठावर गूगल नकाशा वापरला आहे आणि संकेतस्थळ गूगल फॉन्ट्समधून टंक घेते. या सेवा गूगलच्या असून गूगलच्या स्वतःच्या गोपनीयता धोरणानुसार तुमच्या भेटीची नोंद ठेवू शकतात. इन्स्टाग्रामचे दुवे इन्स्टाग्रामच्या संकेतस्थळावर उघडतात.",
        },
      ],
    },
    {
      heading: { en: "Children", mr: "मुले" },
      body: [
        {
          en: "This site is informational and suitable for all ages. We do not knowingly collect information from anyone, including children.",
          mr: "हे संकेतस्थळ केवळ माहितीपर असून सर्व वयोगटांसाठी योग्य आहे. मुलांसह कोणाचीही माहिती आम्ही जाणीवपूर्वक गोळा करत नाही.",
        },
      ],
    },
  ];

  const renderBlocks = (blocks: Block[]) =>
    blocks.map((b, i) => (
      <Reveal key={b.heading.en} delay={Math.min(i * 0.05, 0.2)}>
        <div className="card-surface p-6">
          <h3 className="font-display text-lg font-bold text-maroon">
            {tr(b.heading)}
          </h3>
          {b.body.map((para, j) => (
            <p
              key={j}
              className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft"
            >
              {tr(para)}
            </p>
          ))}
        </div>
      </Reveal>
    ));

  return (
    <>
      <PageHero
        eyebrow={{ en: "Legal", mr: "कायदेशीर" }}
        title={{
          en: "Terms & Privacy",
          mr: "अटी व गोपनीयता",
        }}
        subtitle={{
          en: "How this website may be used, and how your privacy is respected.",
          mr: "या संकेतस्थळाचा वापर कसा करावा आणि तुमच्या गोपनीयतेचा आदर कसा राखला जातो.",
        }}
      />

      <section className="bg-bg py-20">
        <div className="wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              {tr(dict.legal.terms)}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">{renderBlocks(terms)}</div>

          <Reveal className="mt-14">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              {tr(dict.legal.privacy)}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">{renderBlocks(privacy)}</div>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-gold/40 bg-surface-2 p-6 text-center">
              <p className="text-sm text-ink-soft">
                {tr({
                  en: "Questions about anything on this page? Write to us at",
                  mr: "या पृष्ठाबद्दल काही शंका असल्यास आम्हाला लिहा",
                })}{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-saffron hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { HeartHandshake, Users, Flame } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Picture } from "@/components/ui/picture";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * ॥ मातोश्रीचा विघ्नहर्ता ॥ — the unveiling of the Mandal's official logo,
 * announced 14 August 2026, a month before the 47th Ganeshotsav.
 *
 * Placed straight after the Ribbon so it is the first thing a returning
 * visitor meets. It is a launch announcement, not permanent furniture: once
 * the festival is under way, move it below <Countdown /> in src/app/page.tsx,
 * and after Ganeshotsav drop the section and keep the news entry (n0) as the
 * record. The poster carries the words in Marathi; the same words are repeated
 * in real text beside it so screen readers and search engines get them too.
 */

const VALUES = [
  { icon: HeartHandshake, label: { en: "Dedication", mr: "समर्पण" } },
  { icon: Users, label: { en: "Unity", mr: "एकता" } },
  { icon: Flame, label: { en: "Values", mr: "संस्कार" } },
];

export function LogoUnveiling() {
  const { tr } = useLanguage();

  return (
    <section
      id="logo-unveiling"
      aria-labelledby="logo-unveiling-title"
      className="relative overflow-hidden bg-surface section"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
        {/* Poster */}
        <Reveal>
          <figure className="card-surface overflow-hidden p-0">
            <Picture
              src="/announcements/logo-unveiling.jpg"
              alt={tr({
                en: "Announcement poster: the Mandal's new logo, ॥ मातोश्रीचा विघ्नहर्ता ॥, in gold Devanagari calligraphy on a deep maroon temple-arch medallion.",
                mr: "घोषणा पोस्टर: मंडळाचा नवा लोगो — गडद लाल कमानीत सुवर्ण अक्षरांतील ॥ मातोश्रीचा विघ्नहर्ता ॥.",
              })}
              sizes="(max-width: 1024px) 92vw, 620px"
              className="block"
              imgClassName="block h-auto w-full"
            />
          </figure>
        </Reveal>

        {/* Words */}
        <div>
          <Reveal>
            <span className="eyebrow">
              {tr({ en: "Announcement", mr: "घोषणा" })}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="logo-unveiling-title"
              className="mt-4 font-display text-display-md font-extrabold text-balance text-ink"
            >
              {tr({
                en: "Unveiling our new logo",
                mr: "आमच्या नव्या लोगोचे हार्दिक अनावरण",
              })}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="measure mt-5 text-body-lg text-ink-soft">
              {tr({
                en: "As the Mandal steps into its 47th year, it takes on a new identity. ॥ मातोश्रीचा विघ्नहर्ता ॥ — the name by which we have called out to Bappa year after year — now stays with us for good, in the form of our own logo.",
                mr: "मंडळ ४७ व्या वर्षात पदार्पण करीत असताना आज त्याला नवी ओळख मिळाली आहे. ॥ मातोश्रीचा विघ्नहर्ता ॥ — ज्या नावाने आपण वर्षानुवर्षे बाप्पाला साद घातली, तेच नाव आता आपल्या लोगोच्या रूपाने कायमचे आपल्यासोबत राहील.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="measure mt-4 text-body-lg text-ink-soft">
              {tr({
                en: "The temple-arch medallion, the deep maroon ground, the gold letters that shape Bappa's own form — this is not merely a design. It is the shape we have given to a faith kept alive here since 1980.",
                mr: "मंदिराच्या कमानीचा आकार, गडद लाल पार्श्वभूमी आणि सुवर्ण अक्षरांतून साकारलेले बाप्पाचे रूप — ही नुसती रचना नाही. १९८० पासून येथे जपलेल्या श्रद्धेला दिलेला हा आकार आहे.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="measure mt-4 text-body-lg text-ink-soft">
              {tr({
                en: "And this logo is not ours alone — it is yours. It stands on every hand that gave a vargani, every volunteer who stayed awake in the mandap through the night, and every voice that answers \u201cMorya\u201d. Your Mandal, your identity.",
                mr: "आणि हा लोगो केवळ आमचा नाही — आपला आहे. वर्गणी देणाऱ्या प्रत्येक हातामुळे, मंडपात रात्र जागवणाऱ्या प्रत्येक कार्यकर्त्यामुळे आणि 'मोरया' म्हणणाऱ्या प्रत्येक आवाजामुळे ही ओळख उभी राहिली आहे. आपलेच मंडळ, आपलीच ओळख!",
              })}
            </p>
          </Reveal>

          {/* समर्पण · एकता · संस्कार — the three words carried on the poster */}
          <Reveal delay={0.26}>
            <ul className="mt-8 grid grid-cols-3 gap-3">
              {VALUES.map(({ icon: Icon, label }) => (
                <li key={label.en} className="card-surface px-3 py-4 text-center">
                  <Icon
                    aria-hidden
                    className="mx-auto h-6 w-6 text-accent-gold"
                  />
                  <span className="mt-2 block font-mr text-body-sm font-bold text-ink">
                    {tr(label)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="measure mt-6 text-body-sm text-ink-soft">
              {tr({
                en: "From today the logo appears across this website, and it will be on our notices, receipts and banners for the 47th Ganeshotsav. Do share it with your family and neighbours.",
                mr: "आजपासून हा लोगो या संकेतस्थळावर सर्वत्र दिसेल; ४७ व्या गणेशोत्सवाच्या सूचना, पावत्या आणि बॅनरवरही तोच असेल. आपल्या कुटुंबीयांना आणि शेजाऱ्यांना अवश्य दाखवा.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-body-sm font-semibold text-ink">
              {tr({
                en: "A new identity, new energy, and Bappa's blessing — Ganpati Bappa Morya!",
                mr: "नव्या ओळखीने, नव्या ऊर्जेने आणि बाप्पाच्या आशीर्वादाने — गणपती बाप्पा मोरया!",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <p className="mt-4 text-body-sm font-semibold text-ink-soft">
              {tr({
                en: "— The Committee, Matoshree Shivgarjana Sarvajanik Ganeshotsav Mandal",
                mr: "— कार्यकारिणी, मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ",
              })}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  BadgeCheck,
  FileText,
  Landmark,
  CalendarCheck,
  Hash,
  ScrollText,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";

export function RegistrationView() {
  const { tr } = useLanguage();
  const { org } = getSettings();

  const records = [
    {
      icon: Hash,
      label: { en: "Registration Number", mr: "नोंदणी क्रमांक" },
      value: org.registrationNo,
    },
    {
      icon: FileText,
      label: { en: "PAN", mr: "पॅन" },
      value: org.panNo,
    },
    {
      icon: CalendarCheck,
      label: { en: "Established", mr: "स्थापना" },
      value: String(org.established),
    },
    {
      icon: BadgeCheck,
      label: { en: "Year of Registration", mr: "नोंदणी वर्ष" },
      value: String(org.registered),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={{ en: "Official Records", mr: "अधिकृत नोंदी" }}
        title={{ en: "Registration Details", mr: "नोंदणी तपशील" }}
        subtitle={{
          en: "Matoshri Shivgarjana Mandal is a duly registered public charitable body. Key statutory details are listed below.",
          mr: "मातोश्री शिवगर्जना मंडळ ही रीतसर नोंदणीकृत सार्वजनिक धर्मादाय संस्था आहे. प्रमुख वैधानिक तपशील खाली दिले आहेत.",
        }}
      />

      {/* Record cards */}
      <section className="bg-bg py-20">
        <div className="wrap max-w-4xl">
          <div className="grid gap-5 sm:grid-cols-2">
            {records.map((r, i) => (
              <Reveal key={r.label.en} delay={i * 0.07}>
                <div className="card-surface flex items-center gap-4 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-maroon/10 text-maroon">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {tr(r.label)}
                    </p>
                    <p className="mt-0.5 font-display text-xl font-bold text-maroon">
                      {r.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 rounded-xl border border-gold/30 bg-surface-2 p-4 text-center text-xs text-ink-soft">
              {tr({
                en: "For privacy, the PAN is shown partially masked.",
                mr: "गोपनीयतेसाठी पॅन क्रमांक अंशतः लपवून दाखवला आहे.",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What registration means */}
      <section className="bg-surface-2 py-20">
        <div className="wrap max-w-4xl">
          <SectionHeading
            eyebrow={{ en: "Legal Standing", mr: "कायदेशीर स्थान" }}
            title={{ en: "What Our Registration Means", mr: "आमच्या नोंदणीचा अर्थ" }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Landmark,
                title: { en: "A Recognised Body", mr: "मान्यताप्राप्त संस्था" },
                body: {
                  en: "We operate as a formally registered public Ganeshotsav Mandal, accountable under applicable law.",
                  mr: "आम्ही अधिकृतपणे नोंदणीकृत सार्वजनिक गणेशोत्सव मंडळ म्हणून कार्य करतो, लागू कायद्यानुसार जबाबदार.",
                },
              },
              {
                icon: ScrollText,
                title: { en: "Governed by Rules", mr: "नियमांद्वारे संचालित" },
                body: {
                  en: "A written constitution and an elected committee guide every decision and expenditure.",
                  mr: "लिखित घटना आणि निवडून आलेली कार्यकारिणी प्रत्येक निर्णय आणि खर्चाचे मार्गदर्शन करते.",
                },
              },
              {
                icon: BadgeCheck,
                title: { en: "Transparent & Audited", mr: "पारदर्शक व लेखापरीक्षित" },
                body: {
                  en: "Accounts are maintained and shared with members, keeping community trust at the centre.",
                  mr: "हिशेब ठेवले जातात आणि सभासदांसोबत सामायिक केले जातात, समाजाचा विश्वास केंद्रस्थानी ठेवून.",
                },
              },
            ].map((c, i) => (
              <Reveal key={c.title.en} delay={i * 0.08}>
                <article className="card-surface h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-saffron">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {tr(c.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {tr(c.body)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

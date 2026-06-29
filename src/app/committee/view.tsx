"use client";

import { Phone, Briefcase, CalendarRange } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getCommittee } from "@/lib/content";

/** Gradient avatars keyed by index so members look distinct without photos. */
const AVATARS = [
  "linear-gradient(135deg,#6b1226,#9e1b32)",
  "linear-gradient(135deg,#9e1b32,#e07d16)",
  "linear-gradient(135deg,#c9a227,#e6c868)",
  "linear-gradient(135deg,#4a0b19,#6b1226)",
  "linear-gradient(135deg,#e07d16,#f59e2c)",
  "linear-gradient(135deg,#2a0712,#5a1024)",
];

const HONORIFICS = new Set([
  "श्री", "श्री.", "सौ", "सौ.", "कु", "कु.", "डॉ", "डॉ.", "मा", "मा.",
  "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "dr", "dr.", "shri", "smt", "smt.",
]);

function initials(name: string) {
  const words = name
    .replace(/\[|\]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !HONORIFICS.has(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => Array.from(w)[0])
    .join("")
    .toUpperCase();
}

export function CommitteeView() {
  const { tr } = useLanguage();
  const members = getCommittee();

  return (
    <>
      <PageHero
        eyebrow={{ en: "Our Team", mr: "आमची टीम" }}
        title={{ en: "The Committee", mr: "कार्यकारिणी" }}
        marathiTitle={{ en: "कार्यकारी मंडळ", mr: "" }}
        subtitle={{
          en: "Dedicated volunteers who give their time so the celebration and service continue year after year.",
          mr: "समर्पित स्वयंसेवक जे आपला वेळ देतात जेणेकरून उत्सव आणि सेवा वर्षानुवर्षे सुरू राहते.",
        }}
      />

      <section className="bg-bg py-20">
        <div className="wrap">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => (
              <Reveal key={m.name + i} delay={(i % 3) * 0.07}>
                <article className="card-surface flex h-full flex-col items-center p-7 text-center">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-gold/30"
                    />
                  ) : (
                    <span
                      className="grid h-24 w-24 place-items-center rounded-full font-display text-2xl font-bold text-cream ring-4 ring-gold/30"
                      style={{ background: AVATARS[i % AVATARS.length] }}
                    >
                      {initials(m.name)}
                    </span>
                  )}
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-saffron">
                    {tr(m.role)}
                  </p>

                  <div className="mt-4 w-full space-y-2 border-t border-card-border pt-4 text-left text-sm text-ink-soft">
                    <p className="flex gap-2">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                      <span>{tr(m.responsibilities)}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarRange className="h-4 w-4 shrink-0 text-maroon" />
                      <span>{m.tenure}</span>
                    </p>
                    {m.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-maroon" />
                        <a
                          href={`tel:${m.phone.replace(/\s/g, "")}`}
                          className="hover:text-saffron"
                        >
                          {m.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

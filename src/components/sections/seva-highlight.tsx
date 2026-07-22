"use client";

import { CalendarDays } from "lucide-react";
import { asset } from "@/lib/asset";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Time-sensitive seva announcement — केळी वितरण on Ashadhi Ekadashi.
 * Features the Mandal's own poster with a prominent date badge.
 */
export function SevaHighlight() {
  return (
    <section className="bg-surface-2 py-20">
      <div className="wrap max-w-5xl">
        <SectionHeading
          eyebrow={{ en: "Special Announcement", mr: "विशेष घोषणा" }}
          title={{
            en: "Banana Distribution on Ashadhi Ekadashi",
            mr: "आषाढी एकादशीनिमित्त केळीचे वितरण",
          }}
          intro={{
            en: "On the holy occasion of Ashadhi Ekadashi, the Mandal will distribute bananas to devotees — a small seva, a great joy.",
            mr: "आषाढी एकादशीच्या पावन निमित्ताने आमच्या मंडळाच्या वतीने भाविकांना केळीचे वितरण केले जाणार आहे — लहान सेवा, मोठा आनंद.",
          }}
        />

        <Reveal className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#e6c868,#c9a227)] px-6 py-2.5 font-mr text-base font-extrabold text-[#3a1206] shadow-[0_10px_28px_-10px_rgba(201,162,39,0.7)]">
            <CalendarDays className="h-5 w-5" />
            शनिवार · २५ जुलै २०२६
          </span>
        </Reveal>

        <Reveal className="mt-8">
          <figure className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-card-border shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/events/ashadhi-ekadashi-2026.jpg")}
              alt="आषाढी एकादशी निमित्त केळी वितरण — मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ"
              className="w-full"
              loading="lazy"
            />
          </figure>
        </Reveal>

        <Reveal className="mt-6 text-center">
          <p className="font-mr text-sm font-semibold text-ink-soft">
            विठ्ठल विठ्ठल जय हरी विठ्ठल · पुंडलिक वरदा हरी विठ्ठल
          </p>
        </Reveal>
      </div>
    </section>
  );
}

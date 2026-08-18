"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";
import { Picture } from "@/components/ui/picture";

/**
 * "वाटचाल... सुवर्ण महोत्सवाकडे" — the Mandal's journey towards its golden
 * jubilee (50th year, 2029). Echoes the foreword of the 2025 annual report.
 */
/** Golden jubilee = the 50th year. Founded 1980, so the jubilee year is 2029. */
const JUBILEE_YEAR = 2029;
const JUBILEE = new Date(`${JUBILEE_YEAR}-01-01T00:00:00+05:30`);

type Remaining = { years: number; months: number; days: number };

function remainingUntil(target: Date, now: Date): Remaining {
  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export function SuvarnaMahotsav() {
  const { tr } = useLanguage();
  const { org } = getSettings();

  // Computed on the client only, so the static export can never
  // hydrate-mismatch on a date. Updates hourly — seconds would be noise
  // for a horizon measured in years.
  const [left, setLeft] = useState<Remaining | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLeft(remainingUntil(JUBILEE, now));
      const start = new Date(`${org.established}-01-01T00:00:00+05:30`).getTime();
      const end = JUBILEE.getTime();
      const pct = ((now.getTime() - start) / (end - start)) * 100;
      setProgress(Math.min(100, Math.max(0, Math.round(pct))));
    };
    tick();
    const id = setInterval(tick, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, [org.established]);

  const milestones = [
    {
      value: org.established,
      label: { en: "Established", mr: "स्थापना" },
    },
    {
      value: `${org.yearsCount}`,
      label: { en: "Year now", mr: "वे वर्ष सुरू" },
    },
    {
      value: "2029",
      label: { en: "Golden Jubilee", mr: "सुवर्ण महोत्सव" },
    },
  ];

  return (
    <section className="relative overflow-hidden bg-surface-2 section">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14">
        {/* Poster */}
        <Reveal>
          <figure className="card-surface mx-auto overflow-hidden p-0 lg:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Picture
              src="/announcements/suvarna-mahotsav.jpg"
              alt={tr({
                en: "Matoshree Shivgarjana Mandal — journey towards the Golden Jubilee, 47th year",
                mr: "मातोश्री शिवगर्जना मंडळ — सुवर्ण महोत्सवाकडे वाटचाल, ४७ वे वर्ष",
              })}
              sizes="(max-width: 1024px) 92vw, 420px"
              fit="contain"
              className="mx-auto block"
              imgClassName="mx-auto block h-auto w-full max-w-[420px] object-contain lg:max-w-none"
            />
          </figure>
        </Reveal>

        {/* Words */}
        <div>
          <Reveal>
            <span className="eyebrow">
              {tr({ en: "Our Journey", mr: "आमची वाटचाल" })}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-display-md font-extrabold text-balance text-ink">
              {tr({
                en: "Towards the Golden Jubilee",
                mr: "वाटचाल... सुवर्ण महोत्सवाकडे",
              })}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="measure mt-5 text-body-lg text-ink-soft">
              {tr({
                en: "Since 1980, the devotional tradition of Shri Ganeshotsav has continued here without a break. What began through the society has grown into the shared endeavour of an entire community — and this year the Mandal enters its 47th year.",
                mr: "सन १९८० पासून श्री गणेशोत्सवाची भक्तिमय परंपरा येथे अखंडितपणे सुरू आहे. सोसायटीच्या माध्यमातून सुरू झालेली ही पावन परंपरा आज संपूर्ण वसाहतीची साधना बनली आहे — आणि यावर्षी मंडळ ४७ व्या वर्षात पदार्पण करीत आहे.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="measure mt-4 text-body-lg text-ink-soft">
              {tr({
                en: "Every moment of today is a step towards the golden years ahead. Holding close the pure spirit of this festival, the Mandal now walks towards its Suvarna Mahotsav — the 50th year, in 2029.",
                mr: "आजचा प्रत्येक क्षण... भविष्यातील सुवर्ण पर्वाची पायरी! या उत्सवाची शुद्ध भावना हृदयाशी बाळगून मंडळ आता सुवर्ण महोत्सवाकडे — म्हणजेच सन २०२९ मधील ५० व्या वर्षाकडे — वाटचाल करीत आहे.",
              })}
            </p>
          </Reveal>

          {/* milestones */}
          <Reveal delay={0.24}>
            <ul className="mt-8 grid grid-cols-3 gap-3">
              {milestones.map((m) => (
                <li
                  key={m.value}
                  className="card-surface px-3 py-4 text-center"
                >
                  <span className="block font-display text-2xl font-extrabold text-brand">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    {tr(m.label)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* countdown + journey progress */}
          <Reveal delay={0.28}>
            <div className="card-surface mt-6 p-6">
              <p className="text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] text-accent">
                {tr({
                  en: "Countdown to the Golden Jubilee year",
                  mr: "सुवर्ण महोत्सव वर्षापर्यंत",
                })}
              </p>

              {left ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    { v: left.years, l: { en: "Years", mr: "वर्षे" } },
                    { v: left.months, l: { en: "Months", mr: "महिने" } },
                    { v: left.days, l: { en: "Days", mr: "दिवस" } },
                  ].map((u) => (
                    <div
                      key={u.l.en}
                      className="min-w-[74px] flex-1 rounded-xl border border-gold/30 bg-gold/5 px-3 py-3 text-center"
                    >
                      <span className="block font-display text-3xl font-extrabold tabular-nums text-brand">
                        {u.v}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                        {tr(u.l)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 h-[86px] rounded-xl border border-gold/20 bg-gold/5" />
              )}

              {/* the journey itself, 1980 -> 2029 */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[0.8125rem] font-semibold text-ink-soft">
                  <span>{org.established}</span>
                  <span className="text-accent">
                    {progress}% {tr({ en: "of the journey", mr: "वाटचाल पूर्ण" })}
                  </span>
                  <span>2029</span>
                </div>
                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-maroon/10"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={tr({
                    en: "Progress from 1980 towards the Golden Jubilee in 2029",
                    mr: "१९८० पासून २०२९ च्या सुवर्ण महोत्सवाकडे वाटचाल",
                  })}
                >
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#c9a227,#f3df9a,#e6c868)] transition-[width] duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-body-sm font-semibold text-ink">
              <Sparkles className="h-4 w-4 text-accent-gold" />
              {tr({
                en: "Together, let us reach the next step.",
                mr: "चला... पुढची पायरी गाठूया!",
              })}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function diff(targetISO: string): Remaining {
  const delta = new Date(targetISO).getTime() - Date.now();
  if (delta <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(delta / 86_400_000);
  const hours = Math.floor((delta % 86_400_000) / 3_600_000);
  const minutes = Math.floor((delta % 3_600_000) / 60_000);
  const seconds = Math.floor((delta % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

/**
 * Live countdown to Ganesh Chaturthi (target set in settings.json:
 * 2026-09-14T06:00:00+05:30). Starts after mount to avoid SSR/CSR drift.
 */
export function Countdown() {
  const { countdown } = getSettings();
  const { tr } = useLanguage();
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(diff(countdown.targetISO));
    const id = setInterval(() => setTime(diff(countdown.targetISO)), 1000);
    return () => clearInterval(id);
  }, [countdown.targetISO]);

  const units = [
    { value: time?.days, label: dict.countdown.days },
    { value: time?.hours, label: dict.countdown.hours },
    { value: time?.minutes, label: dict.countdown.minutes },
    { value: time?.seconds, label: dict.countdown.seconds },
  ];

  return (
    <section className="bg-bg py-24">
      <div className="wrap">
        <SectionHeading
          eyebrow={dict.sections.countdown}
          title={dict.sections.countdownTitle}
          intro={countdown.label}
        />

        {time?.done ? (
          <p className="text-center font-display text-2xl font-bold text-saffron">
            {tr(dict.countdown.live)} 🪷
          </p>
        ) : (
          <div className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:gap-5">
            {units.map((u) => (
              <div
                key={u.label.en}
                className="card-surface relative overflow-hidden p-4 text-center sm:p-7"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#c9a227,#e6c868,#c9a227)]" />
                <p className="font-display text-3xl font-extrabold tabular-nums text-maroon sm:text-5xl">
                  {String(u.value ?? 0).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:text-xs">
                  {tr(u.label)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

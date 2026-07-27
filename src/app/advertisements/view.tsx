"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Phone, MapPin, Maximize2, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getAdvertisements, getSettings } from "@/lib/content";
import { asset } from "@/lib/asset";
import { dict } from "@/lib/i18n";

export function AdvertisementsView() {
  const { tr } = useLanguage();
  const ads = getAdvertisements();
  const settings = getSettings();
  const [zoom, setZoom] = useState<string | null>(null);

  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom, close]);

  return (
    <>
      <PageHero
        eyebrow={dict.ads.eyebrow}
        title={dict.ads.title}
        subtitle={dict.ads.subtitle}
      />

      <section className="bg-bg section">
        <div className="wrap max-w-5xl space-y-14">
          {ads.map((ad, idx) => (
            <Reveal key={ad.id} delay={idx * 0.06}>
              <article className="card-surface overflow-hidden p-0">
                <div
                  className={
                    ad.orientation === "portrait"
                      ? "grid gap-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
                      : "grid gap-0"
                  }
                >
                  {/* poster */}
                  <button
                    type="button"
                    onClick={() => setZoom(ad.image)}
                    aria-label={tr(dict.ads.viewPoster)}
                    className="group relative block w-full overflow-hidden bg-maroon-ink"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(ad.image)}
                      alt={`${tr(ad.name)} — ${tr(dict.ads.label)}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-cream backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5" />
                      {tr(dict.ads.viewPoster)}
                    </span>
                  </button>

                  {/* details */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-maroon/10 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-maroon">
                        {tr(dict.ads.label)}
                      </span>
                      <span className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-saffron">
                        {tr(ad.category)}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                      {tr(ad.name)}
                    </h2>
                    <p className="mt-1.5 font-mr text-body-lg font-semibold text-saffron">
                      {tr(ad.tagline)}
                    </p>
                    <p className="mt-3 text-body leading-relaxed text-ink-soft">
                      {tr(ad.description)}
                    </p>

                    {ad.offers.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-saffron">
                          {tr(dict.ads.offers)}
                        </p>
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {ad.offers.map((o, i) => (
                            <li
                              key={i}
                              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-body-sm font-semibold text-ink"
                            >
                              {tr(o)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {ad.highlights.length > 0 && (
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {ad.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-body-sm text-ink-soft"
                          >
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            {tr(h)}
                          </li>
                        ))}
                      </ul>
                    )}

                    {(ad.phone || (ad.address && tr(ad.address))) && (
                      <div className="mt-6 flex flex-wrap gap-4 border-t border-card-border pt-4 text-sm">
                        {ad.address && tr(ad.address) ? (
                          <span className="inline-flex items-center gap-2 text-ink-soft">
                            <MapPin className="h-4 w-4 text-maroon" />
                            {tr(ad.address)}
                          </span>
                        ) : null}
                        {ad.phone ? (
                          <a
                            href={`tel:${ad.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 font-bold text-saffron hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {ad.phone}
                          </a>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* advertise with us + disclaimer */}
          <Reveal>
            <div className="rounded-2xl border border-gold/40 bg-surface-2 p-6 text-center">
              <p className="font-display text-lg font-bold text-ink">
                {tr(dict.ads.advertise)}
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
                {tr(dict.ads.advertiseBody)}
              </p>
              <a
                href={`mailto:${settings.contact.email}`}
                className="btn btn-gold mt-5 inline-flex"
              >
                {tr(dict.cta.contactUs)}
              </a>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-center text-xs leading-relaxed text-ink-soft">
              {tr(dict.ads.disclaimer)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* poster lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-cream"
            >
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={asset(zoom)}
              alt=""
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto block max-h-[88vh] w-auto max-w-[min(94vw,64rem)] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

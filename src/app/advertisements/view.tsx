"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Phone, MapPin, Maximize2, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getAdvertisements, getSettings } from "@/lib/content";
import { Lightbox } from "@/components/ui/lightbox";
import { Picture } from "@/components/ui/picture";
import { dict } from "@/lib/i18n";

export function AdvertisementsView() {
  const { tr } = useLanguage();
  const ads = getAdvertisements();
  const settings = getSettings();
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);

  const close = useCallback(() => setZoomIdx(null), []);

  // Caption + category carried into the dialog (MCV-033).
  const lightboxItems = ads.map((ad) => ({
    src: ad.image,
    caption: `${tr(ad.name)} — ${tr(dict.ads.label)}`,
    meta: tr(ad.category),
  }));

  return (
    <>
      <PageHero
        eyebrow={dict.ads.eyebrow}
        title={dict.ads.title}
        subtitle={dict.ads.subtitle}
      />

      <section className="bg-bg section">
        <div className="wrap max-w-5xl space-y-14">
          {ads.map((ad, i) => (
            <Reveal key={ad.id} delay={i * 0.06}>
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
                    onClick={() => setZoomIdx(i)}
                    aria-label={tr(dict.ads.viewPoster)}
                    className="group relative block w-full overflow-hidden bg-maroon-ink"
                  >
                    <Picture
              src={ad.image}
              alt={`${tr(ad.name)} — ${tr(dict.ads.label)}`}
              sizes="(max-width: 768px) 92vw, 40vw"
              fit="contain"
              className="block h-full w-full"
              imgClassName="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.8125rem] font-bold uppercase tracking-wider text-cream backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5" />
                      {tr(dict.ads.viewPoster)}
                    </span>
                  </button>

                  {/* details */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-maroon/10 px-3 py-1 text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] text-brand">
                        {tr(dict.ads.label)}
                      </span>
                      <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-accent">
                        {tr(ad.category)}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                      {tr(ad.name)}
                    </h2>
                    <p className="mt-1.5 font-mr text-body-lg font-semibold text-accent">
                      {tr(ad.tagline)}
                    </p>
                    <p className="mt-3 text-body leading-relaxed text-ink-soft">
                      {tr(ad.description)}
                    </p>

                    {ad.offers.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] text-accent">
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
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
                            {tr(h)}
                          </li>
                        ))}
                      </ul>
                    )}

                    {(ad.phone || (ad.address && tr(ad.address))) && (
                      <div className="mt-6 flex flex-wrap gap-4 border-t border-card-border pt-4 text-sm">
                        {ad.address && tr(ad.address) ? (
                          <span className="inline-flex items-center gap-2 text-ink-soft">
                            <MapPin className="h-4 w-4 text-brand" />
                            {tr(ad.address)}
                          </span>
                        ) : null}
                        {ad.phone ? (
                          <a
                            href={`tel:${ad.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 font-bold text-accent hover:underline"
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

      <Lightbox
        items={lightboxItems}
        index={zoomIdx}
        onClose={close}
        onIndexChange={setZoomIdx}
      />
    </>
  );
}

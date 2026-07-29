"use client";

import { useState } from "react";
import {
  Navigation,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ObfuscatedEmail } from "@/components/ui/obfuscated-email";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";
import { ContactForm } from "@/components/ui/contact-form";
import { dict } from "@/lib/i18n";

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
};

export function ContactView() {
  const { tr } = useLanguage();
  const s = getSettings();
  const { contact, social } = s;

  // No backend in V1 — submitting opens the visitor's mail client with a
  // pre-filled message. Swap for a real endpoint (e.g. Formspree / API) later.

  const field =
    "w-full rounded-xl border border-card-border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold";

  return (
    <>
      <PageHero
        eyebrow={{ en: "Get in Touch", mr: "संपर्क साधा" }}
        title={{ en: "Contact Us", mr: "आमच्याशी संपर्क साधा" }}
        marathiTitle={{ en: "संपर्क करा", mr: "" }}
        subtitle={{
          en: "Questions, contributions or volunteering — we would love to hear from you.",
          mr: "प्रश्न, वर्गणी किंवा स्वयंसेवा — आम्हाला तुमच्याकडून ऐकायला आवडेल.",
        }}
      />

      <section className="bg-bg section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          {/* Details */}
          <div className="space-y-5">
            <Reveal>
              <DetailCard
                icon={<MapPin className="h-5 w-5" />}
                title={tr({ en: "Address", mr: "पत्ता" })}
              >
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </DetailCard>
            </Reveal>

            <Reveal delay={0.05}>
              <DetailCard
                icon={<Phone className="h-5 w-5" />}
                title={tr({ en: "Phone", mr: "दूरध्वनी" })}
              >
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="block hover:text-accent"
                  >
                    {p}
                  </a>
                ))}
                {/* WhatsApp outperforms email for this audience (MCV-003) */}
                <a
                  href={`https://wa.me/${contact.phones[0].replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  {tr({ en: "Chat on WhatsApp", mr: "व्हॉट्सअ‍ॅपवर संपर्क" })}
                </a>
              </DetailCard>
            </Reveal>

            <Reveal delay={0.1}>
              <DetailCard
                icon={<Mail className="h-5 w-5" />}
                title={tr({ en: "Email", mr: "ईमेल" })}
              >
                <ObfuscatedEmail className="hover:text-accent" />
              </DetailCard>
            </Reveal>

            <Reveal delay={0.15}>
              <DetailCard
                icon={<Clock className="h-5 w-5" />}
                title={tr({ en: "Hours", mr: "वेळ" })}
              >
                {tr(contact.hours)}
              </DetailCard>
            </Reveal>

            {/* Social */}
            <Reveal delay={0.2}>
              <div className="flex gap-3 pt-1">
                {social.map((soc) => {
                  const Icon = SOCIAL_ICONS[soc.icon] ?? Facebook;
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      aria-label={soc.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-card-border text-brand transition-colors hover:border-gold hover:bg-gold/10 hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>

        {/* Map */}
        <div className="wrap mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-card-border shadow-soft">
              <iframe
                src={contact.mapEmbedSrc}
                title="Mandal location map"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>

        {/* How to reach */}
        <div className="wrap mt-16 max-w-4xl">
          <Reveal className="text-center">
            <span className="eyebrow">{tr(dict.reach.eyebrow)}</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">
              {tr(dict.reach.title)}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contact.howToReach?.map((item, i) => (
              <Reveal key={item.mode.en} delay={(i % 2) * 0.08}>
                <div className="card-surface flex h-full gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-maroon/10 text-brand">
                    <Navigation className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">
                      {tr(item.mode)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {tr(item.detail)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-8 text-center">
            <a
              href={contact.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold inline-flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              {tr(dict.cta.getDirections)}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function DetailCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface flex gap-4 p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-maroon/10 text-brand">
        {icon}
      </span>
      <div>
        <p className="font-display font-bold text-ink">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  MapPin,
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
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";

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

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend in V1 — submitting opens the visitor's mail client with a
  // pre-filled message. Swap for a real endpoint (e.g. Formspree / API) later.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${form.name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

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

      <section className="bg-bg py-20">
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
                    className="block hover:text-saffron"
                  >
                    {p}
                  </a>
                ))}
              </DetailCard>
            </Reveal>

            <Reveal delay={0.1}>
              <DetailCard
                icon={<Mail className="h-5 w-5" />}
                title={tr({ en: "Email", mr: "ईमेल" })}
              >
                <a href={`mailto:${contact.email}`} className="hover:text-saffron">
                  {contact.email}
                </a>
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
                      className="grid h-11 w-11 place-items-center rounded-full border border-card-border text-maroon transition-colors hover:border-gold hover:bg-gold/10 hover:text-saffron"
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
            <form onSubmit={submit} className="card-surface space-y-4 p-7">
              <h2 className="font-display text-xl font-bold text-maroon">
                {tr({ en: "Send a Message", mr: "संदेश पाठवा" })}
              </h2>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  {tr({ en: "Your Name", mr: "तुमचे नाव" })}
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                  placeholder={tr({ en: "Full name", mr: "पूर्ण नाव" })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  {tr({ en: "Email", mr: "ईमेल" })}
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  {tr({ en: "Message", mr: "संदेश" })}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-none`}
                  placeholder={tr({
                    en: "How can we help?",
                    mr: "आम्ही कशी मदत करू शकतो?",
                  })}
                />
              </div>
              <button type="submit" className="btn btn-gold w-full">
                <Send className="h-4 w-4" />
                {tr({ en: "Send Message", mr: "संदेश पाठवा" })}
              </button>
              <p className="text-center text-xs text-ink-soft">
                {tr({
                  en: "This opens your email app — no data is stored on the site.",
                  mr: "हे तुमचे ईमेल अ‍ॅप उघडते — साइटवर कोणताही डेटा साठवला जात नाही.",
                })}
              </p>
            </form>
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
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
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
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-maroon/10 text-maroon">
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

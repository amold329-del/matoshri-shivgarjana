"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { getNav, getSettings } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import { Emblem, LotusDivider } from "@/components/ui/decorations";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
};

export function Footer() {
  const settings = getSettings();
  const nav = getNav();
  const { tr } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#2a0712,#1b0410)] text-[var(--dark-text)]">
      <div className="wrap relative z-10 grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + motto */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <Emblem className="h-12 w-12" />
            <div>
              <p className="font-mr text-base font-bold text-gold-light">
                {tr(settings.org.nameShort)}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--dark-text-soft)]">
                स्थापना {settings.org.established}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--dark-text-soft)]">
            {tr(settings.org.motto)}
          </p>
          <p className="mt-4 font-mr text-lg text-gold-light">
            श्रद्धा • एकता • सेवा
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {tr(dict.footer.quickLinks)}
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--dark-text-soft)] transition-colors hover:text-gold-light"
                >
                  {tr(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-0">
          <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {tr(dict.footer.contact)}
          </h3>
          <ul className="space-y-3 text-sm text-[var(--dark-text-soft)]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{settings.contact.addressLines.join(", ")}</span>
            </li>
            {settings.contact.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-gold-light">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex min-w-0 gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`mailto:${settings.contact.email}`}
                className="min-w-0 break-all hover:text-gold-light"
              >
                {settings.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{tr(settings.contact.hours)}</span>
            </li>
          </ul>
        </div>

        {/* Map + social */}
        <div className="min-w-0">
          <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {tr(dict.footer.follow)}
          </h3>
          <div className="flex gap-2.5">
            {settings.social.map((s) => {
              const Icon = ICONS[s.icon] ?? Facebook;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold-light transition-all hover:border-gold hover:bg-gold/10"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-gold/20">
            <iframe
              src={settings.contact.mapEmbedSrc}
              title="स्थान नकाशा"
              width="100%"
              height="140"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2]"
            />
          </div>
        </div>
      </div>

      <LotusDivider className="opacity-60" />

      <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-[var(--dark-text-soft)] sm:flex-row sm:text-left">
        <p>
          © {year} {tr(settings.org.nameFull)}. {tr(dict.footer.rights)}
          <span className="mx-2 hidden sm:inline">·</span>
          <br className="sm:hidden" />
          {tr(dict.footer.regNo)} {settings.org.registrationNo}
        </p>
        <p className="text-gold-light">{tr(dict.footer.designed)}</p>
      </div>
    </footer>
  );
}

"use client";

import { ShieldCheck } from "lucide-react";
import { getSettings } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * 80G tax-exemption notice.
 *
 * Renders ONLY when `settings.taxExemption.enabled` is true and a registration
 * number is present — a tax-exemption claim must never be shown speculatively,
 * since donors rely on it when filing returns.
 */
export function TaxExemptionNotice({ className }: { className?: string }) {
  const { tr } = useLanguage();
  const tax = getSettings().taxExemption;

  if (!tax?.enabled || !tax.registrationNo.trim()) return null;

  return (
    <div
      className={`card-surface flex gap-4 border-gold/40 p-6 ${className ?? ""}`}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display font-bold text-ink">
          {tr({
            en: `Tax Exemption under Section ${tax.section}`,
            mr: `कलम ${tax.section} अंतर्गत करसवलत`,
          })}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {tr(tax.note)}
        </p>
        <dl className="mt-3 space-y-1 text-xs text-ink-soft">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">
              {tr({ en: "Registration No.", mr: "नोंदणी क्र." })}
            </dt>
            <dd>{tax.registrationNo}</dd>
          </div>
          {tax.validity ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">
                {tr({ en: "Valid", mr: "वैधता" })}
              </dt>
              <dd>{tax.validity}</dd>
            </div>
          ) : null}
          {tax.panNo ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">PAN</dt>
              <dd>{tax.panNo}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
}

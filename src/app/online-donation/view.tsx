"use client";

import Link from "next/link";
import {
  Smartphone,
  ReceiptText,
  ShieldCheck,
  HandHeart,
} from "lucide-react";
import { Emblem, FloatingPetals, TempleSilhouette } from "@/components/ui/decorations";
import { Reveal } from "@/components/ui/reveal";
import { TaxExemptionNotice } from "@/components/ui/tax-exemption-notice";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";

export function OnlineDonationView() {
  const { tr } = useLanguage();

  const planned = [
    {
      icon: Smartphone,
      title: { en: "UPI & Cards", mr: "UPI व कार्ड" },
      body: {
        en: "Contribute securely via UPI, debit, or credit card in a few taps.",
        mr: "UPI, डेबिट किंवा क्रेडिट कार्डद्वारे काही टॅपमध्ये सुरक्षितपणे वर्गणी द्या.",
      },
    },
    {
      icon: ReceiptText,
      title: { en: "Instant Receipts", mr: "त्वरित पावती" },
      body: {
        en: "Get an official, recorded receipt on your phone the moment you pay.",
        mr: "वर्गणी दिल्याक्षणी तुमच्या मोबाइलवर अधिकृत, नोंदवलेली पावती मिळवा.",
      },
    },
    {
      icon: ShieldCheck,
      title: { en: "Safe & Transparent", mr: "सुरक्षित व पारदर्शक" },
      body: {
        en: "Every contribution is logged and reflected in the annual accounts.",
        mr: "प्रत्येक वर्गणी नोंदवली जाते आणि वार्षिक हिशोबात दर्शवली जाते.",
      },
    },
    {
      icon: HandHeart,
      title: { en: "Support the Utsav", mr: "उत्सवाला हातभार" },
      body: {
        en: "Help fund the mandap, celebrations, and our year-round social work.",
        mr: "मंडप, उत्सव आणि वर्षभराच्या सामाजिक कार्यासाठी मदत करा.",
      },
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_-10%,#5a1024_0%,#2a0712_55%,#1b0410_100%)] pb-28 pt-36 text-center text-[var(--dark-text)]">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle,#e6c868,transparent 65%)" }}
        />
        <FloatingPetals count={10} />

        <div className="wrap relative z-10 flex flex-col items-center">
          <Reveal>
            <Emblem className="h-24 w-24 drop-shadow-[0_8px_24px_rgba(230,200,104,0.35)]" />
          </Reveal>
          <Reveal delay={0.05}>
            <span className="mt-6 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-light">
              {tr(dict.cta.comingSoon)}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-mr text-2xl font-semibold text-gold-light sm:text-3xl">
              {tr(dict.comingSoonPage.donation)}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {tr({ en: "Online Donation", mr: "ऑनलाइन देणगी" })}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-[1.05rem] text-[var(--dark-text-soft)]">
              {tr({
                en: "Secure online contributions are on the way. Until then, please contact the committee to offer your vargani or donation.",
                mr: "सुरक्षित ऑनलाइन वर्गणीची सुविधा लवकरच येत आहे. तोपर्यंत, वर्गणी किंवा देणगी देण्यासाठी कृपया कार्यकारिणीशी संपर्क साधा.",
              })}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/vargani" className="btn btn-gold">
                {tr({ en: "About Vargani", mr: "वर्गणीबद्दल" })}
              </Link>
              <Link href="/contact" className="btn btn-outline !border-gold/40 !text-gold-light">
                {tr(dict.cta.contactUs)}
              </Link>
            </div>
          </Reveal>
        </div>

        <TempleSilhouette className="absolute bottom-0 left-0 h-20 w-full text-[#1b0410] opacity-90" />
      </header>

      {/* Planned features */}
      <section className="bg-bg py-20">
        <div className="wrap max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">{tr({ en: "What's Coming", mr: "काय येत आहे" })}</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              {tr({ en: "How Online Donation Will Work", mr: "ऑनलाइन देणगी कशी असेल" })}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {planned.map((p, i) => (
              <Reveal key={p.title.en} delay={(i % 2) * 0.08}>
                <article className="card-surface flex h-full gap-4 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-maroon/10 text-maroon">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {tr(p.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {tr(p.body)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <TaxExemptionNotice className="mt-8" />
        </div>
      </section>
    </>
  );
}

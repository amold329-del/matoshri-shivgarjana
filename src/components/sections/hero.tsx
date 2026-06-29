"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { getSettings } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
import {
  TempleSilhouette,
  FloatingPetals,
} from "@/components/ui/decorations";

/**
 * Fullscreen landing hero — the showpiece.
 * Deep maroon radial gradient, gold glow, light rays, falling petals, a
 * temple skyline, and the large Devanagari title with the 47-year gold badge.
 */
export function Hero() {
  const settings = getSettings();
  const { tr } = useLanguage();
  const reduce = useReducedMotion();
  const org = settings.org;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(125%_125%_at_50%_-10%,#5a1024_0%,#2a0712_52%,#190410_100%)] text-center text-[var(--dark-text)]">
      {/* gold glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-55 blur-[90px]"
        style={{ background: "radial-gradient(circle,#e6c868,transparent 65%)" }}
      />
      {/* light rays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 0deg, #e6c868 12deg, transparent 24deg, transparent 60deg, #e6c868 72deg, transparent 84deg, transparent 140deg, #e6c868 152deg, transparent 164deg)",
        }}
      />
      <FloatingPetals count={16} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="wrap relative z-10 flex flex-col items-center pt-24"
      >
        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur"
        >
          श्री गणेशाय नमः · स्थापना {org.established}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-mr text-[2.1rem] font-extrabold leading-[1.18] text-[var(--dark-text)] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
        >
          मातोश्री शिवगर्जना
          <span className="mt-1 block goldtext">
            सार्वजनिक गणेशोत्सव मंडळ
          </span>
          <span className="mt-1 block text-2xl font-bold text-[var(--dark-text-soft)] sm:text-3xl md:text-4xl">
            (रजि.)
          </span>
        </motion.h1>

        {/* Devotional tagline */}
        <motion.p
          variants={item}
          className="mt-5 font-mr text-xl font-semibold tracking-wide text-gold-light sm:text-2xl"
        >
          {tr(org.tagline)}
        </motion.p>

        {/* 47-year badge */}
        <motion.div
          variants={item}
          className="relative mt-8 inline-flex items-center justify-center"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gold/20 blur-xl" />
          <span className="rounded-full border border-gold/50 bg-gradient-to-b from-gold-light/20 to-transparent px-7 py-3 font-mr text-2xl font-bold text-gold-light shadow-gold sm:text-3xl">
            ४७ वे वर्ष
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-base text-[var(--dark-text-soft)] sm:text-lg"
        >
          श्रद्धा, एकता आणि सेवेची ४७ वर्षे साजरी करत आहोत
        </motion.p>

        <motion.div
          variants={item}
          className="mt-3 flex items-center gap-3 text-sm text-[var(--dark-text-soft)]"
        >
          <span>स्थापना {org.established}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span>नोंदणी {org.registered}</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/gallery" className="btn btn-gold">
            {tr(dict.cta.gallery)}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn btn-ghost">
            {tr(dict.cta.about)}
          </Link>
          <Link href="/vargani" className="btn btn-ghost">
            {tr(dict.cta.vargani)}
          </Link>
          <Link
            href="/sabhasad"
            className="btn btn-ghost relative opacity-90"
          >
            {tr(dict.cta.sabhasad)}
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-gold-light">
              {tr(dict.cta.comingSoon)}
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-gold/40 p-1.5">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-gold-light" />
        </div>
        <ChevronDown className="mx-auto mt-1 h-4 w-4 animate-bounce text-gold/60" />
      </div>

      <TempleSilhouette className="absolute bottom-0 left-0 z-0 h-28 w-full text-[#190410] sm:h-32" />
    </section>
  );
}

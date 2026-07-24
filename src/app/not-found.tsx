"use client";

import Link from "next/link";
import { Emblem, FloatingPetals } from "@/components/ui/decorations";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";

/** Bilingual 404 page. */
export default function NotFound() {
  const { tr, lang } = useLanguage();

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_-10%,#5a1024_0%,#2a0712_55%,#1b0410_100%)] px-6 py-28 text-center text-[var(--dark-text)]">
      <FloatingPetals count={8} />
      <div className="relative z-10 flex flex-col items-center">
        <Emblem className="h-20 w-20 drop-shadow-[0_8px_24px_rgba(230,200,104,0.35)]" />
        <p className="mt-6 font-display text-6xl font-extrabold text-gold-light">
          {lang === "mr" ? "४०४" : "404"}
        </p>
        <h1 className="mt-2 font-mr text-2xl font-bold sm:text-3xl">
          {tr(dict.notFound.title)}
        </h1>
        <p className="mt-3 max-w-md text-[var(--dark-text-soft)]">
          {tr(dict.notFound.body)}
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          {tr(dict.cta.backHome)}
        </Link>
      </div>
    </section>
  );
}

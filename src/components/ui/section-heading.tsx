"use client";

import { useLanguage } from "@/components/providers/language-provider";
import type { Bilingual } from "@/types/content";
import { LotusDivider } from "@/components/ui/decorations";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Standard section header: small eyebrow label, large display title, and a
 * temple-style gold divider. Used across the homepage and inner pages so
 * rhythm stays consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow: Bilingual;
  title: Bilingual;
  intro?: Bilingual;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const { tr } = useLanguage();
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
      )}
    >
      <span className="eyebrow">{tr(eyebrow)}</span>
      <h2
        className={cn(
          "max-w-2xl font-display text-3xl font-extrabold sm:text-4xl md:text-[2.75rem]",
          tone === "dark" ? "text-[var(--dark-text)]" : "text-ink",
        )}
      >
        {tr(title)}
      </h2>
      {centered && <LotusDivider />}
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-[1.02rem] leading-relaxed",
            tone === "dark" ? "text-[var(--dark-text-soft)]" : "text-ink-soft",
          )}
        >
          {tr(intro)}
        </p>
      )}
    </Reveal>
  );
}

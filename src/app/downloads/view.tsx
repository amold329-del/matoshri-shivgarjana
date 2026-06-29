"use client";

import { useMemo } from "react";
import { FileText, Download, FolderOpen } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getDownloads } from "@/lib/content";
import { dict } from "@/lib/i18n";
import type { DownloadItem } from "@/types/content";

export function DownloadsView() {
  const { tr } = useLanguage();
  const items = getDownloads();

  // Group by category (English key) preserving first-seen order.
  const groups = useMemo(() => {
    const map = new Map<string, { label: DownloadItem["category"]; items: DownloadItem[] }>();
    items.forEach((d) => {
      const key = d.category.en;
      if (!map.has(key)) map.set(key, { label: d.category, items: [] });
      map.get(key)!.items.push(d);
    });
    return Array.from(map.values());
  }, [items]);

  return (
    <>
      <PageHero
        eyebrow={{ en: "Resources", mr: "संसाधने" }}
        title={{ en: "Downloads", mr: "डाउनलोड" }}
        subtitle={{
          en: "Forms, notices and reports you can save or print. Files open in a new tab.",
          mr: "जतन किंवा मुद्रित करण्यासाठी फॉर्म, सूचना आणि अहवाल. फायली नवीन टॅबमध्ये उघडतात.",
        }}
      />

      <section className="bg-bg py-20">
        <div className="wrap max-w-3xl space-y-12">
          {groups.map((g, gi) => (
            <div key={g.label.en}>
              <Reveal>
                <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-maroon">
                  <FolderOpen className="h-5 w-5 text-saffron" />
                  {tr(g.label)}
                </h2>
              </Reveal>
              <div className="space-y-3">
                {g.items.map((d, i) => (
                  <Reveal key={d.title.en} delay={i * 0.05}>
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-surface group flex items-center gap-4 p-5 transition-colors hover:border-gold"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-maroon/10 text-maroon">
                        <FileText className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-ink">
                          {tr(d.title)}
                        </p>
                        <p className="truncate text-sm text-ink-soft">
                          {tr(d.description)}
                          {d.size ? ` · ${d.size}` : ""}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-card-border px-4 py-1.5 text-sm font-semibold text-saffron transition-colors group-hover:border-gold group-hover:bg-gold/10">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          {tr(dict.cta.download)}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          <p className="text-center text-xs text-ink-soft">
            {tr({
              en: "Documents will be available for download here soon.",
              mr: "दस्तऐवज लवकरच येथे डाउनलोडसाठी उपलब्ध होतील.",
            })}
          </p>
        </div>
      </section>
    </>
  );
}

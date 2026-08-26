"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Picture } from "@/components/ui/picture";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { useLanguage } from "@/components/providers/language-provider";
import { formatDate } from "@/lib/date";
import type { NewsItem } from "@/types/content";

export function NewsPostView({
  post,
  slug,
}: {
  post: NewsItem;
  slug: string;
}) {
  const { tr, lang } = useLanguage();
  const paragraphs = lang === "mr" ? post.body!.mr : post.body!.en;

  return (
    <article className="section bg-bg">
      <div className="wrap max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            {tr(post.category)} · {formatDate(post.date, lang)}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-3 font-display text-display-md font-extrabold text-balance text-ink">
            {tr(post.title)}
          </h1>
        </Reveal>

        {post.image && (
          <Reveal delay={0.1}>
            <figure className="card-surface mt-8 overflow-hidden p-0">
              <Picture
                src={post.image}
                alt={tr(post.title)}
                sizes="(max-width: 1024px) 92vw, 768px"
                priority
                className="block"
                imgClassName="block h-auto w-full"
              />
            </figure>
          </Reveal>
        )}

        <div className="mt-8 space-y-5">
          {paragraphs.map((text, index) => (
            <Reveal key={index} delay={Math.min(0.12 + index * 0.04, 0.3)}>
              <p className="text-body-lg leading-relaxed text-ink-soft">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-body-sm font-semibold text-ink-soft">
            {tr({
              en: "— The Committee, Matoshree Shivgarjana Sarvajanik Ganeshotsav Mandal, Parel-Bhoiwada",
              mr: "— कार्यकारिणी, मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ, परेल-भोईवाडा",
            })}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/news" className="btn btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              {tr({ en: "All updates", mr: "सर्व घडामोडी" })}
            </Link>
            <Link href="/events" className="btn btn-ghost">
              {tr({
                en: "Ganeshotsav 2026 programme",
                mr: "गणेशोत्सव २०२६ कार्यक्रम",
              })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <ShareButtons
            path={`/news/${slug}/`}
            title={tr(post.title)}
            className="mt-10 border-t border-card-border pt-8"
          />
        </Reveal>
      </div>
    </article>
  );
}

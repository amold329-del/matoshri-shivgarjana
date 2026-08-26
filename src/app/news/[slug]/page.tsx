import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { getNews } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { NewsPostView } from "./view";

/**
 * One page per news item that has something to read.
 *
 * Generated from items carrying a `body` — see the note on NewsItem. /news/
 * itself keeps every announcement as a card, so nothing is hidden; an item only
 * gets its own URL once there is more than a sentence behind it. That keeps this
 * route from becoming a page-per-sentence, which is what Google's
 * scaled-content-abuse policy exists to catch.
 */

const posts = () => getNews().filter((item) => item.body);
const slugOf = (item: { slug?: string; id: string }) => item.slug ?? item.id;

export function generateStaticParams() {
  return posts().map((item) => ({ slug: slugOf(item) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts().find((item) => slugOf(item) === slug);
  if (!post) return {};

  return buildMetadata({
    path: `/news/${slug}/`,
    // Article headlines already read as full titles; the site template would
    // push them past the ~65 characters Google displays.
    absoluteTitle: post.title.mr,
    // The first paragraph is the natural description — it is what the page
    // opens with, so the snippet matches what the visitor then reads.
    description: post.body!.mr[0].slice(0, 155),
    ...(post.image ? { ogImage: post.image } : {}),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts().find((item) => slugOf(item) === slug);
  if (!post) notFound();

  /**
   * Article, not NewsArticle: this is a Mandal announcement rather than
   * journalism, and NewsArticle carries expectations (a news publication,
   * editorial standards) the site does not meet. `author` and `publisher` are
   * both the Mandal, which is accurate — nobody is credited individually.
   */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/news/${slug}/#article`,
    headline: post.title.mr,
    alternativeHeadline: post.title.en,
    description: post.excerpt.mr,
    datePublished: post.date,
    inLanguage: "mr-IN",
    mainEntityOfPage: `${SITE_URL}/news/${slug}/`,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumb path={`/news/${slug}/`} name={post.title.mr} />
      <NewsPostView post={post} slug={slug} />
    </>
  );
}

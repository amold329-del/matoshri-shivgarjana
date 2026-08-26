import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { getGallery } from "@/lib/content";
import { GalleryYearView } from "./view";

/**
 * One page per year of photographs.
 *
 * /gallery/ filters by year in client state, so those views have no URL of
 * their own and nothing for Google to index. Each year here becomes a real
 * page carrying that year's photographs and their captions — genuine content
 * that also gives Google Images something to attach to a query like
 * "matoshree shivgarjana ganpati 2025".
 *
 * Deliberately generated from the data rather than hand-listed: add photographs
 * for a new year to content/gallery.json and its page appears at the next build.
 */

const DEVANAGARI_DIGITS = "०१२३४५६७८९";
const toMarathiDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);

function years() {
  return Array.from(new Set(getGallery().map((item) => item.year))).sort(
    (a, b) => b - a,
  );
}

export function generateStaticParams() {
  return years().map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const items = getGallery().filter((item) => item.year === Number(year));
  const mr = toMarathiDigits(Number(year));

  return buildMetadata({
    path: `/gallery/${year}/`,
    absoluteTitle: `गणेशोत्सव ${mr} गॅलरी · Ganeshotsav ${year} Photos, Parel`,
    description:
      `मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ, परेल-भोईवाडा — ` +
      `गणेशोत्सव ${mr} मधील ${toMarathiDigits(items.length)} छायाचित्रे: ` +
      `मूर्ती, मंडप, मिरवणूक आणि सामाजिक कार्य.`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const numeric = Number(year);
  if (!years().includes(numeric)) notFound();

  return (
    <>
      <Breadcrumb
        path={`/gallery/${year}/`}
        name={`गणेशोत्सव ${toMarathiDigits(numeric)} गॅलरी`}
      />
      <GalleryYearView year={numeric} allYears={years()} />
    </>
  );
}

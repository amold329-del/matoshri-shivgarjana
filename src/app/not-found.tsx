import type { Metadata } from "next";
import { NotFoundView } from "./not-found-view";

export const metadata: Metadata = {
  title: "पृष्ठ सापडले नाही · Page not found",
  description:
    "तुम्ही शोधत असलेले पृष्ठ उपलब्ध नाही. मातोश्री शिवगर्जना सार्वजनिक गणेशोत्सव मंडळ (रजि.), मुंबई.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}

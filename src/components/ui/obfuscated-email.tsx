import { EMAIL } from "@/lib/site";

/**
 * The Mandal's email as a mailto link.
 *
 * ## Why this no longer obfuscates
 *
 * MCV-027 originally split the address and reassembled it after mount, showing
 * `user [at] domain` before hydration. Two problems, both found on the live
 * site:
 *
 * 1. **It produced a corrupted address in the served HTML.** The visible span
 *    said " [at] " while a screen-reader-only span said "@", so anything that
 *    reads the DOM as text — Google's indexer, a text browser, copy-paste —
 *    concatenated both into
 *    `matoshreeshivgarjanasarvajanik [at] @gmail.com`.
 *    That string was what Search indexed, and a mangled address is exactly the
 *    kind of NAP inconsistency that stops a website and a Google Business
 *    Profile reinforcing each other.
 *
 * 2. **It protected nothing.** The same address sits in plain text in the
 *    Organization JSON-LD (src/app/structured-data.tsx) and twice in
 *    content/faq.json. A harvester takes it from either in one pass. Removing
 *    it from those would cost real value — the schema `email` is an entity
 *    signal, and the FAQ answer is what a visitor is looking for.
 *
 * So the component now renders the address plainly and identically before and
 * after hydration. If address harvesting ever becomes a real problem, the
 * answer is a contact form endpoint, not markup that only confuses crawlers.
 */
export function ObfuscatedEmail({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={`mailto:${EMAIL}`} className={className}>
      {children ?? EMAIL}
    </a>
  );
}

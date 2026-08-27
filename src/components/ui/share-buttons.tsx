"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { SITE_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Share the current page.
 *
 * ## Why WhatsApp specifically
 *
 * Nearly everything about this Mandal already travels by WhatsApp — the
 * unveiling poster, the vargani receipts, the aarti reminders. A devotee
 * sending the procession route to a family group is the most likely sharing
 * action on this site, and there was no button for it.
 *
 * ## Why the WhatsApp link is server-rendered
 *
 * The obvious implementation gates everything behind `mounted` so it can read
 * `navigator.share` and `window.location`. That costs two things: a layout
 * shift when the block appears after hydration, and nothing at all for anyone
 * without JavaScript. So the URL is built from the known canonical path
 * instead, and the WhatsApp link ships in the HTML — a plain anchor that works
 * before hydration and without JS.
 *
 * The native share sheet is then a pure enhancement: once mounted, if
 * `navigator.share` exists, the same anchor intercepts the click and opens the
 * OS sheet, which is better than a WhatsApp-only button because it offers
 * whatever that person actually uses. If it doesn't exist, the anchor keeps
 * behaving like an anchor.
 *
 * No analytics call is wired here — the project has no analytics installed, and
 * a tracking call to nowhere is dead code. See docs/ENGAGEMENT.md.
 */
export function ShareButtons({
  title,
  path,
  className,
}: {
  /** Usually the page's own heading, so the shared message reads naturally. */
  title: string;
  /** Canonical path of this page, e.g. "/procession/". */
  path: string;
  className?: string;
}) {
  const { tr } = useLanguage();
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const url = `${SITE_URL}${path}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;

  async function handleShare(event: React.MouseEvent<HTMLAnchorElement>) {
    track("share_click", { method: canNativeShare ? "native" : "whatsapp", path });
    if (!canNativeShare) return; // let the anchor do its normal job
    event.preventDefault();
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissed, or the browser refused. Nothing to recover from.
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      track("copy_link", { path });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={className}>
      <p className="text-body-sm font-semibold text-ink-soft">
        {tr({ en: "Share this page", mr: "हे पान शेअर करा" })}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={whatsapp}
          onClick={handleShare}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          <Share2 aria-hidden className="h-4 w-4" />
          {canNativeShare
            ? tr({ en: "Share", mr: "शेअर करा" })
            : tr({ en: "Share on WhatsApp", mr: "WhatsApp वर पाठवा" })}
        </a>

        <button type="button" onClick={copy} className="btn btn-ghost">
          {copied ? (
            <Check aria-hidden className="h-4 w-4" />
          ) : (
            <Link2 aria-hidden className="h-4 w-4" />
          )}
          {copied
            ? tr({ en: "Link copied", mr: "लिंक कॉपी झाली" })
            : tr({ en: "Copy link", mr: "लिंक कॉपी करा" })}
        </button>
      </div>
    </div>
  );
}

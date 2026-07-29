"use client";

import { useEffect, useState } from "react";

/**
 * Email address assembled in the browser (MCV-027).
 *
 * The audit found the address in plain text three times per page plus in
 * JSON-LD, which is exactly what address-harvesting crawlers scrape. The
 * parts are stored split and joined only after mount, so the served HTML
 * contains no scrapable address, while real visitors — and screen readers —
 * still get a normal mailto link.
 *
 * Before hydration a readable, non-scrapable form is shown so the page is
 * never blank or broken for no-JS visitors.
 */
const USER = "matoshreeshivgarjanasarvajanik";
const DOMAIN = "gmail.com";

export function ObfuscatedEmail({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const address = `${USER}@${DOMAIN}`;

  if (!ready) {
    return (
      <span className={className}>
        {USER}
        <span aria-hidden> [at] </span>
        <span className="sr-only">@</span>
        {DOMAIN}
      </span>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {children ?? address}
    </a>
  );
}

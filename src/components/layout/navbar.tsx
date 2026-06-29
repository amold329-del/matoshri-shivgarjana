"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getNav, getSettings } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Emblem } from "@/components/ui/decorations";
import { cn } from "@/lib/utils";

/**
 * Sticky navigation.
 * - Transparent over the hero, then a frosted glass bar once scrolled.
 * - Collapses to a slide-down sheet on mobile.
 * - Theme toggle lives on the right. (Marathi-only site — no language switch.)
 */
export function Navbar() {
  const nav = getNav();
  const settings = getSettings();
  const pathname = usePathname();
  const { tr } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the sheet on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-card-border py-2 shadow-soft"
          : "border-b border-transparent py-4",
      )}
    >
      <nav className="wrap flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Emblem className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span className="block font-mr text-[0.95rem] font-bold text-ink">
              {tr(settings.org.nameShort)}
            </span>
            <span className="block font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-saffron">
              स्थापना {settings.org.established} · {settings.org.yearsCount} वे वर्ष
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[0.86rem] font-medium transition-colors",
                    active
                      ? "text-saffron"
                      : "text-ink-soft hover:text-saffron",
                  )}
                >
                  {tr(item.label)}
                  {item.comingSoon && (
                    <span className="ml-1 rounded-full bg-gold/15 px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-wider text-gold">
                      लवकरच
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-card-border text-ink xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "glass overflow-hidden border-t border-card-border transition-[max-height] duration-300 xl:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <ul className="wrap flex flex-col gap-1 py-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium transition-colors",
                    active
                      ? "bg-gold/10 text-saffron"
                      : "text-ink hover:bg-surface-2",
                  )}
                >
                  <span>{tr(item.label)}</span>
                  {item.comingSoon && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                      लवकरच
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

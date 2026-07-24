"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getNav, getSettings } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { dict } from "@/lib/i18n";
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
  const { tr, toggle } = useLanguage();
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
      <nav className="wrap flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Emblem className="h-10 w-10 shrink-0" />
          <span className="leading-tight">
            <span
              className={cn(
                "block font-mr font-bold leading-[1.2] transition-colors",
                scrolled ? "text-ink" : "text-[var(--dark-text)]",
              )}
            >
              {/* Short name everywhere: the full registered name cannot share
                  the bar with the menu, especially in English. It appears in
                  full in the hero and the footer. */}
              <span className="block max-w-[11rem] text-[0.78rem] sm:max-w-[14rem] sm:text-[0.85rem] xl:max-w-[16rem] xl:text-[0.95rem]">
                {tr(settings.org.nameShort)}
              </span>
            </span>
            <span
              className={cn(
                "mt-0.5 block font-mr text-[0.58rem] font-semibold tracking-[0.06em] transition-colors sm:text-[0.68rem] xl:text-[0.72rem]",
                scrolled ? "text-saffron" : "text-gold-light",
              )}
            >
              {tr(settings.org.tagline)}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-desktop hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-1.5 py-2 text-[0.8rem] font-medium transition-colors",
                    active
                      ? scrolled
                        ? "text-saffron"
                        : "text-gold-light"
                      : scrolled
                        ? "text-ink-soft hover:text-saffron"
                        : "text-[var(--dark-text-soft)] hover:text-[var(--dark-text)]",
                  )}
                >
                  {tr(item.label)}
                  {item.comingSoon && (
                    <span className="ml-1 rounded-full bg-gold/15 px-1.5 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-wider text-gold">
                      {tr(dict.cta.comingSoon)}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Switch language / भाषा बदला"
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[0.68rem] font-extrabold tracking-wide transition-colors",
              scrolled
                ? "border-card-border text-ink hover:border-gold hover:text-saffron"
                : "border-white/25 text-[var(--dark-text)] hover:border-gold hover:text-gold-light",
            )}
          >
            {tr(dict.nav.languageToggle)}
          </button>
          <ThemeToggle onDark={!scrolled} />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "nav-burger grid h-10 w-10 place-items-center rounded-full border transition-colors xl:hidden",
              scrolled
                ? "border-card-border text-ink"
                : "border-white/25 text-[var(--dark-text)]",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "nav-mobile-panel glass overflow-hidden border-t border-card-border transition-[max-height] duration-300 xl:hidden",
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
                      {tr(dict.cta.comingSoon)}
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

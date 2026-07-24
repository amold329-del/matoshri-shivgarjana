"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Bilingual } from "@/types/content";
import { type Lang } from "@/lib/i18n";

/**
 * Lightweight EN/MR i18n context.
 *
 * V1.0 intentionally uses an in-app language switch rather than next-intl
 * locale routing — it keeps the static export single-tree and lets every
 * component translate Bilingual content with one hook. (See README for the
 * next-intl upgrade path when localized URLs / SSR become desirable.)
 *
 * The choice is persisted to <html lang> and localStorage so reloads remember
 * the visitor's preference. Default is Marathi-forward per the brand brief,
 * but we respect a stored choice first.
 */
interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Resolve a Bilingual value to the active language. */
  tr: (value: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "msg-lang";

export function LanguageProvider({
  children,
  defaultLang = "mr",
}: {
  children: React.ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  // Restore the visitor's stored preference (falls back to defaultLang).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "mr") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  // Reflect language on <html lang> + persist.
  useEffect(() => {
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "en" ? "mr" : "en")),
    [],
  );
  const tr = useCallback((value: Bilingual) => value[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

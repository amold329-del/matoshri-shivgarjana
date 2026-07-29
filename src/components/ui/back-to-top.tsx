"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Floating "back to top" control. Fades/scales in after the visitor has
 * scrolled past the fold and smooth-scrolls home on click.
 */
export function BackToTop() {
  const { tr } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label={tr({ en: "Back to top", mr: "वर पर्यंत जा" })}
          onClick={() =>
            // Animating through 10,000+ px is slow and nauseating; jump
            // instantly from deep in the page (MCV-045).
            window.scrollTo({
              top: 0,
              behavior: window.scrollY > 3000 ? "instant" : "smooth",
            })
          }
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="back-to-top fixed bottom-6 right-6 z-[65] grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-[linear-gradient(120deg,#e6c868,#c9a227)] text-[#3a1206] shadow-[0_10px_30px_-8px_rgba(201,162,39,0.7)]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold reading-progress bar pinned to the very top of the viewport.
 * Sits above the navbar (z-70). Purely decorative, so it stays even under
 * reduced-motion — a progress indicator isn't a motion hazard.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[linear-gradient(90deg,#c9a227,#f3df9a,#e6c868)]"
    />
  );
}

"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin gold progress bar pinned under the navbar tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold-gradient"
      style={{ scaleX }}
    />
  );
}

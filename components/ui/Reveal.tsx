"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Animate on mount instead of on scroll - use for above-the-fold content. */
  immediate?: boolean;
};

/** Subtle reveal. Scroll-triggered by default; on-mount when `immediate`.
 *  Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 18, className, immediate }: RevealProps) {
  const reduce = useReducedMotion();
  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } as const };

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}

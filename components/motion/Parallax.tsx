"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked parallax wrapper. `speed` > 0 drifts up as you scroll
 * (foreground feel); < 0 drifts down (background feel).
 */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

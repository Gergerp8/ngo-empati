"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Gold progress bar that sweeps to its value when scrolled into view. */
export function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  const reduce = useReducedMotion();
  const width = `${Math.min(100, Math.max(0, pct))}%`;

  return (
    <div
      className={cn("h-3 w-full overflow-hidden rounded-full bg-sand", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gold-gradient"
        initial={reduce ? { width } : { width: "0%" }}
        whileInView={{ width }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Animated number counter that springs up when scrolled into view.
 * Accepts "5,000+", "RM2,500", "12" etc. - animates the numeric part and
 * preserves prefix/suffix.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const match = value.match(/([\d.,]+)/);
  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : value;
  const hasComma = match ? match[1].includes(",") : false;

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 28, stiffness: 90 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = value;
      return;
    }
    const render = (v: number) => {
      const n = Math.round(v);
      el.textContent = prefix + (hasComma ? n.toLocaleString("en-US") : String(n)) + suffix;
    };
    render(spring.get());
    return spring.on("change", render);
  }, [spring, prefix, suffix, hasComma, reduce, value]);

  return <span ref={ref} className={className} aria-label={value} />;
}

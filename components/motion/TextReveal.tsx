"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Staggered word-by-word reveal for headlines. Words slide up from behind
 * an overflow mask - the signature "premium" text entrance.
 */
export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

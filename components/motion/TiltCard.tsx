"use client";

import { useRef } from "react";
import {
  motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt-on-hover card with a gold glow that follows the cursor.
 * Pointer-only effect - inert on touch and with reduced motion.
 */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 200, damping: 24 });
  const glowX = useTransform(px, (v) => v * 100);
  const glowY = useTransform(py, (v) => v * 100);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${glowX}% ${glowY}%, rgba(229,168,35,0.14), transparent 65%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group/tilt relative will-change-transform", className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ backgroundImage: glow }}
      />
      {children}
    </motion.div>
  );
}

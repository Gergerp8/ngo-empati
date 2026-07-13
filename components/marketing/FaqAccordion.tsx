"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gold-50/50"
            >
              <span className="font-semibold text-ink">{f.q}</span>
              <Plus className={cn("h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300", isOpen && "rotate-45")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-ink-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

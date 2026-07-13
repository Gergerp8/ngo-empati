"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/lib/content";

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % gallery.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {gallery.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft focus-visible:outline-2"
            aria-label={`Buka imej: ${g.caption}`}
          >
            <Image
              src={g.src}
              alt={g.caption}
              width={600}
              height={g.tall ? 800 : 450}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {g.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button onClick={close} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Tutup">
              <X className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6" aria-label="Sebelum">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6" aria-label="Seterusnya">
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.figure
              key={index}
              className="max-h-[85vh] max-w-4xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={gallery[index].src} alt={gallery[index].caption} width={1200} height={800} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-cream/80">{gallery[index].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

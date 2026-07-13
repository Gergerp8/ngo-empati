import Image from "next/image";
import { partners } from "@/lib/content";

/** Continuously scrolling partner logo strip (pauses for reduced-motion). */
export function PartnerMarquee() {
  const items = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-6 motion-reduce:animate-none">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-4 shadow-soft"
          >
            <Image
              src={p.image}
              alt={p.name}
              width={150}
              height={70}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

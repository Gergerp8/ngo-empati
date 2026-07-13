import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { Programme } from "@/lib/content";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <article className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={programme.image}
          alt={programme.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
          {programme.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        {programme.schedule && (
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gold-700">
            <CalendarDays className="h-3.5 w-3.5" /> {programme.schedule}
          </p>
        )}
        <h3 className="text-xl font-bold text-ink">{programme.title}</h3>
        <p className="mt-1 text-sm font-medium text-ink-muted">{programme.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {programme.description}
        </p>
        <Link
          href={`/program/${programme.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-gold-700"
        >
          Ketahui lanjut
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

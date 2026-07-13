import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { news } from "@/lib/content";

export const metadata: Metadata = {
  title: "Berita & Liputan",
  description: "Berita terkini, liputan media dan kemas kini program NGO Empati.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric" });
}

export default function BeritaPage() {
  const [featured, ...rest] = news;
  return (
    <>
      <PageHeader
        eyebrow="Berita & Liputan"
        title={<>Kisah terkini dari <span className="text-gradient-gold">Empati</span></>}
        description="Ikuti perkembangan program, pencapaian dan liputan media kami."
      />

      <section className="container py-14 sm:py-20">
        {/* Featured */}
        <Reveal>
          <article className="group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-gold-50 px-3 py-1 font-semibold text-gold-700">{featured.category}</span>
                <span className="flex items-center gap-1.5 text-ink-muted"><CalendarDays className="h-4 w-4" /> {formatDate(featured.date)}</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-ink lg:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-ink-muted">{featured.excerpt}</p>
            </div>
          </article>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.06}>
              <article className="group card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={n.image} alt={n.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="rounded-full bg-gold-50 px-2.5 py-0.5 font-semibold text-gold-700">{n.category}</span>
                    <span>{formatDate(n.date)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

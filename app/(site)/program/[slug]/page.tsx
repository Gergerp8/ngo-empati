import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { programmes } from "@/lib/content";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return { title: "Program" };
  return { title: programme.title, description: programme.description };
}

export default async function ProgrammeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) notFound();

  return (
    <article>
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image src={programme.image} alt={programme.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="container absolute inset-x-0 bottom-0 pb-10">
          <Link href="/program" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/90 hover:text-cream">
            <ArrowLeft className="h-4 w-4" /> Semua program
          </Link>
          <h1 className="heading-1 max-w-3xl text-cream">{programme.title}</h1>
          <p className="mt-2 text-lg text-cream/85">{programme.tagline}</p>
        </div>
      </div>

      <div className="container grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {programme.schedule && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 font-semibold text-gold-700">
                  <CalendarDays className="h-4 w-4" /> {programme.schedule}
                </span>
              )}
              {programme.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-ink-muted">
                  <Tag className="h-3.5 w-3.5" /> {t}
                </span>
              ))}
            </div>
            <p className="lead mt-6 text-ink-soft">{programme.description}</p>
            <div className="prose mt-6 max-w-none text-ink-soft">
              <p>
                Program ini dijalankan secara berkala dengan sokongan sukarelawan terlatih kami. Setiap sesi
                direka untuk mewujudkan ruang yang selamat, mesra dan tanpa penghakiman, di mana setiap
                peserta bebas berkongsi dan disokong.
              </p>
              <p>
                Sertai kami dan jadilah sebahagian daripada komuniti yang mengambil berat. Daftar di sebelah
                untuk menempah tempat anda.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="card h-fit p-6 sm:p-8 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-ink">Daftar untuk sertai</h2>
          <p className="mt-1 text-sm text-ink-muted">Tempat terhad, daftar awal untuk mengelak kekecewaan.</p>
          <div className="mt-6">
            <RegistrationForm programmeId={programme.slug} programmeTitle={programme.title} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { History, IdCard, Medal, Gift } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { MembershipForm } from "@/components/forms/MembershipForm";

export const metadata: Metadata = {
  title: "Keahlian Ahli Empati",
  description:
    "Keahlian Ahli Empati untuk survivor kesihatan mental: sejarah program, rekod kehadiran, lencana pencapaian dan kad keahlian digital.",
};

const benefits = [
  { icon: History, title: "Sejarah program", desc: "Jejak semua program yang anda sertai di satu tempat." },
  { icon: IdCard, title: "Kad keahlian digital", desc: "Kad Ahli Empati peribadi anda dengan nombor unik." },
  { icon: Medal, title: "Lencana pencapaian", desc: "Raikan setiap langkah pemulihan anda." },
  { icon: Gift, title: "Ganjaran program", desc: "Akses keutamaan & ganjaran khas untuk ahli." },
];

export default function KeahlianPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ahli Empati"
        title={<>Anda tidak keseorangan di sini</>}
        description="Keahlian Ahli Empati dibuka untuk survivor kesihatan mental. Sertai komuniti yang memahami, menerima dan meraikan perjalanan pemulihan anda."
      />

      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <div>
          <Reveal>
            <h2 className="heading-2 text-ink">Manfaat keahlian</h2>
            <p className="lead mt-4 text-ink-muted">
              Lebih daripada sekadar pendaftaran, ia ruang kepunyaan anda.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{b.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm text-ink-soft">
            <strong className="text-ink">Nota:</strong> Keahlian Ahli Empati terbuka kepada mereka yang telah
            didiagnosis secara rasmi. Maklumat anda dilindungi sepenuhnya di bawah PDPA.
          </Reveal>
        </div>

        <Reveal className="card h-fit p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink">Daftar sebagai Ahli Empati</h2>
          <p className="mt-1 text-sm text-ink-muted">Percuma dan mengambil masa kurang 3 minit.</p>
          <div className="mt-6">
            <MembershipForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}

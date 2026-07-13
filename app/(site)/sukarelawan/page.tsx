import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { volunteerBadges } from "@/lib/content";

export const metadata: Metadata = {
  title: "Jadi Sukarelawan",
  description:
    "Sertai 1,200+ sukarelawan NGO Empati. Sumbang masa & tenaga, terima tugasan, sijil digital dan lencana pencapaian.",
};

const steps = [
  { n: "01", title: "Hantar permohonan", desc: "Isi borang ringkas di bawah dalam masa 3 minit." },
  { n: "02", title: "Sahkan e-mel", desc: "Klik pautan pengesahan yang dihantar ke e-mel anda." },
  { n: "03", title: "Kelulusan pentadbir", desc: "Pasukan kami menyemak dan meluluskan permohonan anda." },
  { n: "04", title: "Mula menyumbang", desc: "Akses papan pemuka, terima tugasan & check-in mingguan." },
];

const perks = [
  "Papan pemuka sukarelawan peribadi",
  "Tugasan projek yang fleksibel",
  "Check-in mingguan & sokongan pasukan",
  "Sijil digital & pengiktirafan",
  "Komuniti WhatsApp yang menyokong",
  "Latihan asas sokongan psikososial",
];

export default function SukarelawanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sertai Kami"
        title={<>Jadi sebahagian <span className="text-gradient-gold">perubahan</span></>}
        description="Tiada kemahiran khas diperlukan, hanya hati yang ingin membantu. Sumbang masa anda dan jadilah harapan buat seseorang."
      />

      {/* Steps */}
      <section className="container py-14 sm:py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="relative">
              <div className="card h-full p-6">
                <span className="text-3xl font-extrabold text-gold-300">{s.n}</span>
                <h3 className="mt-3 font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + perks */}
      <section className="bg-sand/60 py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="heading-2 text-ink">Kenapa jadi sukarelawan Empati?</h2>
              <p className="lead mt-4 text-ink-muted">
                Anda bukan sekadar membantu orang lain, anda turut berkembang bersama komuniti yang menyokong.
              </p>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {perks.map((p, i) => (
                <Reveal key={p} delay={i * 0.04}>
                  <li className="flex items-start gap-2.5 rounded-2xl border border-line bg-white p-4 text-sm font-medium text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-ink">✓</span>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="font-bold text-ink">Lencana pengiktirafan</h3>
              <p className="mt-1 text-sm text-ink-muted">Kumpul lencana sambil anda menyumbang.</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {volunteerBadges.map((b) => (
                  <div key={b.name} className="rounded-2xl border border-line bg-white p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </div>
                    <p className="mt-2 text-xs font-bold text-ink">{b.name}</p>
                    <p className="text-[11px] text-ink-muted">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="card h-fit p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Borang permohonan sukarelawan</h2>
            <p className="mt-1 text-sm text-ink-muted">Lengkapkan butiran di bawah untuk memulakan.</p>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

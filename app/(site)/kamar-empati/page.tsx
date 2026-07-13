import type { Metadata } from "next";
import { CalendarSearch, ClipboardCheck, BellRing, ShieldCheck, Video, UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { BookingForm } from "@/components/forms/BookingForm";
import { getSupabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Kamar Empati: Tempahan Kaunseling",
  description:
    "Tempah sesi kaunseling sulit bersama kaunselor terlatih melalui Kamar Empati. Pilih slot, sahkan tempahan dan terima peringatan.",
};

// Static fallback for demo mode; real list comes from Supabase `counsellors`.
const fallbackCounsellors = [
  { id: "c1", name: "Kaunselor Aisyah R.", specialty: "Kebimbangan & tekanan", languages: "BM · English" },
  { id: "c2", name: "Kaunselor Hafiz M.", specialty: "Kemurungan & daya tahan", languages: "BM · English" },
  { id: "c3", name: "Kaunselor Priya N.", specialty: "Hubungan & keluarga", languages: "BM · English · Tamil" },
];

async function getCounsellors() {
  const supabase = await getSupabaseServer();
  if (!supabase) return fallbackCounsellors;
  const { data } = await supabase
    .from("counsellors")
    .select("id, name, specialty, languages")
    .eq("active", true)
    .order("name");
  return data?.length
    ? data.map((c) => ({ ...c, specialty: c.specialty ?? "", languages: c.languages ?? "" }))
    : fallbackCounsellors;
}

const steps = [
  { icon: CalendarSearch, title: "Pilih slot", desc: "Lihat kaunselor & masa yang tersedia." },
  { icon: ClipboardCheck, title: "Tempah sesi", desc: "Isi butiran ringkas, semuanya sulit." },
  { icon: BellRing, title: "Terima peringatan", desc: "E-mel pengesahan & peringatan automatik." },
];

export default async function KamarEmpatiPage() {
  const counsellors = await getCounsellors();
  return (
    <>
      <PageHeader
        eyebrow="Kamar Empati"
        title={<>Bercakap dengan seseorang yang <span className="text-gradient-gold">faham</span></>}
        description="Ruang selamat dan sulit untuk anda berkongsi. Tempah sesi bersama kaunselor terlatih, secara peribadi atau dalam talian."
      />

      {/* Steps */}
      <section className="container py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="card h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-gradient text-ink shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Counsellors + form */}
      <section className="bg-sand/60 py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="heading-2 text-ink">Kaunselor kami</h2>
              <p className="lead mt-3 text-ink-muted">Profesional terlatih yang mengutamakan keselesaan anda.</p>
            </Reveal>
            <div className="mt-6 space-y-4">
              {counsellors.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                      <UserRound className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">{c.name}</p>
                      <p className="text-sm text-ink-muted">{c.specialty}</p>
                      <p className="text-xs text-ink-faint">{c.languages}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink">
                <ShieldCheck className="h-5 w-5 text-gold-600" /> 100% Sulit & PDPA
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink">
                <Video className="h-5 w-5 text-gold-600" /> Online / Bersemuka
              </div>
            </Reveal>
          </div>

          <Reveal className="card h-fit p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Tempah sesi anda</h2>
            <p className="mt-1 text-sm text-ink-muted">Pilih kaunselor, tarikh dan masa yang sesuai.</p>
            <div className="mt-6">
              <BookingForm counsellors={counsellors} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

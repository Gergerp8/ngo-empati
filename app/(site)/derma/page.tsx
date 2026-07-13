import type { Metadata } from "next";
import { Building2, Receipt, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { DonationForm } from "@/components/forms/DonationForm";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { ProgressBar } from "@/components/motion/ProgressBar";
import { getSettings, getDonationRaised } from "@/lib/settings";
import { formatRM } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Derma",
  description:
    "Sumbangan bulanan anda menyokong program kesihatan mental, sesi kaunseling dan misi bantuan NGO Empati. Derma dengan selamat melalui ToyyibPay / FPX.",
};

const usage = [
  { icon: HeartHandshake, title: "Program komuniti", desc: "Sesi Lepak & Luah dan aktiviti kesedaran percuma." },
  { icon: ShieldCheck, title: "Sesi kaunseling", desc: "Menampung kos kaunselor terlatih Kamar Empati." },
  { icon: Building2, title: "Misi bantuan", desc: "Sokongan psikososial ketika bencana & krisis." },
];

export default async function DermaPage() {
  const [s, raised] = await Promise.all([getSettings(), getDonationRaised()]);
  const pct = Math.min(100, Math.round((raised / s.monthly_target) * 100));

  return (
    <>
      <PageHeader
        eyebrow="Sokong Misi Kami"
        title={<>Jadikan harapan <span className="text-gradient-gold">mampan</span></>}
        description="Setiap ringgit membantu kami hadir untuk lebih ramai. Derma bulanan anda membina sistem sokongan kesihatan mental yang berterusan."
      />

      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_0.85fr] lg:py-20">
        {/* Form */}
        <Reveal className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink">Buat sumbangan</h2>
          <p className="mt-1 text-sm text-ink-muted">Pilih jumlah dan kekerapan yang sesuai untuk anda.</p>
          <div className="mt-6">
            <DonationForm />
          </div>
        </Reveal>

        {/* Sidebar: progress + bank + usage */}
        <div className="space-y-6">
          <Reveal className="card p-6">
            <p className="text-sm font-semibold text-gold-700">Sasaran bulan ini</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-2xl font-extrabold text-ink">
                <CountUp value={formatRM(raised)} />
              </span>
              <span className="text-sm text-ink-muted">/ {formatRM(s.monthly_target)}</span>
            </div>
            <ProgressBar pct={pct} className="mt-3" />
            <p className="mt-2 text-sm text-ink-muted">{pct}% tercapai bulan ini</p>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="flex items-center gap-2 font-bold text-ink"><Building2 className="h-5 w-5 text-gold-600" /> Pindahan bank terus</h3>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Bank" value={s.bank_name} />
              <Row label="Nama akaun" value={s.account_name} />
              <Row label="No. akaun" value={s.account_number} mono />
              <Row label="Rujukan" value={s.donation_reference} mono />
            </dl>
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-sand p-3 text-xs text-ink-muted">
              <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              Untuk resit, sila e-mel bukti pindahan kepada kami atau tandai pilihan resit dalam borang.
            </p>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="font-bold text-ink">Ke mana derma anda pergi</h3>
            <ul className="mt-4 space-y-4">
              {usage.map((u) => (
                <li key={u.title} className="flex gap-3">
                  <u.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{u.title}</p>
                    <p className="text-sm text-ink-muted">{u.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-2 last:border-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={mono ? "font-mono font-semibold text-ink" : "font-semibold text-ink"}>{value}</dd>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Building2, GraduationCap, FlaskConical, Landmark, Mic } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { partners, ambassadors, advisors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rakan & Kerjasama",
  description:
    "Bekerjasama dengan NGO Empati: kolaborasi CSR, penyelidikan, universiti, kerajaan dan jemputan penceramah.",
};

const types = [
  { icon: Building2, title: "Kolaborasi CSR", desc: "Program tanggungjawab sosial korporat yang bermakna." },
  { icon: FlaskConical, title: "Penyelidikan", desc: "Kerjasama kajian kesihatan mental & komuniti." },
  { icon: GraduationCap, title: "Universiti", desc: "Program pelajar, kelab & penglibatan kampus." },
  { icon: Landmark, title: "Kerajaan", desc: "Inisiatif dasar awam & jangkauan komuniti." },
  { icon: Mic, title: "Jemputan penceramah", desc: "Jemput wakil Empati ke acara anda." },
];

export default function RakanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rakan & Kerjasama"
        title={<>Bersama, kita capai lebih <span className="text-gradient-gold">jauh</span></>}
        description="Kami berbangga bekerjasama dengan universiti, agensi kerajaan, NGO dan syarikat dalam memperjuangkan kesihatan mental."
      />

      {/* Partners */}
      <section className="container py-14 sm:py-16">
        <SectionHeading align="center" eyebrow="Rakan Strategik" title="Mereka yang menyokong kami" />
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className="flex h-32 items-center justify-center rounded-2xl border border-line bg-white p-6 shadow-soft">
                <Image src={p.image} alt={p.name} width={180} height={90} className="max-h-full w-auto object-contain" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ikon & Penasihat */}
      <section className="bg-sand/60 py-14 sm:py-20">
        <div className="container">
          <SectionHeading align="center" eyebrow="Ikon & Penasihat" title="Suara yang memperjuangkan misi kami" />
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            {ambassadors.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                  {a.image && (
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <Image src={a.image} alt={a.name} fill sizes="64px" className="object-cover" />
                    </span>
                  )}
                  <div>
                    <p className="font-bold text-ink">{a.name}</p>
                    <p className="text-sm text-gold-700">{a.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-5 grid max-w-3xl gap-4 sm:grid-cols-3">
            {advisors.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-line bg-white p-5 text-center">
                  <p className="text-sm font-bold text-ink">{a.name}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{a.role}{a.org ? `, ${a.org}` : ""}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Types + form */}
      <section className="container py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Cara Bekerjasama" title="Bentuk kerjasama yang kami tawarkan" />
            <div className="mt-6 space-y-3">
              {types.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.04}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{t.title}</p>
                      <p className="text-sm text-ink-muted">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="card h-fit p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Hantar permintaan kerjasama</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Lengkapkan borang ini, atau gunakan borang Tally rasmi kami untuk permintaan terperinci.
            </p>
            <div className="mt-6">
              <PartnershipForm />
            </div>
            {/* Production: embed the official Tally form here, e.g.
                <iframe src="https://tally.so/embed/XXXX" ... /> */}
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { focusAreas, ambassadors, advisors } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali NGO Empati (Kelab Advokasi Pulih Mental): misi, fokus dan barisan ikon serta penasihat kami dalam memperjuangkan kesihatan mental di Malaysia.",
};

const values = [
  { title: "Mesra", desc: "Kami menyambut semua tanpa menghakimi." },
  { title: "Berani", desc: "Kami turun padang, bukan sekadar bercakap." },
  { title: "Bersama", desc: "Tiada siapa berjuang bersendirian." },
];

const timeline = [
  { year: "2021", text: "NGO Empati ditubuhkan sebagai Kelab Advokasi Pulih Mental." },
  { year: "2023", text: "Program tahunan dirasmikan oleh YBTM Adam Adli, bekas Menteri Belia & Sukan." },
  { year: "2024", text: "Lebih 1,200 sukarelawan aktif & liputan media nasional." },
  { year: "Kini", text: "Memperluas Kamar Empati & jangkauan ke 12 negeri." },
];

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang Kami"
        title={<>Memperjuangkan kesihatan mental, <span className="text-gradient-gold">bersama</span></>}
        description={`${site.legalName} (${site.registration}) ialah pertubuhan advokasi kesihatan mental yang lahir daripada keyakinan bahawa setiap orang berhak didengari dan disokong.`}
      />

      {/* Story */}
      <section className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/perasmian-adam-adli.jpeg" alt="Perasmian program NGO Empati oleh YBTM Adam Adli" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Kisah Kami"
            title="Bermula daripada empati, dibina dengan tindakan"
            description="Kami percaya pemulihan kesihatan mental bukan perjalanan yang perlu dilalui sendirian. Daripada sesi luahan santai hingga misi bantuan bencana, kami hadir untuk komuniti, terutama survivor, belia dan golongan terpinggir."
          />
          <div className="mt-6 grid grid-cols-3 gap-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-4">
                <p className="font-bold text-ink">{v.title}</p>
                <p className="mt-1 text-xs text-ink-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/focus */}
      <section className="bg-sand/60 py-16 sm:py-20">
        <div className="container">
          <SectionHeading align="center" eyebrow="Fokus Kami" title="Komuniti yang kami perjuangkan" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.05}>
                <div className="card h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Perjalanan Kami" title="Setiap tahun, satu langkah lebih dekat" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <div className="relative rounded-2xl border border-line bg-white p-6">
                <span className="text-2xl font-extrabold text-gradient-gold">{t.year}</span>
                <p className="mt-2 text-sm text-ink-soft">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-ink py-16 text-cream sm:py-20">
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-300">Barisan Kepimpinan</p>
            <h2 className="heading-2 mt-3 text-cream">Ikon &amp; Penasihat Empati</h2>
            <p className="mt-4 text-cream/70">Individu yang menyumbang suara dan kepakaran dalam memperjuangkan misi kami.</p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {ambassadors.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.06}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  {a.image && (
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <Image src={a.image} alt={a.name} fill sizes="64px" className="object-cover" />
                    </span>
                  )}
                  <div>
                    <p className="font-bold text-cream">{a.name}</p>
                    <p className="text-sm text-gold-300">{a.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {advisors.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  {a.image ? (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image src={a.image} alt={a.name} fill sizes="48px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                      {a.name.split(" ").slice(-1)[0][0]}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-bold text-cream">{a.name}</p>
                    <p className="text-xs text-cream/60">{a.role}{a.org ? `, ${a.org}` : ""}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

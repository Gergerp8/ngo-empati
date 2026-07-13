import type { Metadata } from "next";
import Image from "next/image";
import { Coffee, HeartHandshake, Users, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { RegistrationForm } from "@/components/forms/RegistrationForm";

export const metadata: Metadata = {
  title: "Lepak & Luah",
  description:
    "Lepak & Luah ialah ruang santai NGO Empati untuk anda datang, lepak dan meluahkan apa yang terbuku tanpa rasa dihakimi.",
};

const features = [
  { icon: Coffee, title: "Suasana santai", desc: "Tiada formaliti, hanya perbualan jujur di ruang yang selesa." },
  { icon: HeartHandshake, title: "Tanpa penghakiman", desc: "Datang seadanya. Luahkan apa sahaja yang anda rasa." },
  { icon: Users, title: "Sokongan rakan sebaya", desc: "Bersama orang yang memahami perjalanan anda." },
  { icon: MapPin, title: "Pelbagai lokasi", desc: "Diadakan di taman & ruang komuniti, hujung minggu." },
];

export default function LepakLuahPage() {
  return (
    <>
      <PageHeader
        eyebrow="Program · Lepak & Luah"
        title={<>Datang, lepak, dan <span className="text-gradient-gold">luahkan</span></>}
        description="Kadang-kadang yang kita perlukan hanyalah seseorang untuk mendengar. Lepak & Luah ialah ruang santai untuk anda berkongsi rasa, secara percuma."
      />

      <section className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/event-komuniti-1.jpeg" alt="Sesi Lepak & Luah NGO Empati" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-14 sm:py-20">
        <div className="container max-w-xl">
          <Reveal className="card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Sertai sesi seterusnya</h2>
            <p className="mt-1 text-sm text-ink-muted">Daftar percuma. Kami akan hantar lokasi & masa kepada anda.</p>
            <div className="mt-6">
              <RegistrationForm programmeId="lepak-luah" programmeTitle="Lepak & Luah" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

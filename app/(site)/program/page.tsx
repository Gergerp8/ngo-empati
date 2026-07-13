import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { ProgrammeCard } from "@/components/marketing/ProgrammeCard";
import { programmes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Program",
  description:
    "Terokai program NGO Empati: Lepak & Luah, Kamar Empati, misi bantuan banjir, advokasi juvana dan banyak lagi.",
};

export default function ProgramPage() {
  return (
    <>
      <PageHeader
        eyebrow="Program Kami"
        title={<>Inisiatif yang menyentuh <span className="text-gradient-gold">kehidupan</span></>}
        description="Setiap program direka untuk hadir di mana komuniti paling memerlukan, daripada ruang luahan santai hingga bantuan kecemasan."
      />
      <section className="container py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <ProgrammeCard key={p.slug} programme={p} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

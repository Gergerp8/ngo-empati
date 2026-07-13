import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Soalan Lazim",
  description: "Jawapan kepada soalan lazim tentang NGO Empati, keahlian, sukarelawan, derma dan Kamar Empati.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="Soalan Lazim"
        title={<>Ada soalan? Kami ada <span className="text-gradient-gold">jawapan</span></>}
        description="Tidak menemui apa yang anda cari? Hubungi kami, kami sentiasa di sini untuk membantu."
      />
      <section className="container py-14 sm:py-20">
        <FaqAccordion />
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-sand p-8 text-center">
          <p className="font-semibold text-ink">Masih ada pertanyaan?</p>
          <p className="mt-1 text-sm text-ink-muted">Pasukan kami sedia membantu anda.</p>
          <div className="mt-4 flex justify-center">
            <Button href="/hubungi" variant="dark" size="md">Hubungi Kami</Button>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { GalleryGrid } from "@/components/marketing/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Detik-detik bermakna bersama komuniti NGO Empati: program, misi dan acara.",
};

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title={<>Detik-detik yang <span className="text-gradient-gold">bermakna</span></>}
        description="Setiap gambar menceritakan kisah harapan, sokongan dan kebersamaan."
      />
      <section className="container py-14 sm:py-20">
        <GalleryGrid />
      </section>
    </>
  );
}

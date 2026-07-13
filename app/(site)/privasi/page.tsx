import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Dasar Privasi",
  description: "Dasar privasi NGO Empati dan komitmen kami terhadap perlindungan data peribadi anda (PDPA).",
};

const sections = [
  { h: "1. Pengumpulan Maklumat", p: "Kami mengumpul maklumat yang anda berikan secara sukarela seperti nama, e-mel dan nombor telefon semasa mendaftar sebagai sukarelawan, ahli, menderma atau menghubungi kami." },
  { h: "2. Penggunaan Maklumat", p: "Maklumat anda digunakan untuk memproses permohonan, menghantar kemas kini program, mengeluarkan resit derma dan menambah baik perkhidmatan kami. Kami tidak menjual data anda kepada pihak ketiga." },
  { h: "3. Perlindungan Data (PDPA)", p: "Kami mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia. Data disimpan dalam pangkalan data yang disulitkan dengan kawalan akses yang ketat." },
  { h: "4. Pendedahan Maklumat", p: "Maklumat anda hanya dikongsi dengan kebenaran anda atau apabila dikehendaki oleh undang-undang." },
  { h: "5. Hak Anda", p: "Anda berhak mengakses, membetulkan atau memohon pemadaman data peribadi anda dengan menghubungi kami." },
  { h: "6. Kuki", p: "Laman web kami menggunakan kuki untuk analitik dan menambah baik pengalaman anda. Anda boleh menguruskan tetapan kuki melalui pelayar anda." },
  { h: "7. Perubahan Dasar", p: "Dasar ini mungkin dikemas kini dari semasa ke semasa. Sebarang perubahan akan dipaparkan di halaman ini." },
];

export default function PrivasiPage() {
  return (
    <>
      <PageHeader eyebrow="Undang-undang" title="Dasar Privasi" description="Kemas kini terakhir: Jun 2026" />
      <section className="container max-w-3xl py-14 sm:py-20">
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-bold text-ink">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

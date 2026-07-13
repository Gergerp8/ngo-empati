import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Terma Penggunaan",
  description: "Terma dan syarat penggunaan laman web dan perkhidmatan NGO Empati.",
};

const sections = [
  { h: "1. Penerimaan Terma", p: "Dengan menggunakan laman web ini, anda bersetuju untuk mematuhi terma dan syarat berikut." },
  { h: "2. Penggunaan Perkhidmatan", p: "Perkhidmatan kami disediakan untuk tujuan sokongan kesihatan mental, kesukarelawanan dan derma. Anda bersetuju untuk tidak menyalahgunakan platform ini." },
  { h: "3. Kandungan Pengguna", p: "Sebarang maklumat yang anda kongsi mestilah benar dan tepat. Anda bertanggungjawab atas kandungan yang anda hantar." },
  { h: "4. Bukan Khidmat Kecemasan", p: "Kamar Empati dan program kami bukan pengganti rawatan perubatan kecemasan. Jika anda dalam krisis, sila hubungi Talian Kasih 15999 atau Befrienders 03-7627 2929." },
  { h: "5. Derma", p: "Semua derma adalah sukarela. Derma bulanan boleh dibatalkan pada bila-bila masa. Resit akan dikeluarkan atas permintaan." },
  { h: "6. Harta Intelek", p: "Semua kandungan, logo dan reka bentuk di laman ini adalah hak milik NGO Empati melainkan dinyatakan sebaliknya." },
  { h: "7. Had Liabiliti", p: "NGO Empati tidak bertanggungjawab atas sebarang kerugian akibat penggunaan laman web ini di luar kawalan munasabah kami." },
  { h: "8. Hubungi", p: "Sebarang pertanyaan mengenai terma ini boleh dihantar melalui halaman Hubungi kami." },
];

export default function TermaPage() {
  return (
    <>
      <PageHeader eyebrow="Undang-undang" title="Terma Penggunaan" description="Kemas kini terakhir: Jun 2026" />
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

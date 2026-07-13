import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getSettings } from "@/lib/settings";

export async function CTASection() {
  const s = await getSettings();
  return (
    <section className="container py-20 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-ember-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow justify-center text-gold-300">Sertai keluarga Empati</p>
          <h2 className="mt-4 text-3xl font-extrabold text-cream sm:text-4xl">
            Setiap tindakan kecil boleh jadi harapan besar buat seseorang.
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            Jadilah sebahagian daripada gerakan kesihatan mental paling mesra di Malaysia
            sebagai sukarelawan, ahli, atau penyumbang.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/sukarelawan" variant="primary" size="lg">
              Jadi Sukarelawan <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href={s.whatsapp_community}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg border border-white/20 bg-white/5 text-cream hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> Sertai Komuniti WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

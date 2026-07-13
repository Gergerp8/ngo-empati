import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi NGO Empati untuk pertanyaan, sokongan atau kerjasama. Kami sentiasa sedia mendengar.",
};

export default async function HubungiPage() {
  const s = await getSettings();
  return (
    <>
      <PageHeader
        eyebrow="Hubungi Kami"
        title={<>Kami sentiasa <span className="text-gradient-gold">mendengar</span></>}
        description="Ada pertanyaan, cadangan atau sekadar ingin menyapa? Hubungi kami melalui borang di bawah atau saluran rasmi kami."
      />

      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_0.85fr] lg:py-20">
        <Reveal className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink">Hantar mesej</h2>
          <p className="mt-1 text-sm text-ink-muted">Isi borang dan kami akan membalas secepat mungkin.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal className="card p-6">
            <h3 className="font-bold text-ink">Maklumat hubungan</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <ContactRow icon={<Mail className="h-5 w-5" />} label="E-mel" value={s.email} href={`mailto:${s.email}`} />
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Telefon" value={s.phone} href={`tel:${s.phone.replace(/\s/g, "")}`} />
              <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="Sembang dengan kami" href={`https://wa.me/${s.whatsapp}`} />
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Lokasi" value={s.address} />
              <ContactRow icon={<Instagram className="h-5 w-5" />} label="Instagram" value="Ikuti kami" href={s.instagram} />
            </ul>
          </Reveal>

          <Reveal className="overflow-hidden rounded-3xl border border-line shadow-soft">
            <iframe
              src={site.mapsEmbed}
              title="Lokasi NGO Empati"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600">{icon}</span>
      <span>
        <span className="block text-xs text-ink-muted">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold-700">{inner}</a>
      ) : (
        <span className="flex items-center gap-3">{inner}</span>
      )}
    </li>
  );
}

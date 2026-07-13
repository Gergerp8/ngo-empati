"use client";

import { useActionState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { TextField } from "@/components/forms/fields";
import { saveSettings, type SettingsState } from "../actions";
import type { SiteSettings } from "@/lib/settings";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(saveSettings, null);

  return (
    <form action={formAction} className="space-y-6">
      <Section title="Maklumat hubungan" description="Dipaparkan di footer, halaman Hubungi dan butang WhatsApp.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nombor telefon" name="phone" defaultValue={settings.phone} placeholder="+60 1X-XXX XXXX" />
          <TextField label="E-mel" name="email" type="email" defaultValue={settings.email} placeholder="hello@ngoempati.org" />
          <TextField
            label="WhatsApp (nombor sahaja)" name="whatsapp" defaultValue={settings.whatsapp}
            placeholder="60111234567" helper="Format antarabangsa tanpa + atau ruang, cth. 60111234567"
          />
          <TextField label="Pautan komuniti WhatsApp" name="whatsapp_community" defaultValue={settings.whatsapp_community} placeholder="https://chat.whatsapp.com/..." />
        </div>
        <TextField label="Alamat" name="address" defaultValue={settings.address} placeholder="Kuala Lumpur, Malaysia" />
      </Section>

      <Section title="Media sosial" description="Pautan penuh ke profil rasmi.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Instagram" name="instagram" defaultValue={settings.instagram} />
          <TextField label="Facebook" name="facebook" defaultValue={settings.facebook} />
          <TextField label="YouTube" name="youtube" defaultValue={settings.youtube} />
          <TextField label="TikTok" name="tiktok" defaultValue={settings.tiktok} />
        </div>
      </Section>

      <Section title="Butiran derma" description="Dipaparkan di halaman Derma dan pengiraan sasaran bulanan.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nama bank" name="bank_name" defaultValue={settings.bank_name} />
          <TextField label="Nama akaun" name="account_name" defaultValue={settings.account_name} />
          <TextField label="Nombor akaun" name="account_number" defaultValue={settings.account_number} />
          <TextField label="Rujukan derma" name="donation_reference" defaultValue={settings.donation_reference} />
          <TextField
            label="Sasaran bulanan (RM)" name="monthly_target" type="number" min={1}
            defaultValue={String(settings.monthly_target)}
          />
        </div>
      </Section>

      {state?.error && (
        <p className="rounded-xl bg-ember-500/10 px-4 py-2.5 text-sm font-medium text-ember-600" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="flex items-center gap-2 rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-gold-800" role="status">
          <CheckCircle2 className="h-4 w-4" /> Tetapan disimpan. Laman awam telah dikemas kini.
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-lg btn-primary">
        {pending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan…</>) : (<><Save className="h-4 w-4" /> Simpan Tetapan</>)}
      </button>
    </form>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <h2 className="font-bold text-ink">{title}</h2>
      <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

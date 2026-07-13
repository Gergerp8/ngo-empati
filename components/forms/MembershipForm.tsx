"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { TextField, SelectField, Checkbox } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";
import { Button } from "@/components/ui/Button";

export function MembershipForm() {
  const { status, error, submit } = useSubmit("/api/membership");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Selamat datang ke keluarga Empati! 💛"
        message="Pendaftaran keahlian Ahli Empati anda telah diterima. Kami akan menghubungi anda untuk langkah seterusnya dan kad keahlian digital anda."
      >
        <Button href="/program" variant="ghost" size="md">Lihat program kami</Button>
      </SuccessState>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const next: Record<string, string> = {};
    if (!data.name) next.name = "Sila masukkan nama anda.";
    if (!data.email) next.email = "Sila masukkan e-mel anda.";
    if (!data.phone) next.phone = "Sila masukkan nombor telefon.";
    if (!data.consent) next.consent = "Sila bersetuju untuk meneruskan.";
    setErrors(next);
    if (Object.keys(next).length === 0) submit(data);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nama penuh" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
        <TextField label="Nombor telefon" name="phone" type="tel" required placeholder="01X-XXX XXXX" error={errors.phone} autoComplete="tel" />
      </div>
      <TextField label="Alamat e-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Bandar / Negeri" name="location" placeholder="cth. Shah Alam, Selangor" />
        <SelectField label="Bagaimana anda mengenali kami?" name="referral" defaultValue="">
          <option value="" disabled>Pilih satu</option>
          <option value="media-sosial">Media sosial</option>
          <option value="rakan">Rakan / keluarga</option>
          <option value="program">Program Empati</option>
          <option value="media">Liputan media</option>
          <option value="lain">Lain-lain</option>
        </SelectField>
      </div>
      <Checkbox
        name="consent"
        error={errors.consent}
        label={<>Saya bersetuju dengan <a href="/terma" className="font-semibold text-gold-700 underline">Terma Penggunaan</a> dan <a href="/privasi" className="font-semibold text-gold-700 underline">Dasar Privasi</a>.</>}
      />
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menghantar…</>) : (<>Daftar Keahlian <ArrowRight className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}

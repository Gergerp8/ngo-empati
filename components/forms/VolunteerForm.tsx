"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { TextField, TextArea, SelectField, Checkbox } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";
import { Button } from "@/components/ui/Button";

export function VolunteerForm() {
  const { status, error, submit } = useSubmit("/api/volunteer");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Permohonan diterima! 🌱"
        message="Terima kasih! Pasukan kami akan menyemak permohonan anda dan menghubungi anda melalui e-mel atau telefon untuk langkah seterusnya."
      >
        <Button href="/" variant="ghost" size="md">Kembali ke laman utama</Button>
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
    if (!data.availability) next.availability = "Pilih ketersediaan anda.";
    if (!data.consent) next.consent = "Sila bersetuju dengan terma untuk meneruskan.";
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
        <SelectField label="Ketersediaan" name="availability" required error={errors.availability} defaultValue="">
          <option value="" disabled>Pilih satu</option>
          <option value="hujung-minggu">Hujung minggu</option>
          <option value="hari-bekerja">Hari bekerja</option>
          <option value="fleksibel">Fleksibel</option>
          <option value="acara-tertentu">Acara tertentu sahaja</option>
        </SelectField>
        <SelectField label="Bidang minat" name="interest" defaultValue="umum">
          <option value="umum">Sokongan am</option>
          <option value="acara">Pengurusan acara</option>
          <option value="media">Media & kreatif</option>
          <option value="psikososial">Sokongan psikososial</option>
          <option value="logistik">Logistik & bantuan</option>
        </SelectField>
      </div>
      <TextArea label="Kenapa anda ingin menyertai Empati?" name="motivation" placeholder="Kongsi sedikit tentang diri anda (pilihan)" helper="Tidak wajib, tetapi membantu kami mengenali anda." />
      <Checkbox
        name="consent"
        error={errors.consent}
        label={<>Saya mengesahkan saya berada dalam keadaan mental & fizikal yang stabil dan bersetuju dengan <a href="/privasi" className="font-semibold text-gold-700 underline">Dasar Privasi</a>.</>}
      />
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menghantar…</>) : (<>Hantar Permohonan <ArrowRight className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}

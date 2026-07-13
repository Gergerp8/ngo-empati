"use client";

import { useState } from "react";
import { Loader2, Handshake } from "lucide-react";
import { TextField, TextArea, SelectField } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";

export function PartnershipForm() {
  const { status, error, submit } = useSubmit("/api/partnership");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Permintaan diterima! 🤝"
        message="Terima kasih atas minat untuk bekerjasama. Pasukan kerjasama kami akan menghubungi anda untuk membincangkan langkah seterusnya."
      />
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const next: Record<string, string> = {};
    if (!data.organisation) next.organisation = "Sila masukkan nama organisasi.";
    if (!data.contactName) next.contactName = "Sila masukkan nama wakil.";
    if (!data.email) next.email = "Sila masukkan e-mel.";
    if (!data.message) next.message = "Sila terangkan cadangan kerjasama.";
    setErrors(next);
    if (Object.keys(next).length === 0) submit(data);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nama organisasi" name="organisation" required placeholder="cth. Universiti / Syarikat" error={errors.organisation} />
        <TextField label="Nama wakil" name="contactName" required placeholder="Nama anda" error={errors.contactName} autoComplete="name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="E-mel" name="email" type="email" required placeholder="nama@organisasi.com" error={errors.email} autoComplete="email" />
        <SelectField label="Jenis kerjasama" name="type" defaultValue="csr">
          <option value="csr">Kolaborasi CSR</option>
          <option value="research">Kolaborasi penyelidikan</option>
          <option value="university">Kerjasama universiti</option>
          <option value="government">Kerjasama kerajaan</option>
          <option value="speaker">Jemputan penceramah</option>
          <option value="other">Lain-lain</option>
        </SelectField>
      </div>
      <TextArea label="Cadangan kerjasama" name="message" rows={5} required placeholder="Ceritakan tentang cadangan atau keperluan anda…" error={errors.message} />
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menghantar…</>) : (<><Handshake className="h-4 w-4" /> Hantar Permintaan</>)}
      </button>
    </form>
  );
}

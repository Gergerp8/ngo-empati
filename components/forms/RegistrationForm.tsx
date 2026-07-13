"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { TextField } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";

export function RegistrationForm({ programmeId, programmeTitle }: { programmeId: string; programmeTitle: string }) {
  const { status, error, submit } = useSubmit("/api/registration");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Pendaftaran berjaya! 🎉"
        message={`Anda telah didaftarkan untuk "${programmeTitle}". Semak e-mel anda untuk butiran lanjut. Jumpa anda di sana!`}
      />
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
    setErrors(next);
    if (Object.keys(next).length === 0) submit({ ...data, programmeId });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <TextField label="Nama penuh" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="E-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
        <TextField label="Telefon" name="phone" type="tel" required placeholder="01X-XXX XXXX" error={errors.phone} autoComplete="tel" />
      </div>
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Mendaftar…</>) : (<>Daftar Sertai <ArrowRight className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}

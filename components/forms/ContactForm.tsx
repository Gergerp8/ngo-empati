"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { TextField, TextArea } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";

export function ContactForm() {
  const { status, error, submit } = useSubmit("/api/contact");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Mesej dihantar! ✉️"
        message="Terima kasih kerana menghubungi kami. Pasukan Empati akan membalas e-mel anda secepat mungkin."
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
    if (!data.subject) next.subject = "Sila masukkan subjek.";
    if (!data.message) next.message = "Sila tulis mesej anda.";
    setErrors(next);
    if (Object.keys(next).length === 0) submit(data);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nama" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
        <TextField label="E-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
      </div>
      <TextField label="Subjek" name="subject" required placeholder="Apa yang boleh kami bantu?" error={errors.subject} />
      <TextArea label="Mesej" name="message" rows={5} required placeholder="Tulis mesej anda di sini…" error={errors.message} />
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menghantar…</>) : (<><Send className="h-4 w-4" /> Hantar Mesej</>)}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Loader2, CalendarCheck } from "lucide-react";
import { TextField, SelectField, TextArea } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";
import { Button } from "@/components/ui/Button";

const slots = ["09:00", "10:30", "14:00", "15:30", "17:00", "20:00"];

export function BookingForm({ counsellors }: { counsellors: { id: string; name: string }[] }) {
  const { status, error, submit } = useSubmit("/api/booking");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (status === "success") {
    return (
      <SuccessState
        title="Tempahan dihantar! 🗓️"
        message="Kami telah menerima permintaan tempahan anda. Pasukan Kamar Empati akan menghubungi anda untuk mengesahkan sesi. Semuanya kekal sulit."
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
    if (!data.counsellorId) next.counsellorId = "Sila pilih kaunselor.";
    if (!data.date) next.date = "Sila pilih tarikh.";
    if (!data.time) next.time = "Sila pilih slot masa.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      submit({ ...data, slot: `${data.date}T${data.time}` });
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <SelectField label="Pilih kaunselor" name="counsellorId" required error={errors.counsellorId} defaultValue="">
        <option value="" disabled>Pilih kaunselor</option>
        {counsellors.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </SelectField>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Tarikh" name="date" type="date" required min={today} error={errors.date} />
        <SelectField label="Slot masa" name="time" required error={errors.time} defaultValue="">
          <option value="" disabled>Pilih masa</option>
          {slots.map((s) => <option key={s} value={s}>{s}</option>)}
        </SelectField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nama penuh" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
        <TextField label="Nombor telefon" name="phone" type="tel" required placeholder="01X-XXX XXXX" error={errors.phone} autoComplete="tel" />
      </div>
      <TextField label="Alamat e-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
      <TextArea label="Topik yang ingin dibincangkan" name="topic" rows={3} placeholder="Kongsi seberapa banyak yang anda selesa (pilihan & sulit)" />
      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-dark w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Menghantar…</>) : (<><CalendarCheck className="h-4 w-4" /> Tempah Sesi</>)}
      </button>
    </form>
  );
}

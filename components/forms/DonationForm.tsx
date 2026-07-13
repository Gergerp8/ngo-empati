"use client";

import { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import { TextField, Checkbox } from "./fields";
import { useSubmit } from "./useSubmit";
import { SuccessState } from "./SuccessState";
import { Button } from "@/components/ui/Button";
import { cn, formatRM } from "@/lib/utils";

const presets = [20, 50, 100, 250];

export function DonationForm() {
  const { status, error, submit } = useSubmit("/api/donation");
  const [frequency, setFrequency] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const finalAmount = custom ? Number(custom) : amount;

  if (status === "success") {
    return (
      <SuccessState
        title="Terima kasih atas sokongan anda! 💛"
        message={`Terima kasih! Ikrar derma ${frequency === "monthly" ? "bulanan" : "sekali"} sebanyak ${formatRM(finalAmount)} telah direkodkan. Untuk melengkapkan sumbangan, sila buat pindahan ke akaun CIMB kami (butiran di halaman ini) dengan rujukan yang tertera.`}
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
    if (!finalAmount || finalAmount < 1) next.amount = "Sila pilih atau masukkan jumlah yang sah.";
    setErrors(next);
    if (Object.keys(next).length === 0) submit({ ...data, amount: finalAmount, frequency });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Frequency toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-sand p-1.5" role="tablist" aria-label="Kekerapan derma">
        {(["monthly", "once"] as const).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={frequency === f}
            onClick={() => setFrequency(f)}
            className={cn(
              "h-11 rounded-xl text-sm font-semibold transition-all",
              frequency === f ? "bg-white text-ink shadow-soft" : "text-ink-muted hover:text-ink",
            )}
          >
            {f === "monthly" ? "Bulanan" : "Sekali sahaja"}
          </button>
        ))}
      </div>

      {/* Amount presets */}
      <div>
        <p className="mb-2 text-sm font-semibold text-ink">Pilih jumlah (RM)</p>
        <div className="grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => { setAmount(p); setCustom(""); }}
              className={cn(
                "h-12 rounded-xl border text-sm font-bold transition-all",
                !custom && amount === p
                  ? "border-gold-500 bg-gold-50 text-ink shadow-glow"
                  : "border-line bg-white text-ink-soft hover:border-gold-300",
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          placeholder="Atau masukkan jumlah lain"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          aria-label="Jumlah derma tersuai"
          className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
        />
        {errors.amount && <p className="mt-1.5 text-sm font-medium text-ember-600" role="alert">{errors.amount}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Nama penuh" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
        <TextField label="Alamat e-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
      </div>

      <Checkbox name="receipt" label="Saya memerlukan resit derma." />

      {error && <p className="text-sm font-medium text-ember-600" role="alert">{error}</p>}

      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Memproses…</>) : (<><Heart className="h-4 w-4" /> Derma {formatRM(finalAmount || 0)} {frequency === "monthly" ? "/ bulan" : ""}</>)}
      </button>
      <p className="text-center text-xs text-ink-muted">
        Pembayaran selamat melalui ToyyibPay / FPX. Anda boleh batalkan derma bulanan pada bila-bila masa.
      </p>
    </form>
  );
}

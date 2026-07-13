"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, UserPlus, MailCheck } from "lucide-react";
import { TextField, Checkbox } from "@/components/forms/fields";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type Status = "idle" | "submitting" | "sent";

function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return "E-mel ini sudah didaftarkan. Sila log masuk.";
  if (m.includes("password")) return "Kata laluan terlalu lemah (minimum 8 aksara).";
  if (m.includes("invalid") && m.includes("email")) return "Alamat e-mel tidak sah.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Terlalu banyak percubaan. Sila cuba sebentar lagi.";
  return "Pendaftaran gagal. Sila cuba lagi.";
}

export function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(false);

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-gold-200 bg-gold-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-glow">
          <MailCheck className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">Semak e-mel anda 📬</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-muted">
          Kami telah menghantar pautan pengesahan ke{" "}
          <span className="font-semibold text-ink">{email}</span>. Klik pautan itu untuk
          mengaktifkan akaun anda dan mula menyertai Empati.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={resent}
            onClick={async () => {
              const supabase = getSupabaseBrowser();
              if (!supabase) return;
              await supabase.auth.resend({ type: "signup", email });
              setResent(true);
            }}
            className="text-sm font-semibold text-gold-700 hover:underline disabled:opacity-50"
          >
            {resent ? "Pautan baharu telah dihantar" : "Tidak menerima e-mel? Hantar semula"}
          </button>
          <Link href="/log-masuk" className="text-sm text-ink-muted hover:text-ink">
            Kembali ke log masuk
          </Link>
        </div>
        <p className="mt-6 text-xs text-ink-faint">
          Tip: semak folder Spam / Promosi jika e-mel tidak kelihatan.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const em = String(fd.get("email") ?? "").trim();
    const pw = String(fd.get("password") ?? "");
    const pw2 = String(fd.get("password2") ?? "");
    const consent = fd.get("consent");

    const next: Record<string, string> = {};
    if (!name) next.name = "Sila masukkan nama anda.";
    if (!em) next.email = "Sila masukkan e-mel anda.";
    if (pw.length < 8) next.password = "Kata laluan mesti sekurang-kurangnya 8 aksara.";
    if (pw !== pw2) next.password2 = "Kata laluan tidak sepadan.";
    if (!consent) next.consent = "Sila bersetuju untuk meneruskan.";
    setErrors(next);
    if (Object.keys(next).length) return;

    if (!isSupabaseConfigured) {
      setFormError("Supabase belum dikonfigurasi. Sila tambah kunci dalam .env.local.");
      return;
    }

    setStatus("submitting");
    const supabase = getSupabaseBrowser()!;
    const { data, error } = await supabase.auth.signUp({
      email: em,
      password: pw,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setStatus("idle");
      setFormError(friendly(error.message));
      return;
    }

    // If email confirmation is OFF in Supabase, a session is returned → log straight in.
    if (data.session) {
      window.location.href = "/dashboard";
      return;
    }

    setEmail(em);
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <TextField label="Nama penuh" name="name" required placeholder="Nama anda" error={errors.name} autoComplete="name" />
      <TextField label="Alamat e-mel" name="email" type="email" required placeholder="nama@email.com" error={errors.email} autoComplete="email" />
      <TextField label="Kata laluan" name="password" type="password" required placeholder="Minimum 8 aksara" error={errors.password} autoComplete="new-password" />
      <TextField label="Sahkan kata laluan" name="password2" type="password" required placeholder="Taip semula kata laluan" error={errors.password2} autoComplete="new-password" />
      <Checkbox
        name="consent"
        error={errors.consent}
        label={<>Saya bersetuju dengan <Link href="/terma" className="font-semibold text-gold-700 underline">Terma</Link> dan <Link href="/privasi" className="font-semibold text-gold-700 underline">Dasar Privasi</Link>.</>}
      />
      {formError && (
        <p className="rounded-xl bg-ember-500/10 px-4 py-2.5 text-sm font-medium text-ember-600" role="alert">
          {formError}
        </p>
      )}
      <button type="submit" disabled={status === "submitting"} className="btn btn-lg btn-primary w-full">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Mendaftar…</>) : (<><UserPlus className="h-4 w-4" /> Cipta Akaun</>)}
      </button>
    </form>
  );
}

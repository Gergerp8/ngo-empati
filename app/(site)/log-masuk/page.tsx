import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { getSessionProfile } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Log Masuk",
  description: "Log masuk ke akaun NGO Empati anda: sukarelawan, ahli atau pentadbir.",
};

export default async function LogMasukPage() {
  // Already signed in? Go straight to the right dashboard.
  const session = await getSessionProfile();
  if (session) {
    const isAdminRole = ["admin", "super_admin"].includes(session.profile?.role ?? "");
    redirect(isAdminRole ? "/admin" : "/dashboard");
  }

  return (
    <div className="bg-warm-radial">
      <div className="container flex min-h-[calc(100dvh-72px)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <Link href="/" className="inline-block"><Logo /></Link>
            <h1 className="mt-6 text-2xl font-extrabold text-ink">Selamat kembali</h1>
            <p className="mt-1 text-sm text-ink-muted">Log masuk untuk mengakses papan pemuka anda.</p>

            <div className="mt-6">
              <LoginForm />
            </div>

            <p className="mt-6 text-center text-sm text-ink-muted">
              Belum ada akaun?{" "}
              <Link href="/daftar" className="font-semibold text-gold-700 hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-2xl border border-gold-200 bg-gold-50 p-3 text-center text-xs text-ink-muted">
              Mod demo: log masuk memerlukan kunci Supabase dalam <code>.env.local</code>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

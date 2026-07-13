import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { getSessionProfile } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Daftar Akaun",
  description: "Cipta akaun NGO Empati untuk menyertai komuniti, menjejak program dan menyumbang.",
};

export default async function DaftarPage() {
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
            <h1 className="mt-6 text-2xl font-extrabold text-ink">Cipta akaun anda</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Sertai keluarga Empati. Percuma dan hanya mengambil masa seminit.
            </p>

            <div className="mt-6">
              <RegisterForm />
            </div>

            <p className="mt-6 text-center text-sm text-ink-muted">
              Sudah ada akaun?{" "}
              <Link href="/log-masuk" className="font-semibold text-gold-700 hover:underline">
                Log masuk
              </Link>
            </p>
          </div>
          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-2xl border border-gold-200 bg-gold-50 p-3 text-center text-xs text-ink-muted">
              Mod demo: pendaftaran memerlukan kunci Supabase dalam <code>.env.local</code>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

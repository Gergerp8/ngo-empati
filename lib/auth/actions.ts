"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type LoginState = { error?: string } | null;

/** Email/password sign-in via Supabase; redirects by role on success. */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase belum dikonfigurasi. Sila tambah kunci dalam .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Sila isi e-mel dan kata laluan." };

  const supabase = await getSupabaseServer();
  const { data, error } = await supabase!.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return { error: "E-mel atau kata laluan tidak sah." };
  }

  const { data: profile } = await supabase!
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const isAdminRole = ["admin", "super_admin"].includes(profile?.role ?? "");
  redirect(isAdminRole ? "/admin" : "/dashboard");
}

/** Sign out and return to the homepage. */
export async function logoutAction() {
  const supabase = await getSupabaseServer();
  await supabase?.auth.signOut();
  redirect("/");
}

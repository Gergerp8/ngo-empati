"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type AuthUser = { name: string; role: string };

/**
 * Session-aware auth slot for the navbar. Shows "Log Masuk" for guests and
 * "Hai, {name}" (linking to the right dashboard) once signed in. Reads the
 * session client-side so public pages stay statically cached.
 */
export function AuthGreeting({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    let mounted = true;

    async function load() {
      const { data: { session } } = await supabase!.auth.getSession();
      if (!session?.user) {
        if (mounted) setUser(null);
        return;
      }
      const { data: profile } = await supabase!
        .from("profiles")
        .select("name, role")
        .eq("id", session.user.id)
        .single();
      if (mounted) {
        setUser({
          name:
            profile?.name ??
            (session.user.user_metadata?.name as string | undefined) ??
            session.user.email?.split("@")[0] ??
            "Anda",
          role: profile?.role ?? "visitor",
        });
      }
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null);
      else load();
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const href = user
    ? ["admin", "super_admin"].includes(user.role) ? "/admin" : "/dashboard"
    : "/log-masuk";
  const firstName = user?.name.split(" ")[0];

  if (variant === "mobile") {
    if (!user) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <Link href="/log-masuk" className="btn btn-md btn-ghost">Log Masuk</Link>
          <Link href="/daftar" className="btn btn-md btn-dark">Daftar</Link>
        </div>
      );
    }
    return (
      <Link href={href} className="btn btn-md btn-ghost w-full">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-bold text-ink">
          {firstName?.[0]?.toUpperCase()}
        </span>
        Hai, {firstName}
      </Link>
    );
  }

  if (!user) {
    return (
      <>
        <Link
          href="/log-masuk"
          className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          Log Masuk
        </Link>
        <Link href="/daftar" className="btn btn-md btn-ghost">Daftar</Link>
      </>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-ink transition-colors hover:border-gold-300"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-xs font-bold text-ink">
        {firstName?.[0]?.toUpperCase()}
      </span>
      Hai, {firstName}
    </Link>
  );
}

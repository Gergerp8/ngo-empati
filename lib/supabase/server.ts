import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Server-side Supabase client bound to the request cookies.
 * Use in Server Components, Server Actions and Route Handlers.
 * Returns null when Supabase env vars are not configured (demo mode).
 */
export async function getSupabaseServer() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component - middleware refreshes sessions instead.
        }
      },
    },
  });
}

/** Current authenticated user + profile (or null). */
export async function getSessionProfile() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .eq("id", user.id)
    .single();
  return profile ? { user, profile } : { user, profile: null };
}

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Auth callback for email confirmation & magic links.
 * Supabase sends the user here with a `code` after they click the email
 * link; we exchange it for a session (sets cookies) and forward them on.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/log-masuk?error=pengesahan`);
}

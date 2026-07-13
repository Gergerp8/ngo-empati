import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Refreshes the Supabase session on every matched request and guards the
 * protected areas:
 *   /admin      → requires role = admin
 *   /dashboard  → requires any authenticated user
 * When Supabase is not configured, pages render in demo mode unguarded.
 */
export async function middleware(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  const needsAuth = path.startsWith("/admin") || path.startsWith("/dashboard");

  if (needsAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/log-masuk";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/admin") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (!["admin", "super_admin"].includes(profile?.role ?? "")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/log-masuk"],
};

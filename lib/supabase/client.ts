"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/** Browser-side Supabase client (null when env not configured). */
export function getSupabaseBrowser() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

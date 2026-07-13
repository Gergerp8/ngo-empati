import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Service-role client - SERVER ONLY (bypasses RLS).
 * Used by API routes that accept anonymous public submissions.
 * Never import from client components.
 */
export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) return null;
  return createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

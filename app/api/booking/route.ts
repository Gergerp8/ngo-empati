import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Kamar Empati booking → Supabase `bookings` (status = requested).
 * Counsellor ids come from the `counsellors` table (GET below).
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["name", "email", "phone", "counsellorId", "slot"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");
  const slot = new Date(String(body.slot));
  if (Number.isNaN(slot.getTime())) return fail("Slot masa tidak sah.");

  const admin = getSupabaseAdmin();
  // Static demo ids (c1..c3) are used when Supabase is unset; store null then.
  const counsellorId =
    admin && /^[0-9a-f-]{36}$/i.test(String(body.counsellorId)) ? body.counsellorId : null;

  const result = await persist("bookings", {
    counsellor_id: counsellorId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    slot: slot.toISOString(),
    topic: body.topic ?? null,
    status: "requested",
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  return ok("Tempahan anda telah dihantar. Anda akan menerima e-mel pengesahan.", {
    status: "requested",
  });
}

/** List active counsellors (public). */
export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin) return ok("Mod demo", { counsellors: [] });
  const { data } = await admin
    .from("counsellors")
    .select("id, name, specialty, languages")
    .eq("active", true)
    .order("name");
  return ok("OK", { counsellors: data ?? [] });
}

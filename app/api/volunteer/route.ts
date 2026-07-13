import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";

/**
 * Volunteer application intake → Supabase `volunteers` (status = pending).
 * Admin reviews in /admin. Falls back to demo mode when Supabase is unset.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["name", "email", "phone", "availability"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");

  const result = await persist("volunteers", {
    name: body.name,
    email: body.email,
    phone: body.phone,
    availability: body.availability,
    interest: body.interest ?? null,
    motivation: body.motivation ?? null,
    status: "pending",
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  return ok("Permohonan sukarelawan diterima. Pasukan kami akan menyemak dan menghubungi anda.", {
    status: "pending",
  });
}

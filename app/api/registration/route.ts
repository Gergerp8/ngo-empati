import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";

/** Programme registration → Supabase `registrations`. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["name", "email", "phone", "programmeId"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");

  const result = await persist("registrations", {
    programme_id: body.programmeId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  return ok("Pendaftaran program berjaya! Jumpa anda di sana.");
}

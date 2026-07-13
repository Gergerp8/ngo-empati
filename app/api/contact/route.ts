import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";

/** Contact form → Supabase `contacts`. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["name", "email", "subject", "message"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");

  const result = await persist("contacts", {
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  return ok("Mesej anda telah dihantar. Kami akan membalas secepat mungkin.");
}

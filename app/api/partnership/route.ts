import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";

/** Partnership / collaboration request → Supabase `partnerships`. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["organisation", "contactName", "email", "type", "message"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");

  const allowed = ["csr", "research", "university", "government", "speaker", "other"];
  const result = await persist("partnerships", {
    organisation: body.organisation,
    contact_name: body.contactName,
    email: body.email,
    type: allowed.includes(String(body.type)) ? body.type : "other",
    message: body.message,
    status: "new",
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  return ok("Permintaan kerjasama anda telah diterima. Pasukan kami akan menghubungi anda.");
}

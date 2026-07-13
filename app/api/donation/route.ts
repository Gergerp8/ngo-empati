import { revalidateTag } from "next/cache";
import { ok, fail, requireFields, isEmail, persist } from "@/lib/api";

/**
 * Donation intent → Supabase `donations` (status = pending).
 * Payment-gateway step: create a ToyyibPay bill here and return its
 * redirect URL; mark the row `paid` from the webhook callback.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const missing = requireFields(body, ["name", "email", "amount", "frequency"]);
  if (missing.length) return fail(`Medan wajib tidak lengkap: ${missing.join(", ")}`);
  if (!isEmail(body.email)) return fail("Alamat e-mel tidak sah.");
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 1) return fail("Jumlah derma tidak sah.");

  const reference = `EMP-${Date.now().toString().slice(-8)}`;
  const result = await persist("donations", {
    donor_name: body.name,
    email: body.email,
    amount,
    frequency: body.frequency === "monthly" ? "monthly" : "once",
    reference,
    provider: "manual",
    status: "pending",
    receipt_requested: Boolean(body.receipt),
  });
  if (result !== "ok" && result !== "demo") return fail("Ralat pangkalan data. Sila cuba lagi.", 500);

  if (result === "ok") revalidateTag("donations"); // refresh the public impact counters

  return ok("Terima kasih! Permintaan derma anda telah direkodkan.", { reference });
}

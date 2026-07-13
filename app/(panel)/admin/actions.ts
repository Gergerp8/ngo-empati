"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getSupabaseServer, getSessionProfile } from "@/lib/supabase/server";

/** Guard: throws unless the caller is an authenticated admin or super admin. */
async function requireAdmin() {
  const session = await getSessionProfile();
  if (!session || !["admin", "super_admin"].includes(session.profile?.role ?? "")) {
    throw new Error("Tidak dibenarkan.");
  }
  return getSupabaseServer();
}

/** Guard: throws unless the caller is a super admin. */
async function requireSuperAdmin() {
  const session = await getSessionProfile();
  if (!session || session.profile?.role !== "super_admin") {
    throw new Error("Hanya super admin dibenarkan.");
  }
  return { supabase: await getSupabaseServer(), selfId: session.user.id };
}

// ── Admin: application triage ─────────────────────────────────────────

export async function setVolunteerStatus(id: string, status: "approved" | "rejected") {
  const supabase = await requireAdmin();
  await supabase!
    .from("volunteers")
    .update({ status, approved_at: status === "approved" ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin");
}

export async function setPartnershipStatus(id: string, status: "in_review" | "accepted" | "declined") {
  const supabase = await requireAdmin();
  await supabase!.from("partnerships").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function setBookingStatus(id: string, status: "confirmed" | "cancelled") {
  const supabase = await requireAdmin();
  await supabase!.from("bookings").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function markContactHandled(id: string) {
  const supabase = await requireAdmin();
  await supabase!.from("contacts").update({ handled: true }).eq("id", id);
  revalidatePath("/admin");
}

// ── Super admin: role management ──────────────────────────────────────

const ASSIGNABLE_ROLES = ["visitor", "volunteer", "member", "admin", "super_admin"] as const;
export type AssignableRole = (typeof ASSIGNABLE_ROLES)[number];

export async function updateUserRole(userId: string, role: AssignableRole) {
  const { supabase, selfId } = await requireSuperAdmin();
  if (!ASSIGNABLE_ROLES.includes(role)) throw new Error("Peranan tidak sah.");
  // Never let a super admin demote themselves and lock everyone out.
  if (userId === selfId && role !== "super_admin") {
    throw new Error("Anda tidak boleh menurunkan peranan akaun sendiri.");
  }
  const { error } = await supabase!.from("profiles").update({ role }).eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/pengguna");
}

// ── Super admin: site settings ────────────────────────────────────────

export type SettingsState = { ok?: boolean; error?: string } | null;

export async function saveSettings(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  try {
    const { supabase } = await requireSuperAdmin();
    const fields = [
      "phone", "email", "whatsapp", "whatsapp_community", "address",
      "instagram", "facebook", "youtube", "tiktok",
      "bank_name", "account_name", "account_number", "donation_reference",
    ] as const;

    const update: Record<string, string | number> = {};
    for (const f of fields) {
      const v = String(formData.get(f) ?? "").trim();
      if (v) update[f] = v;
    }
    const target = Number(formData.get("monthly_target"));
    if (Number.isFinite(target) && target > 0) update.monthly_target = target;

    const { error } = await supabase!
      .from("site_settings")
      .upsert({ id: 1, ...update }, { onConflict: "id" });
    if (error) return { error: error.message };

    revalidateTag("site-settings");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Ralat tidak dijangka." };
  }
}

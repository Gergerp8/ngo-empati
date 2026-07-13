import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "@/lib/supabase/config";
import { site, donation } from "@/lib/site";

/**
 * Site-wide editable settings, managed by the super admin at /admin/tetapan.
 * Reads the single `site_settings` row via PostgREST with ISR caching;
 * falls back to the static defaults in lib/site.ts when Supabase is unset
 * or the row is missing. Revalidated via revalidateTag("site-settings").
 */

export type SiteSettings = {
  phone: string;
  email: string;
  whatsapp: string;
  whatsapp_community: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  donation_reference: string;
  monthly_target: number;
};

export const defaultSettings: SiteSettings = {
  phone: site.phone,
  email: site.email,
  whatsapp: site.whatsapp,
  whatsapp_community: site.whatsappCommunity,
  address: site.address,
  instagram: site.socials.instagram,
  facebook: site.socials.facebook,
  youtube: site.socials.youtube,
  tiktok: site.socials.tiktok,
  bank_name: donation.bankName,
  account_name: donation.accountName,
  account_number: donation.accountNumber,
  donation_reference: donation.reference,
  monthly_target: donation.monthlyTarget,
};

/**
 * Live total of non-failed donations (RM), server-side via service role
 * (the donations table is admin-only under RLS). Falls back to the static
 * sample when Supabase is unset. Cached for 2 minutes.
 */
export async function getDonationRaised(): Promise<number> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured || !serviceKey) return donation.monthlyRaised;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/donations?status=neq.failed&select=amount`,
      {
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        next: { revalidate: 120, tags: ["donations"] },
      },
    );
    if (!res.ok) return donation.monthlyRaised;
    const rows = (await res.json()) as { amount: number }[];
    return rows.reduce((sum, r) => sum + Number(r.amount), 0);
  } catch {
    return donation.monthlyRaised;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return defaultSettings;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?id=eq.1&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 300, tags: ["site-settings"] },
      },
    );
    if (!res.ok) return defaultSettings;
    const rows = (await res.json()) as Partial<SiteSettings>[];
    if (!rows?.[0]) return defaultSettings;
    const row = rows[0];
    return {
      ...defaultSettings,
      ...Object.fromEntries(
        Object.entries(row).filter(([, v]) => v !== null && v !== undefined && v !== ""),
      ),
      monthly_target: Number(row.monthly_target ?? defaultSettings.monthly_target),
    };
  } catch {
    return defaultSettings;
  }
}

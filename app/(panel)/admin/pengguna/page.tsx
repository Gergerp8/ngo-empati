import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSupabaseServer, getSessionProfile } from "@/lib/supabase/server";
import { adminNav } from "../nav";
import { RoleSelect } from "./RoleSelect";

export const metadata: Metadata = {
  title: "Pengguna & Peranan",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const roleLabels: Record<string, string> = {
  visitor: "Pelawat",
  volunteer: "Sukarelawan",
  member: "Ahli Empati",
  admin: "Admin",
  super_admin: "Super Admin",
};

export default async function PenggunaPage() {
  const session = await getSessionProfile();
  if (session?.profile?.role !== "super_admin") redirect("/admin");

  const supabase = await getSupabaseServer();
  const { data: profiles } = await supabase!
    .from("profiles")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <DashboardShell
      badge="Super Admin"
      title="Pengguna & Peranan"
      subtitle="Urus akaun dan tetapkan peranan setiap pengguna."
      nav={adminNav("pengguna", true)}
    >
      <div className="rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ink">Semua pengguna</h2>
          <span className="text-sm text-ink-muted">{profiles?.length ?? 0} akaun</span>
        </div>

        {profiles?.length ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/60 text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pengguna</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Didaftar</th>
                  <th className="px-4 py-3 font-semibold">Peranan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {profiles.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-ink">{p.name ?? "(tiada nama)"}</p>
                      <p className="text-xs text-ink-muted">{p.email}</p>
                    </td>
                    <td className="hidden px-4 py-3 text-ink-muted sm:table-cell">
                      {new Date(p.created_at).toLocaleDateString("ms-MY", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <RoleSelect
                        userId={p.id}
                        currentRole={p.role}
                        isSelf={p.id === session.user.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded-xl bg-sand/50 p-6 text-center text-sm text-ink-muted">
            Tiada pengguna lagi. Akaun baharu muncul di sini selepas pendaftaran.
          </p>
        )}

        <div className="mt-4 rounded-xl bg-gold-50 p-4 text-xs text-ink-soft">
          <strong className="text-ink">Peranan:</strong>{" "}
          {Object.entries(roleLabels).map(([k, v], i) => (
            <span key={k}>{i > 0 && " · "}{v} (<code>{k}</code>)</span>
          ))}
          . Hanya super admin boleh menukar peranan.
        </div>
      </div>
    </DashboardShell>
  );
}

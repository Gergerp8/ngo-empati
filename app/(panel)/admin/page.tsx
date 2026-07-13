import type { Metadata } from "next";
import { Users, TrendingUp, Wallet, Inbox, HeartHandshake } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { getSupabaseServer, getSessionProfile } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { donation } from "@/lib/site";
import { formatRM } from "@/lib/utils";
import { ApproveButtons, PartnershipButtons, ContactHandledButton } from "./RowActions";
import { adminNav } from "./nav";

export const metadata: Metadata = {
  title: "Papan Pemuka Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PendingVolunteer = { id: string; name: string; email: string; availability: string; created_at: string };
type PendingPartnership = { id: string; organisation: string; contact_name: string; email: string; type: string };
type ContactRow = { id: string; name: string; subject: string; created_at: string };

async function loadData() {
  if (!isSupabaseConfigured) return null;
  const supabase = await getSupabaseServer();
  if (!supabase) return null;

  const [volunteers, members, donations, registrations, pendingVols, pendingParts, contacts, bookings] =
    await Promise.all([
      supabase.from("volunteers").select("id", { count: "exact", head: true }),
      supabase.from("members").select("id", { count: "exact", head: true }),
      supabase.from("donations").select("amount, frequency, status"),
      supabase.from("registrations").select("id", { count: "exact", head: true }),
      supabase.from("volunteers").select("id, name, email, availability, created_at").eq("status", "pending").order("created_at", { ascending: false }).limit(8),
      supabase.from("partnerships").select("id, organisation, contact_name, email, type").eq("status", "new").order("created_at", { ascending: false }).limit(5),
      supabase.from("contacts").select("id, name, subject, created_at").eq("handled", false).order("created_at", { ascending: false }).limit(5),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "requested"),
    ]);

  const donationRows = donations.data ?? [];
  const monthlyRaised = donationRows
    .filter((d) => d.status !== "failed")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  return {
    volunteerCount: volunteers.count ?? 0,
    memberCount: members.count ?? 0,
    registrationCount: registrations.count ?? 0,
    pendingBookings: bookings.count ?? 0,
    monthlyRaised,
    donationCount: donationRows.length,
    pendingVolunteers: (pendingVols.data ?? []) as PendingVolunteer[],
    pendingPartnerships: (pendingParts.data ?? []) as PendingPartnership[],
    unhandledContacts: (contacts.data ?? []) as ContactRow[],
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ms-MY", { day: "numeric", month: "short" });
}

const partnershipLabels: Record<string, string> = {
  csr: "CSR", research: "Penyelidikan", university: "Universiti",
  government: "Kerajaan", speaker: "Penceramah", other: "Lain-lain",
};

export default async function AdminDashboard() {
  const session = await getSessionProfile();
  const isSuper = session?.profile?.role === "super_admin";
  const data = await loadData();
  const raised = data?.monthlyRaised ?? donation.monthlyRaised;
  const pct = Math.min(100, Math.round((raised / donation.monthlyTarget) * 100));

  return (
    <DashboardShell
      badge={isSuper ? "Super Admin" : "Pentadbir"}
      title={session?.profile?.name ? `Hai, ${session.profile.name}` : "Ringkasan"}
      subtitle="Pandangan keseluruhan aktiviti NGO Empati."
      nav={adminNav("ringkasan", isSuper)}
    >
      {!data && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-ink-soft">
          <strong className="text-ink">Mod demo.</strong> Sambungkan Supabase dalam{" "}
          <code>.env.local</code> untuk melihat data sebenar di sini.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Permohonan sukarelawan" value={String(data?.volunteerCount ?? 0)} delta={`${data?.pendingVolunteers.length ?? 0} menunggu`} icon={<Users className="h-4.5 w-4.5" />} accent />
        <StatCard label="Derma terkumpul" value={formatRM(raised)} delta={`${pct}% sasaran bulanan`} icon={<Wallet className="h-4.5 w-4.5" />} />
        <StatCard label="Ahli Empati" value={String(data?.memberCount ?? 0)} icon={<HeartHandshake className="h-4.5 w-4.5" />} />
        <StatCard label="Pendaftaran program" value={String(data?.registrationCount ?? 0)} delta={`${data?.pendingBookings ?? 0} tempahan baru`} icon={<TrendingUp className="h-4.5 w-4.5" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Pending volunteers */}
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">Permohonan sukarelawan menunggu</h2>
            {(data?.pendingVolunteers.length ?? 0) > 0 && (
              <span className="rounded-full bg-ember-500/10 px-2.5 py-0.5 text-xs font-bold text-ember-600">
                {data!.pendingVolunteers.length} baharu
              </span>
            )}
          </div>
          {data?.pendingVolunteers.length ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-sand/60 text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Ketersediaan</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Tarikh</th>
                    <th className="px-4 py-3 font-semibold">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {data.pendingVolunteers.map((v) => (
                    <tr key={v.id}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-ink">{v.name}</p>
                        <p className="text-xs text-ink-muted">{v.email}</p>
                      </td>
                      <td className="hidden px-4 py-3 text-ink-muted sm:table-cell">{v.availability}</td>
                      <td className="hidden px-4 py-3 text-ink-muted sm:table-cell">{fmtDate(v.created_at)}</td>
                      <td className="px-4 py-3"><ApproveButtons id={v.id} name={v.name} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-sand/50 p-6 text-center text-sm text-ink-muted">
              <Inbox className="mx-auto mb-2 h-6 w-6 text-ink-faint" />
              Tiada permohonan menunggu buat masa ini.
            </p>
          )}

          {/* Pending partnerships */}
          <h2 className="mt-8 font-bold text-ink">Permintaan kerjasama baharu</h2>
          {data?.pendingPartnerships.length ? (
            <ul className="mt-3 space-y-2.5">
              {data.pendingPartnerships.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4">
                  <div>
                    <p className="font-semibold text-ink">{p.organisation}</p>
                    <p className="text-xs text-ink-muted">
                      {p.contact_name} · {p.email} ·{" "}
                      <span className="font-semibold text-gold-700">{partnershipLabels[p.type] ?? p.type}</span>
                    </p>
                  </div>
                  <PartnershipButtons id={p.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">Tiada permintaan baharu.</p>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6">
            <h2 className="font-bold text-ink">Derma terkumpul</h2>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-xl font-extrabold text-ink">{formatRM(raised)}</span>
              <span className="text-sm text-ink-muted">/ {formatRM(donation.monthlyTarget)} sasaran</span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-xs text-ink-muted">{data?.donationCount ?? 0} rekod derma</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-bold text-ink">Mesej belum dibalas</h2>
            {data?.unhandledContacts.length ? (
              <ul className="mt-4 space-y-3">
                {data.unhandledContacts.map((c) => (
                  <li key={c.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{c.subject}</p>
                      <p className="text-xs text-ink-muted">{c.name} · {fmtDate(c.created_at)}</p>
                    </div>
                    <ContactHandledButton id={c.id} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">Semua mesej telah dibalas. 🎉</p>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

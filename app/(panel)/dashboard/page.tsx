import type { Metadata } from "next";
import {
  LayoutDashboard, ClipboardList, CalendarCheck, Award, Settings,
  Clock, CheckCircle2, Circle, ArrowRight,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { Icon } from "@/components/ui/Icon";
import { volunteerBadges } from "@/lib/content";
import { getSessionProfile } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Papan Pemuka Sukarelawan",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const nav = [
  { label: "Ringkasan", icon: <LayoutDashboard className="h-4.5 w-4.5" />, active: true },
  { label: "Tugasan Saya", icon: <ClipboardList className="h-4.5 w-4.5" /> },
  { label: "Check-in Mingguan", icon: <CalendarCheck className="h-4.5 w-4.5" /> },
  { label: "Pencapaian", icon: <Award className="h-4.5 w-4.5" /> },
  { label: "Tetapan", icon: <Settings className="h-4.5 w-4.5" /> },
];

const tasks = [
  { title: "Bantu sediakan ruang Lepak & Luah", project: "Lepak & Luah", due: "Sabtu ini", done: false },
  { title: "Kemas kini senarai peserta", project: "Advokasi Juvana", due: "12 Jul", done: false },
  { title: "Hadiri taklimat sukarelawan", project: "Umum", due: "Selesai", done: true },
];

export default async function VolunteerDashboard() {
  const session = await getSessionProfile();
  const firstName = session?.profile?.name?.split(" ")[0] ?? "Sukarelawan";
  return (
    <DashboardShell
      badge="Sukarelawan"
      title={`Hai, ${firstName} 👋`}
      subtitle="Terima kasih kerana menyumbang. Inilah ringkasan anda minggu ini."
      nav={nav}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Jumlah jam" value="64 jam" delta="+6 minggu ini" icon={<Clock className="h-4.5 w-4.5" />} accent />
        <StatCard label="Projek aktif" value="3" icon={<ClipboardList className="h-4.5 w-4.5" />} />
        <StatCard label="Check-in" value="8 / 10" delta="80% konsisten" icon={<CalendarCheck className="h-4.5 w-4.5" />} />
        <StatCard label="Lencana" value="2" icon={<Award className="h-4.5 w-4.5" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Tasks */}
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">Tugasan saya</h2>
            <span className="text-sm font-semibold text-gold-700">Lihat semua</span>
          </div>
          <ul className="mt-4 space-y-3">
            {tasks.map((t) => (
              <li key={t.title} className="flex items-center gap-3 rounded-xl border border-line p-4">
                {t.done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-600" /> : <Circle className="h-5 w-5 shrink-0 text-ink-faint" />}
                <div className="min-w-0 flex-1">
                  <p className={t.done ? "font-medium text-ink-faint line-through" : "font-medium text-ink"}>{t.title}</p>
                  <p className="text-xs text-ink-muted">{t.project}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-ink-muted">{t.due}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly check-in */}
        <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6">
          <h2 className="font-bold text-ink">Check-in mingguan</h2>
          <p className="mt-1 text-sm text-ink-muted">Bagaimana perasaan anda minggu ini?</p>
          <div className="mt-4 flex justify-between">
            {["😞", "😐", "🙂", "😊", "🤩"].map((e) => (
              <button key={e} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-soft transition-transform hover:scale-110" aria-label={`Mood ${e}`}>
                {e}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Kongsi sedikit tentang minggu anda (pilihan)…"
            rows={3}
            className="mt-4 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
          />
          <button className="btn btn-md btn-primary mt-3 w-full">Hantar Check-in <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6 rounded-2xl border border-line bg-white p-6">
        <h2 className="font-bold text-ink">Lencana pencapaian</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {volunteerBadges.map((b, i) => (
            <div key={b.name} className={`rounded-2xl border p-4 text-center ${i < 2 ? "border-gold-200 bg-gold-50" : "border-line bg-sand/40 opacity-60"}`}>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold-600 shadow-soft">
                <Icon name={b.icon} className="h-5 w-5" />
              </div>
              <p className="mt-2 text-xs font-bold text-ink">{b.name}</p>
              <p className="text-[11px] text-ink-muted">{i < 2 ? "Diperoleh" : b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

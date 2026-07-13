import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSessionProfile } from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";
import { adminNav } from "../nav";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: "Tetapan Laman",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function TetapanPage() {
  const session = await getSessionProfile();
  if (session?.profile?.role !== "super_admin") redirect("/admin");

  const settings = await getSettings();

  return (
    <DashboardShell
      badge="Super Admin"
      title="Tetapan Laman"
      subtitle="Kemas kini maklumat hubungan, media sosial dan butiran derma. Perubahan terus dipaparkan di laman awam."
      nav={adminNav("tetapan", true)}
    >
      <SettingsForm settings={settings} />
    </DashboardShell>
  );
}

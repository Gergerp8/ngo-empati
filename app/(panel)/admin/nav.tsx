import { LayoutDashboard, Users, UserCog, Settings } from "lucide-react";
import type { DashNav } from "@/components/dashboard/DashboardShell";

/**
 * Sidebar navigation for the admin area. Super admins additionally see
 * user/role management and site settings.
 */
export function adminNav(active: "ringkasan" | "pengguna" | "tetapan", isSuper: boolean): DashNav[] {
  const items: DashNav[] = [
    {
      label: "Ringkasan",
      href: "/admin",
      icon: <LayoutDashboard className="h-4.5 w-4.5" />,
      active: active === "ringkasan",
    },
  ];
  if (isSuper) {
    items.push(
      {
        label: "Pengguna & Peranan",
        href: "/admin/pengguna",
        icon: <UserCog className="h-4.5 w-4.5" />,
        active: active === "pengguna",
      },
      {
        label: "Tetapan Laman",
        href: "/admin/tetapan",
        icon: <Settings className="h-4.5 w-4.5" />,
        active: active === "tetapan",
      },
    );
  } else {
    items.push({ label: "Sukarelawan", icon: <Users className="h-4.5 w-4.5" /> });
  }
  return items;
}

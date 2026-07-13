import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth/actions";

export type DashNav = { label: string; icon: React.ReactNode; active?: boolean; href?: string };

export function DashboardShell({
  title,
  subtitle,
  nav,
  badge,
  children,
}: {
  title: string;
  subtitle: string;
  nav: DashNav[];
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-sand/50">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-line bg-white lg:flex lg:flex-col">
          <div className="border-b border-line p-5">
            <Link href="/"><Logo /></Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {nav.map((item) => {
              const cls = cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                item.active ? "bg-gold-50 text-ink" : "text-ink-muted hover:bg-sand hover:text-ink",
              );
              return item.href ? (
                <Link key={item.label} href={item.href} className={cls}>
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className={cn(cls, "cursor-default opacity-60")}>
                  {item.icon}
                  {item.label}
                </span>
              );
            })}
          </nav>
          <div className="border-t border-line p-4">
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-muted hover:bg-sand"
              >
                <LogOut className="h-4.5 w-4.5" /> Log Keluar
              </button>
            </form>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white/80 px-5 py-4 backdrop-blur sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{badge}</p>
              <h1 className="text-xl font-extrabold text-ink">{title}</h1>
              <p className="text-sm text-ink-muted">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-ink">NE</span>
            </div>
          </header>
          <div className="p-5 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

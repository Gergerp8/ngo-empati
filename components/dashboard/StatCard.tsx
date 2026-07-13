import { cn } from "@/lib/utils";

export function StatCard({
  label, value, delta, icon, accent,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl border p-5", accent ? "border-gold-200 bg-gold-50" : "border-line bg-white")}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient text-ink">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-ink">{value}</p>
      {delta && <p className="mt-0.5 text-xs font-semibold text-gold-700">{delta}</p>}
    </div>
  );
}

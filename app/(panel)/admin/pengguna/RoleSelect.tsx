"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { updateUserRole, type AssignableRole } from "../actions";
import { cn } from "@/lib/utils";

const options: { value: AssignableRole; label: string }[] = [
  { value: "visitor", label: "Pelawat" },
  { value: "volunteer", label: "Sukarelawan" },
  { value: "member", label: "Ahli Empati" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

export function RoleSelect({
  userId,
  currentRole,
  isSelf,
}: {
  userId: string;
  currentRole: string;
  isSelf: boolean;
}) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChange(role: AssignableRole) {
    setError(null);
    setSaved(false);
    start(async () => {
      try {
        await updateUserRole(userId, role);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ralat.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <select
          defaultValue={currentRole}
          disabled={pending || isSelf}
          onChange={(e) => onChange(e.target.value as AssignableRole)}
          aria-label="Tukar peranan"
          className={cn(
            "h-9 rounded-lg border border-line bg-white px-2.5 text-sm font-medium text-ink",
            "focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {pending && <Loader2 className="h-4 w-4 animate-spin text-ink-faint" />}
        {saved && <Check className="h-4 w-4 text-gold-600" />}
      </div>
      {isSelf && <p className="mt-1 text-[11px] text-ink-faint">Akaun anda sendiri</p>}
      {error && <p className="mt-1 text-[11px] font-medium text-ember-600">{error}</p>}
    </div>
  );
}

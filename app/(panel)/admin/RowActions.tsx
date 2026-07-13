"use client";

import { useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  setVolunteerStatus,
  setPartnershipStatus,
  markContactHandled,
} from "./actions";

export function ApproveButtons({ id, name }: { id: string; name: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex gap-1.5">
      <button
        disabled={pending}
        onClick={() => start(() => setVolunteerStatus(id, "approved"))}
        className="rounded-lg bg-gold-500 px-2.5 py-1 text-xs font-bold text-ink transition-colors hover:bg-gold-400 disabled:opacity-50"
        aria-label={`Lulus ${name}`}
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Lulus"}
      </button>
      <button
        disabled={pending}
        onClick={() => start(() => setVolunteerStatus(id, "rejected"))}
        className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink-muted transition-colors hover:border-ember-500 hover:text-ember-600 disabled:opacity-50"
        aria-label={`Tolak ${name}`}
      >
        Tolak
      </button>
    </div>
  );
}

export function PartnershipButtons({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex gap-1.5">
      <button
        disabled={pending}
        onClick={() => start(() => setPartnershipStatus(id, "in_review"))}
        className="rounded-lg bg-gold-500 px-2.5 py-1 text-xs font-bold text-ink transition-colors hover:bg-gold-400 disabled:opacity-50"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Semak"}
      </button>
      <button
        disabled={pending}
        onClick={() => start(() => setPartnershipStatus(id, "declined"))}
        className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink-muted transition-colors hover:border-ember-500 hover:text-ember-600 disabled:opacity-50"
      >
        Tolak
      </button>
    </div>
  );
}

export function ContactHandledButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(() => markContactHandled(id))}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-gold-400 hover:text-gold-700 disabled:opacity-50"
      aria-label="Tanda selesai"
      title="Tanda selesai"
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
    </button>
  );
}

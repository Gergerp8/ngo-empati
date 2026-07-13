"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { TextField } from "@/components/forms/fields";
import { loginAction, type LoginState } from "@/lib/auth/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <TextField label="E-mel" name="email" type="email" required placeholder="nama@email.com" autoComplete="email" />
      <TextField label="Kata laluan" name="password" type="password" required placeholder="••••••••" autoComplete="current-password" />
      {state?.error && (
        <p className="rounded-xl bg-ember-500/10 px-4 py-2.5 text-sm font-medium text-ember-600" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-lg btn-primary w-full">
        {pending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Log masuk…</>) : (<><LogIn className="h-4 w-4" /> Log Masuk</>)}
      </button>
    </form>
  );
}

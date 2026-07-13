"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Handles form submission lifecycle against a stub API route.
 * Returns status + an error message and a submit() that takes a payload.
 */
export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: Record<string, unknown>) {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.message || "Penghantaran gagal. Sila cuba lagi.");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Ralat tidak dijangka berlaku.");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
  }

  return { status, error, submit, reset };
}

import { NextResponse } from "next/server";
import type { ApiResult } from "@/lib/types";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Insert a row into a Supabase table using the service-role client.
 * Returns:  "demo"  - Supabase not configured (form still shows success),
 *           "ok"    - row persisted,
 *           string  - error message from the database.
 */
export async function persist(
  table: string,
  row: Record<string, unknown>,
): Promise<"demo" | "ok" | string> {
  const admin = getSupabaseAdmin();
  if (!admin) return "demo";
  const { error } = await admin.from(table).insert(row);
  if (error) {
    console.error(`[api] insert into ${table} failed:`, error.message);
    return error.message;
  }
  return "ok";
}

export function ok<T>(message: string, data?: T) {
  return NextResponse.json<ApiResult<T>>({ ok: true, message, data });
}

export function fail(message: string, status = 400) {
  return NextResponse.json<ApiResult>({ ok: false, message }, { status });
}

/** Ensure required fields are present; returns a list of missing keys. */
export function requireFields(body: Record<string, unknown>, fields: string[]) {
  return fields.filter((f) => {
    const v = body[f];
    return v === undefined || v === null || v === "";
  });
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v: unknown) => typeof v === "string" && emailRe.test(v);

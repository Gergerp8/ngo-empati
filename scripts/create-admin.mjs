#!/usr/bin/env node
/**
 * Create (or promote) an NGO Empati admin / super admin account.
 *
 * Usage:
 *   node scripts/create-admin.mjs <email> <password> [name] [role]
 *   role: admin (default) | super_admin
 *
 * Requires in .env.local (or environment):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local loader (no extra deps)
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [email, password, name = "Admin Empati", role = "admin"] = process.argv.slice(2);

if (!["admin", "super_admin"].includes(role)) {
  console.error("✗ Peranan mesti 'admin' atau 'super_admin'.");
  process.exit(1);
}

if (!url || !serviceKey) {
  console.error("✗ NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY tidak ditemui dalam .env.local");
  process.exit(1);
}
if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password> [name]");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Create the auth user (confirmed) — or find the existing one.
let userId;
const { data: created, error: createErr } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { name },
});

if (createErr) {
  if (/already/i.test(createErr.message)) {
    console.log("• Pengguna sudah wujud — mengemas kini kata laluan & peranan…");
    const { data: list, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    if (listErr) throw listErr;
    const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!existing) throw new Error("Pengguna tidak ditemui walaupun dilaporkan wujud.");
    userId = existing.id;
    await supabase.auth.admin.updateUserById(userId, { password, email_confirm: true });
  } else {
    throw createErr;
  }
} else {
  userId = created.user.id;
}

// Promote in profiles (trigger may have created the row already).
const { error: upsertErr } = await supabase
  .from("profiles")
  .upsert({ id: userId, email, name, role }, { onConflict: "id" });
if (upsertErr) throw upsertErr;

console.log("✓ Akaun sedia!");
console.log(`  E-mel   : ${email}`);
console.log(`  Peranan : ${role}`);
console.log("  Log masuk di /log-masuk → anda akan diarahkan ke /admin");

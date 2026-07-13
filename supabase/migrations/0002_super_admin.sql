-- ═══════════════════════════════════════════════════════════════════
-- NGO Empati — Super admin role + editable site settings
-- Run AFTER 0001_init.sql.
-- ═══════════════════════════════════════════════════════════════════

-- ── Extend roles with super_admin ────────────────────────────────────
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('visitor', 'volunteer', 'member', 'admin', 'super_admin'));

-- Helper: is the current user a super admin?
create or replace function public.is_super_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin');
$$;

-- Treat super_admin as admin everywhere is_admin() is used.
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  );
$$;

-- Super admin can change anyone's role (regular admins cannot).
drop policy if exists "Profiles: super admin manage" on public.profiles;
create policy "Profiles: super admin manage" on public.profiles
  for update using (public.is_super_admin()) with check (public.is_super_admin());

-- ── Editable site settings (single row) ─────────────────────────────
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  phone text not null default '+60 11-1234 5678',
  email text not null default 'hello@ngoempati.org',
  whatsapp text not null default '60111234567',
  whatsapp_community text not null default 'https://chat.whatsapp.com/',
  address text not null default 'Kuala Lumpur, Malaysia',
  instagram text not null default 'https://instagram.com/ngoempati',
  facebook text not null default 'https://facebook.com/ngoempati',
  youtube text not null default 'https://youtube.com/@ngoempati',
  tiktok text not null default 'https://tiktok.com/@ngoempati',
  bank_name text not null default 'CIMB Bank',
  account_name text not null default 'Kelab Advokasi Pulih Mental',
  account_number text not null default '8605587480',
  donation_reference text not null default 'WEBSITE',
  monthly_target numeric(10,2) not null default 2500,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Anyone may read (the public site renders from this);
-- only super admins may change it.
create policy "Settings: public read" on public.site_settings
  for select using (true);
create policy "Settings: super admin update" on public.site_settings
  for update using (public.is_super_admin()) with check (public.is_super_admin());
create policy "Settings: super admin insert" on public.site_settings
  for insert with check (public.is_super_admin());

-- Seed the single settings row
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- Keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ═══════════════════════════════════════════════════════════════════
-- NGO Empati — Initial schema
-- Run via Supabase SQL Editor or `supabase db push`.
-- ═══════════════════════════════════════════════════════════════════

-- ── Profiles (linked to auth.users) ─────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  email text,
  role text not null default 'visitor' check (role in ('visitor', 'volunteer', 'member', 'admin')),
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles: read own" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles: update own (not role)" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "Profiles: admin read all" on public.profiles
  for select using (public.is_admin());
create policy "Profiles: admin update all" on public.profiles
  for update using (public.is_admin());

-- ── Volunteer applications ──────────────────────────────────────────
create table if not exists public.volunteers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  availability text not null,
  interest text,
  motivation text,
  status text not null default 'pending' check (status in ('pending', 'email_verified', 'approved', 'rejected')),
  total_hours int not null default 0,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

alter table public.volunteers enable row level security;
create policy "Volunteers: public insert" on public.volunteers for insert with check (true);
create policy "Volunteers: admin all" on public.volunteers for all using (public.is_admin());

-- ── Members (Ahli Empati) ────────────────────────────────────────────
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  membership_no text unique,
  name text not null,
  email text not null,
  phone text not null,
  location text,
  referral text,
  status text not null default 'pending' check (status in ('pending', 'active', 'inactive')),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
create policy "Members: public insert" on public.members for insert with check (true);
create policy "Members: admin all" on public.members for all using (public.is_admin());

-- Auto membership number: AE-YYYY-0001
create sequence if not exists membership_seq;
create or replace function public.set_membership_no()
returns trigger language plpgsql as $$
begin
  if new.membership_no is null then
    new.membership_no := 'AE-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('membership_seq')::text, 4, '0');
  end if;
  return new;
end;
$$;
drop trigger if exists members_set_no on public.members;
create trigger members_set_no before insert on public.members
  for each row execute function public.set_membership_no();

-- ── Donations ────────────────────────────────────────────────────────
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  email text not null,
  amount numeric(10, 2) not null check (amount > 0),
  frequency text not null default 'once' check (frequency in ('once', 'monthly')),
  reference text not null,
  provider text not null default 'manual' check (provider in ('toyyibpay', 'fpx', 'manual')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  receipt_requested boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.donations enable row level security;
create policy "Donations: public insert" on public.donations for insert with check (true);
create policy "Donations: admin all" on public.donations for all using (public.is_admin());

-- ── Counsellors + Kamar Empati bookings ─────────────────────────────
create table if not exists public.counsellors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text,
  languages text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.counsellors enable row level security;
create policy "Counsellors: public read active" on public.counsellors for select using (active = true);
create policy "Counsellors: admin all" on public.counsellors for all using (public.is_admin());

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  counsellor_id uuid references public.counsellors (id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  slot timestamptz not null,
  topic text,
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
create policy "Bookings: public insert" on public.bookings for insert with check (true);
create policy "Bookings: admin all" on public.bookings for all using (public.is_admin());

-- ── Programme registrations ─────────────────────────────────────────
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  programme_id text not null,
  name text not null,
  email text not null,
  phone text not null,
  attended boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;
create policy "Registrations: public insert" on public.registrations for insert with check (true);
create policy "Registrations: admin all" on public.registrations for all using (public.is_admin());

-- ── Contact messages ─────────────────────────────────────────────────
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;
create policy "Contacts: public insert" on public.contacts for insert with check (true);
create policy "Contacts: admin all" on public.contacts for all using (public.is_admin());

-- ── Partnership requests ─────────────────────────────────────────────
create table if not exists public.partnerships (
  id uuid primary key default gen_random_uuid(),
  organisation text not null,
  contact_name text not null,
  email text not null,
  type text not null default 'other' check (type in ('csr', 'research', 'university', 'government', 'speaker', 'other')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_review', 'accepted', 'declined')),
  created_at timestamptz not null default now()
);

alter table public.partnerships enable row level security;
create policy "Partnerships: public insert" on public.partnerships for insert with check (true);
create policy "Partnerships: admin all" on public.partnerships for all using (public.is_admin());

-- ── Seed counsellors ─────────────────────────────────────────────────
insert into public.counsellors (name, specialty, languages) values
  ('Kaunselor Aisyah R.', 'Kebimbangan & tekanan', 'BM · English'),
  ('Kaunselor Hafiz M.', 'Kemurungan & daya tahan', 'BM · English'),
  ('Kaunselor Priya N.', 'Hubungan & keluarga', 'BM · English · Tamil')
on conflict do nothing;

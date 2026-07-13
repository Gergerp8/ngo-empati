-- ═══════════════════════════════════════════════════════════════════
-- NGO Empati — Security hardening (run AFTER 0001 + 0002)
--
-- WHY: the app inserts every public form submission through server-side
-- API routes using the SERVICE ROLE key (which bypasses RLS). The old
-- "public insert" RLS policies were therefore unnecessary, and let anyone
-- with the anon key write arbitrary rows directly (e.g. fake "paid"
-- donations to inflate the public counter, or spam any table). We drop
-- them so the ONLY write path is our validated API routes.
-- ═══════════════════════════════════════════════════════════════════

-- Remove the public INSERT policies (writes now go through service role only)
drop policy if exists "Volunteers: public insert"    on public.volunteers;
drop policy if exists "Members: public insert"        on public.members;
drop policy if exists "Donations: public insert"      on public.donations;
drop policy if exists "Bookings: public insert"       on public.bookings;
drop policy if exists "Registrations: public insert"  on public.registrations;
drop policy if exists "Contacts: public insert"       on public.contacts;
drop policy if exists "Partnerships: public insert"   on public.partnerships;

-- Note: RLS remains ENABLED on every table. With no anon policies, the anon
-- role can neither read nor write these tables; only the service role
-- (API routes, which force status='pending' on donations) and admins
-- (via their existing SELECT/ALL policies) can. This closes the donation
-- counter-inflation and table-spam vectors.

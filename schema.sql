-- Island Clash — Supabase schema
-- Voer dit één keer uit in Supabase > SQL Editor.
-- De app gebruikt daarna deze ene state-tabel om alle bestaande ic_* gegevens
-- centraal te bewaren.

create table if not exists public.ic_global_state (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.ic_global_state enable row level security;

-- Prototype/schoolproject: de bestaande custom Island Clash-login moet ook zonder
-- Supabase Auth eerst data kunnen lezen. Beperk dit voor productie met Auth + RLS.
drop policy if exists "Island Clash read state" on public.ic_global_state;
drop policy if exists "Island Clash insert state" on public.ic_global_state;
drop policy if exists "Island Clash update state" on public.ic_global_state;
drop policy if exists "Island Clash delete state" on public.ic_global_state;

create policy "Island Clash read state"
on public.ic_global_state for select
to anon, authenticated
using (true);

create policy "Island Clash insert state"
on public.ic_global_state for insert
to anon, authenticated
with check (true);

create policy "Island Clash update state"
on public.ic_global_state for update
to anon, authenticated
using (true)
with check (true);

create policy "Island Clash delete state"
on public.ic_global_state for delete
to anon, authenticated
using (true);

grant select, insert, update, delete on public.ic_global_state to anon, authenticated;

-- Optioneel: zet Realtime aan als je later live updates wilt.
-- alter publication supabase_realtime add table public.ic_global_state;

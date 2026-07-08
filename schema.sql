-- ═══════════════════════════════════════════════════════════════
--  The Feast Index — Supabase schema
--  Paste this whole file into Supabase → SQL Editor → Run.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Places ──────────────────────────────────────────────────────
create table if not exists places (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  doordash_url text,
  tags         text[] not null default '{}',
  created_at   timestamptz not null default now()
);

-- ── Orders ──────────────────────────────────────────────────────
create table if not exists orders (
  id          uuid primary key default gen_random_uuid(),
  place_id    uuid not null references places(id) on delete cascade,
  person_name text not null,
  price       numeric(10,2) not null check (price > 0),
  weight_lbs  numeric(10,2) not null check (weight_lbs > 0),
  ordered_at  timestamptz not null default now()
);
create index if not exists orders_place_idx on orders(place_id);

-- ── Ratings (one per person per place) ──────────────────────────
create table if not exists ratings (
  id          uuid primary key default gen_random_uuid(),
  place_id    uuid not null references places(id) on delete cascade,
  person_name text not null,
  score       int  not null check (score between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now(),
  unique (place_id, person_name)
);
create index if not exists ratings_place_idx on ratings(place_id);

-- ── People (profiles, created in-app) ───────────────────────────
create table if not exists people (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  accent     text,
  created_at timestamptz not null default now()
);
alter table people enable row level security;
create policy "anon full access - people" on people for all using (true) with check (true);

-- ── Row Level Security ──────────────────────────────────────────
-- Internal tool, no login (name-picker only): allow the anon key to
-- read and write. If this ever holds anything sensitive, tighten this.
alter table places  enable row level security;
alter table orders  enable row level security;
alter table ratings enable row level security;

create policy "anon full access - places"  on places  for all using (true) with check (true);
create policy "anon full access - orders"  on orders  for all using (true) with check (true);
create policy "anon full access - ratings" on ratings for all using (true) with check (true);

-- ── Optional: seed a few places so the app isn't empty ──────────
-- Uncomment to load sample data matching the demo.
-- insert into places (name, doordash_url, tags) values
--   ('Ork Wings',   'https://doordash.com/store/ork-wings-brooklyn',   '{Wings,"Fried Chicken"}'),
--   ('Golden Bowl',  'https://doordash.com/store/golden-bowl-brooklyn', '{Bowls}'),
--   ('Taco Loop',    'https://doordash.com/store/taco-loop-brooklyn',   '{Tacos,Mexican}');

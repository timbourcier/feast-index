# The Feast Index 🍗⚖️

A food ranking system powered by receipts, fishing scales, and questionable amounts of takeout. Find out which restaurants give you the most feast for your dollar.

Log a team order (DoorDash link + price + weight), and the app tracks a **$-per-pound** rate for every place, ranks them, and lets the team browse and rate them. Lower $/lb is better — it's the cost of a pound of that food.

---

## Stack

- **Frontend:** plain HTML / CSS / JS, no build step
- **Backend:** [Supabase](https://supabase.com) (hosted Postgres + auto REST API), called straight from the browser
- **Deploy:** any static host — Vercel recommended

The app runs in **demo mode** (in-memory sample data) until you add your Supabase keys, so you can open it and click around immediately.

---

## Files

| File | What it is |
|---|---|
| `index.html` | App shell |
| `styles.css` | Design system |
| `app.js` | All logic — data layer, screens, interactions |
| `config.js` | **The only file you edit** — Supabase keys, team, tags, milestone |
| `schema.sql` | Paste into Supabase to create the tables |
| `feast-index-preview.html` | Single-file bundle for quick local preview (not needed for deploy) |

---

## Setup (≈10 minutes)

### 1. Create the database
1. Go to [supabase.com](https://supabase.com) → sign in (GitHub works) → **New project**.
2. Once it finishes provisioning, open **SQL Editor**, paste all of `schema.sql`, and **Run**.

### 2. Get your keys
In Supabase → **Settings → API**, copy:
- **Project URL**
- **anon public** key (safe to commit for an internal tool — the tables use permissive policies, no login)

### 3. Wire it up
Open `config.js` and paste both values:
```js
SUPABASE_URL: "https://xxxx.supabase.co",
SUPABASE_ANON_KEY: "eyJhbGci...",
```
While these are blank the app stays in demo mode. Fill them in and it switches to the real shared database — everyone on the link sees the same data.

Also in `config.js`: edit `TEAM` (names in the picker), `TAGS` (the fixed tag list) and `TAG_ICONS` (the emoji shown on each tag's chip and thumbnail — add an entry here whenever you add a new tag), `MILESTONE_GOAL_LBS`, and the `GRADES` cutoffs (now `$/lb` maximums — lower is better, so **S** is the top tier and **D** is the catch-all at the bottom).

### 4. Deploy
Push to your repo, then in Vercel: **Add New → Project → import the repo**. No framework, no build command, output directory is the root. Deploy. That's the shared link you send the team.

For a quick look without deploying, just open `feast-index-preview.html` in a browser (demo data only).

---

## Profiles & badges

Profiles live in the `people` table and are created **inside the app** (Profile tab → New), so adding a teammate no longer means editing `config.js` — the first-run seed just bootstraps the list from `TEAM`. Whoever you pick is remembered on that device (via `localStorage`, which falls back silently if unavailable). Each profile earns badges computed live from the data: First Bite, Bargain Hunter (an S-tier order), Scout (added 3 places), Critic (rated 3), Regular, Heavyweight, Feast Master, and Team MVP (most pounds logged). Tweak thresholds in the `BADGES` array in `app.js`.

## How the ranking works

`$/lb rate = SUM(price) / SUM(weight)` across every order logged for a place — so a place's ranking gets more reliable the more the team orders from it. Lower is better (cheaper per pound of food). The Library shows the order count and a letter grade next to each place, color-coded (gold for S, green for A/A+, blue for B, bronze for C, gray for D), with the top 3 given a bigger, tinted card so the ranking actually reads as a ranking. Ratings are one score per person per place (re-rating overwrites your own).

## Order notes & photos

Since people often order more than once from the same place, each logged order can optionally include:
- **A note** — what was actually in the order (e.g. "2x pad thai, spring rolls"), so old orders stay identifiable even once you've been to a place five times.
- **A photo** — taken or picked at log time. It's resized and compressed in the browser (see `PHOTO_MAX_DIMENSION` / `PHOTO_QUALITY` in `config.js`) and stored as a JPEG data URL directly in the `orders.photo` column — no separate storage bucket to configure. A place's Library/Home thumbnail uses its most recently-photographed order as a cover image, falling back to the tag emoji if none exists yet.

If you already have a live Supabase project from before this update, just re-run `schema.sql` — the `alter table` lines at the bottom add the new `note`/`photo` columns without touching existing data.

## Stats

The Stats tab has a 7 days / 30 days / 90 days / all time picker up top, and everything below it (totals, orders/places counts, the weekly pounds chart, top cuisines, best value pick, and the leaderboard) filters to that window.

## Notes / easy next steps

- **Price and weight conventions:** the app shows a one-time tip (and a "What should I enter here?" link on the Log screen any time after) reminding people to enter the **food cost only** (no delivery fee, service fee, tip, or tax) and to **weigh the order as it arrives**, containers and all.
- **DoorDash links** only auto-fill the place *name* (parsed from the URL slug) — price and weight are always manual from your receipt and scale. DoorDash doesn't expose those.
- Tagging happens once, when a place is first logged; every later order reuses the same place record.
- **Live updates:** the app refetches after each write. If you want screens to update when a *teammate* logs something, add a Supabase realtime subscription that calls `refresh()` + `render()`.

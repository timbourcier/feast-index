// ─────────────────────────────────────────────────────────────
//  The Feast Index — configuration
//  Edit the values below. Everything the team-specific lives here.
// ─────────────────────────────────────────────────────────────

export const CONFIG = {
  // ── Supabase ────────────────────────────────────────────────
  // Leave these blank to run in DEMO MODE (in-memory sample data,
  // resets on refresh, not shared). Fill them in to switch to your
  // real shared database. Get both from your Supabase project under
  // Settings → API. The anon key is safe to commit for an internal
  // tool like this.
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",

  // ── Team (first-run seed) ───────────────────────────────────
  // These profiles are created the first time the app loads. After
  // that, profiles are added and picked inside the app (Profile tab),
  // so you don't need to edit this list to add a teammate.
  TEAM: [
    { name: "Tim",   accent: "#C2473B" },
    { name: "Jamie", accent: "#4B6EA8" },
    { name: "Raj",   accent: "#6E8B5B" },
  ],

  // ── Tags ────────────────────────────────────────────────────
  // Fixed list picked when a place is first added.
  TAGS: [
    "Wings", "Tacos", "Burgers", "Sandwiches", "Pizza", "Bowls",
    "Sushi/Poke", "Chinese", "Indian", "Mexican", "Fried Chicken",
    "Salads", "BBQ", "Noodles/Ramen",
  ],

  // ── Team milestone ──────────────────────────────────────────
  // Cumulative pounds the team is chasing (drives the Home bar).
  MILESTONE_GOAL_LBS: 200,

  // ── Grades ──────────────────────────────────────────────────
  // Ratio (lb/$) thresholds, highest first. First match wins.
  GRADES: [
    { min: 0.40, label: "A+" },
    { min: 0.33, label: "A" },
    { min: 0.27, label: "B" },
    { min: 0.20, label: "C" },
    { min: 0.00, label: "D" },
  ],
};

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
  SUPABASE_URL: "https://ulaotlpkjsakytssfbco.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_V4AK2L-1JAda57NQwySzpw_6NnIsVZ7",

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
    "Tacos", "Burgers", "Sandwiches", "Pizza", "Bowls", "Sushi/Poke",
    "Sushi", "Chinese", "Japanese", "Korean", "Thai", "Vietnamese",
    "Indian", "Mexican", "Mediterranean", "Greek", "Italian", "Pasta",
    "Fried Chicken", "BBQ", "Steak", "Seafood", "Noodles/Ramen", "Curry",
    "Burritos", "Deli", "Salads", "Breakfast", "Halal", "Vegan",
    "Wraps", "Dumplings", "Soup", "Fries", "Hot Dogs", "Middle Eastern",
    "Kebab", "Hawaiian", "Caribbean", "Filipino", "Brunch", "Bagels",
    "Vegetarian", "Smoothies", "Coffee", "Bubble Tea",
  ],

  // ── Tag icons ───────────────────────────────────────────────
  // One emoji per tag above, shown on chips and place thumbnails.
  // Add an entry here whenever you add a tag to TAGS — anything
  // missing falls back to a generic plate icon.
  TAG_ICONS: {
    "Tacos": "🌮", "Burgers": "🍔", "Sandwiches": "🥪", "Pizza": "🍕",
    "Bowls": "🥣", "Sushi/Poke": "🍣", "Sushi": "🍱", "Chinese": "🥡",
    "Japanese": "🍙", "Korean": "🍲", "Thai": "🌶️", "Vietnamese": "🍜",
    "Indian": "🍛", "Mexican": "🌯", "Mediterranean": "🥙", "Greek": "🫒",
    "Italian": "🧀", "Pasta": "🍝", "Fried Chicken": "🍗", "BBQ": "🍖",
    "Steak": "🥩", "Seafood": "🦐", "Noodles/Ramen": "🍜", "Curry": "🍛",
    "Burritos": "🌯", "Deli": "🥖", "Salads": "🥗", "Breakfast": "🍳",
    "Halal": "🕌", "Vegan": "🌱",
    "Wraps": "🫓", "Dumplings": "🥟", "Soup": "🥘", "Fries": "🍟",
    "Hot Dogs": "🌭", "Middle Eastern": "🧆", "Kebab": "🍢", "Hawaiian": "🍍",
    "Caribbean": "🍹", "Filipino": "🍚", "Brunch": "🥞", "Bagels": "🥯",
    "Vegetarian": "🥦", "Smoothies": "🥤", "Coffee": "☕", "Bubble Tea": "🧋",
  },

  // ── Team milestone ──────────────────────────────────────────
  // Cumulative pounds the team is chasing (drives the Home bar).
  MILESTONE_GOAL_LBS: 200,

  // ── Grades ──────────────────────────────────────────────────
  // Cost-per-pound ($/lb) thresholds — lower is better. Listed
  // lowest (best) first; the first bucket an order's $/lb fits
  // under wins. Tune these to your team's real order history.
  GRADES: [
    { max: 7.50,     label: "S"  },
    { max: 9.50,     label: "A+" },
    { max: 11.50,    label: "A"  },
    { max: 14.50,    label: "B"  },
    { max: 18.00,    label: "C"  },
    { max: Infinity, label: "D"  },
  ],
};

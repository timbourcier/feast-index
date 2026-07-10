import { CONFIG } from "./config.js";

/* ═══════════════════════════════════════════════════════════════
   The Feast Index — app logic
   ═══════════════════════════════════════════════════════════════ */

/* ── Icons (feather-ish) ──────────────────────────────────────── */
const I = {
  flame: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  medal: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
  bars: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx="1"/><rect x="12" y="8" width="3" height="10" rx="1"/><rect x="17" y="4" width="3" height="14" rx="1"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.1-6.47L2.6 9.9l6.5-.95z"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-2 1.5-4 1.5-6 0Z"/><path d="m2 16 3-8 3 8c-2 1.5-4 1.5-6 0Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  repeat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.3l4.27-3.67a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.67a1 1 0 0 0 1.52-.3z"/><path d="M5 21h14"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
};

const MERGE_LOGO = "data:image/png;base64,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";

/* ── Utils ────────────────────────────────────────────────────── */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (n) => n.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const money = (n) => "$" + Number(n).toFixed(2);
const ratioStr = (r) => (r > 0 ? r.toFixed(2) : "—");
const costPerLb = (r) => (r > 0 ? "$" + r.toFixed(2) + "/lb" : "—");
const tagIcon = (t) => CONFIG.TAG_ICONS?.[t] || "🍽️";
const tagLabel = (t) => `${tagIcon(t)} ${t}`;
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id-" + Math.random().toString(36).slice(2));

function storeSlug(u) {
  if (!u) return "";
  const m = String(u).match(/store\/([^/?#]+)/i);
  let s = m ? m[1] : String(u).trim().split(/[/?#]/).pop();
  return s.toLowerCase().replace(/-[a-f0-9]{6,}$/, "").replace(/-\d+$/, "");
}
const prettifySlug = (slug) => slug.split("-").filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

function gradeFor(costPerLbRatio) {
  if (!(costPerLbRatio > 0)) return null;
  return (CONFIG.GRADES.find((g) => costPerLbRatio <= g.max) || CONFIG.GRADES[CONFIG.GRADES.length - 1]).label;
}
function gradeClass(label) {
  if (!label) return "";
  if (label === "S") return "g-s";
  if (label.startsWith("A")) return "g-a";
  if (label === "B") return "g-b";
  if (label === "C") return "g-c";
  return "g-d";
}

/* ── Accents & persistence ────────────────────────────────────── */
const ACCENTS = ["#C2473B", "#C79A2E", "#6E8B5B", "#4B6EA8", "#8A5A8C"];
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sandbox: ignore */ } },
};
const accentOf = (name) => DATA.people.find((p) => p.name === name)?.accent || "var(--ink)";

/* ── Per-person aggregation (for badges & profile) ────────────── */
function personAgg(name, data) {
  const os = data.orders.filter((o) => o.person_name === name);
  const totalW = os.reduce((s, o) => s + Number(o.weight_lbs), 0);
  const totalP = os.reduce((s, o) => s + Number(o.price), 0);
  const places = new Set(os.map((o) => o.place_id));
  let founded = 0;
  for (const pid of places) {
    const po = data.orders.filter((o) => o.place_id === pid).sort((a, b) => new Date(a.ordered_at) - new Date(b.ordered_at));
    if (po[0] && po[0].person_name === name) founded++;
  }
  const ratings = data.ratings.filter((r) => r.person_name === name).length;
  const bestRatio = os.reduce((m, o) => {
    const w = Number(o.weight_lbs), p = Number(o.price);
    return Math.min(m, w > 0 ? p / w : Infinity);
  }, Infinity);
  return { orderCount: os.length, totalW, totalP, places: places.size, founded, ratings, bestRatio };
}

function weightRankOf(name, data) {
  const by = {};
  for (const o of data.orders) by[o.person_name] = (by[o.person_name] || 0) + Number(o.weight_lbs);
  const sorted = Object.entries(by).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  const i = sorted.indexOf(name);
  return i < 0 ? null : i + 1;
}

const BADGES = [
  { id: "first",   name: "First Bite",     icon: I.flame,   tier: "bronze", desc: "Log your first order",                calc: (a) => ({ cur: a.orderCount, goal: 1 }) },
  { id: "bargain", name: "Bargain Hunter", icon: I.dollar,  tier: "red",    desc: `Log a ${CONFIG.GRADES[0].label}-tier order ($${CONFIG.GRADES[0].max.toFixed(2)}/lb or better)`, calc: (a) => ({ cur: (a.bestRatio < Infinity && a.bestRatio <= CONFIG.GRADES[0].max) ? 1 : 0, goal: 1, display: a.bestRatio < Infinity ? "$" + a.bestRatio.toFixed(2) + "/lb best" : "—" }) },
  { id: "scout",   name: "Scout",          icon: I.compass, tier: "bronze", desc: "Add 3 new places to the index",       calc: (a) => ({ cur: a.founded, goal: 3 }) },
  { id: "critic",  name: "Critic",         icon: I.star,    tier: "red",    desc: "Rate 3 places",                       calc: (a) => ({ cur: a.ratings, goal: 3 }) },
  { id: "regular", name: "Regular",        icon: I.repeat,  tier: "silver", desc: "Log 5 orders",                        calc: (a) => ({ cur: a.orderCount, goal: 5 }) },
  { id: "heavy",   name: "Heavyweight",    icon: I.scale,   tier: "silver", desc: "Log 50 lbs total",                    calc: (a) => ({ cur: Math.round(a.totalW), goal: 50 }) },
  { id: "master",  name: "Feast Master",   icon: I.trophy,  tier: "gold",   desc: "Log 15 orders",                       calc: (a) => ({ cur: a.orderCount, goal: 15 }) },
  { id: "mvp",     name: "Team MVP",       icon: I.crown,   tier: "gold",   desc: "Log the most pounds on the team",     rank: true },
];

function evalBadge(b, agg, ctx) {
  if (b.rank) { const r = ctx.rank; return { earned: r === 1, sub: r ? "#" + r + " on team" : "—", pct: 0 }; }
  const { cur, goal, display } = b.calc(agg);
  const earned = cur >= goal;
  const pct = Math.min(100, (cur / goal) * 100);
  const sub = earned ? "Earned" : (display != null ? display : cur + " / " + goal);
  return { earned, sub, pct };
}

/* ── Data layer ───────────────────────────────────────────────── */
const isLive = Boolean(CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY);

function makeDemoDB() {
  const daysAgo = (d) => new Date(Date.now() - d * 864e5).toISOString();
  const P = [
    { id: "p1", name: "Ork Wings",   doordash_url: "https://doordash.com/store/ork-wings-brooklyn-10293", tags: ["Wings", "Fried Chicken"], created_at: daysAgo(24) },
    { id: "p2", name: "Golden Bowl",  doordash_url: "https://doordash.com/store/golden-bowl-nyc-88120",    tags: ["Bowls"],                  created_at: daysAgo(21) },
    { id: "p3", name: "Taco Loop",    doordash_url: "https://doordash.com/store/taco-loop-brooklyn-55010", tags: ["Tacos", "Mexican"],       created_at: daysAgo(19) },
    { id: "p4", name: "Ork",          doordash_url: "https://doordash.com/store/ork-brooklyn-33915",       tags: ["Sandwiches"],             created_at: daysAgo(12) },
    { id: "p5", name: "Dragon Wok",   doordash_url: "https://doordash.com/store/dragon-wok-nyc-20417",     tags: ["Chinese"],                created_at: daysAgo(9) },
    { id: "p6", name: "Slice House",  doordash_url: "https://doordash.com/store/slice-house-bk-71188",     tags: ["Pizza"],                  created_at: daysAgo(6) },
    { id: "p7", name: "Green Leaf",   doordash_url: "https://doordash.com/store/green-leaf-nyc-40122",     tags: ["Salads"],                 created_at: daysAgo(3) },
  ];
  const O = [
    { place_id: "p1", person_name: "Tim",   price: 38.50, weight_lbs: 15.8, note: "10pc combo, extra ranch, 2 fries", ordered_at: daysAgo(24) },
    { place_id: "p1", person_name: "Raj",   price: 42.00, weight_lbs: 17.0, ordered_at: daysAgo(4) },
    { place_id: "p2", person_name: "Jamie", price: 45.00, weight_lbs: 14.8, note: "3x chicken bowls, 1 tofu", ordered_at: daysAgo(21) },
    { place_id: "p2", person_name: "Tim",   price: 30.00, weight_lbs: 10.0, ordered_at: daysAgo(7) },
    { place_id: "p3", person_name: "Raj",   price: 34.00, weight_lbs: 9.9,  ordered_at: daysAgo(19) },
    { place_id: "p3", person_name: "Jamie", price: 28.00, weight_lbs: 8.0,  ordered_at: daysAgo(5) },
    { place_id: "p4", person_name: "Tim",   price: 38.50, weight_lbs: 4.2,  ordered_at: daysAgo(12) },
    { place_id: "p5", person_name: "Jamie", price: 52.00, weight_lbs: 12.0, note: "General Tso's, lo mein, dumplings x2", ordered_at: daysAgo(9) },
    { place_id: "p5", person_name: "Raj",   price: 40.00, weight_lbs: 9.5,  ordered_at: daysAgo(2) },
    { place_id: "p6", person_name: "Tim",   price: 33.00, weight_lbs: 8.5,  ordered_at: daysAgo(6) },
    { place_id: "p7", person_name: "Jamie", price: 26.00, weight_lbs: 3.1,  ordered_at: daysAgo(3) },
  ].map((o) => ({ id: uid(), note: null, photo: null, ...o }));
  const R = [
    { place_id: "p1", person_name: "Tim", score: 5 }, { place_id: "p1", person_name: "Raj", score: 5 }, { place_id: "p1", person_name: "Jamie", score: 4 },
    { place_id: "p2", person_name: "Jamie", score: 4 }, { place_id: "p2", person_name: "Tim", score: 5 },
    { place_id: "p3", person_name: "Raj", score: 4 }, { place_id: "p3", person_name: "Jamie", score: 3 },
    { place_id: "p4", person_name: "Tim", score: 3 },
    { place_id: "p5", person_name: "Jamie", score: 4 },
    { place_id: "p6", person_name: "Tim", score: 5 },
    { place_id: "p7", person_name: "Jamie", score: 2 },
  ].map((r) => ({ id: uid(), created_at: daysAgo(2), ...r }));

  const PEOPLE = CONFIG.TEAM.map((m, i) => ({ id: uid(), name: m.name, accent: m.accent || ACCENTS[i % ACCENTS.length], created_at: daysAgo(30) }));

  return {
    live: false,
    async getData() { return { places: [...P], orders: [...O], ratings: [...R], people: [...PEOPLE] }; },
    async addPerson({ name, accent }) { const rec = { id: uid(), name, accent, created_at: new Date().toISOString() }; PEOPLE.push(rec); return rec; },
    async addPlace(p) { const rec = { id: uid(), created_at: new Date().toISOString(), ...p }; P.push(rec); return rec; },
    async addOrder(o) { const rec = { id: uid(), ordered_at: new Date().toISOString(), ...o }; O.push(rec); return rec; },
    async upsertRating({ place_id, person_name, score }) {
      const ex = R.find((r) => r.place_id === place_id && r.person_name === person_name);
      if (ex) { ex.score = score; return ex; }
      const rec = { id: uid(), created_at: new Date().toISOString(), place_id, person_name, score };
      R.push(rec); return rec;
    },
  };
}

async function makeSupabaseDB() {
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  const sb = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  return {
    live: true,
    async getData() {
      const [p, o, r, pe] = await Promise.all([
        sb.from("places").select("*"),
        sb.from("orders").select("*"),
        sb.from("ratings").select("*"),
        sb.from("people").select("*"),
      ]);
      for (const res of [p, o, r, pe]) if (res.error) throw res.error;
      let people = pe.data;
      if (!people.length) {
        const seed = CONFIG.TEAM.map((m, i) => ({ name: m.name, accent: m.accent || ACCENTS[i % ACCENTS.length] }));
        const { data: seeded, error } = await sb.from("people").insert(seed).select();
        if (error) throw error;
        people = seeded;
      }
      return { places: p.data, orders: o.data, ratings: r.data, people };
    },
    async addPerson({ name, accent }) { const { data, error } = await sb.from("people").insert({ name, accent }).select().single(); if (error) throw error; return data; },
    async addPlace(p) { const { data, error } = await sb.from("places").insert(p).select().single(); if (error) throw error; return data; },
    async addOrder(o) { const { data, error } = await sb.from("orders").insert(o).select().single(); if (error) throw error; return data; },
    async upsertRating(r) { const { data, error } = await sb.from("ratings").upsert(r, { onConflict: "place_id,person_name" }).select().single(); if (error) throw error; return data; },
  };
}

/* ── Aggregation ──────────────────────────────────────────────── */
function computeStats(place, orders, ratings) {
  const os = orders.filter((o) => o.place_id === place.id);
  const rs = ratings.filter((r) => r.place_id === place.id);
  const totalW = os.reduce((s, o) => s + Number(o.weight_lbs), 0);
  const totalP = os.reduce((s, o) => s + Number(o.price), 0);
  const ratio = totalW > 0 ? totalP / totalW : 0;
  const avg = rs.length ? rs.reduce((s, r) => s + r.score, 0) / rs.length : 0;
  return { orders: os, ratings: rs, totalW, totalP, ratio, orderCount: os.length, avgRating: avg, ratingCount: rs.length };
}

function rankedPlaces(data) {
  return data.places
    .map((p) => ({ place: p, s: computeStats(p, data.orders, data.ratings) }))
    .filter((x) => x.s.orderCount > 0)
    .sort((a, b) => a.s.ratio - b.s.ratio);
}

/* Most recent order photo logged for a place — used as its "cover" image. */
function placeCoverPhoto(placeId, orders) {
  const withPhotos = orders.filter((o) => o.place_id === placeId && o.photo)
    .sort((a, b) => new Date(b.ordered_at) - new Date(a.ordered_at));
  return withPhotos[0]?.photo || null;
}

/* ── Time ranges (Stats screen) ───────────────────────────────── */
const RANGE_DAYS = { "7d": 7, "30d": 30, "90d": 90, all: null };
const RANGE_LABEL = { "7d": "7 days", "30d": "30 days", "90d": "90 days", all: "All time" };
const RANGE_PERIOD_LABEL = { "7d": "this week", "30d": "this month", "90d": "these 90 days", all: "all time" };
function filterByRange(orders, range) {
  const days = RANGE_DAYS[range];
  if (!days) return orders;
  const cutoff = Date.now() - days * 864e5;
  return orders.filter((o) => new Date(o.ordered_at).getTime() >= cutoff);
}
function buildWeeklyBuckets(orders, range) {
  if (!orders.length) return [];
  const weekMs = 7 * 864e5;
  const count = range === "7d" ? 1 : range === "30d" ? 5 : range === "90d" ? 13 : 12;
  const now = Date.now();
  const buckets = [];
  for (let i = count - 1; i >= 0; i--) {
    const end = now - i * weekMs, start = end - weekMs;
    const lbs = orders.reduce((s, o) => {
      const t = new Date(o.ordered_at).getTime();
      return t > start && t <= end ? s + Number(o.weight_lbs) : s;
    }, 0);
    const label = new Date(start).toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
    buckets.push({ lbs, label });
  }
  return buckets;
}
function chartSVG(weeks) {
  const max = Math.max(...weeks.map((w) => w.lbs), 1);
  const barW = 40, gap = 12, h = 128, baseline = h - 22;
  const totalW = weeks.length * (barW + gap) - gap;
  const bars = weeks.map((wk, i) => {
    const barH = wk.lbs > 0 ? Math.max(5, (wk.lbs / max) * (baseline - 20)) : 0;
    const x = i * (barW + gap), y = baseline - barH;
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="7" fill="var(--red)" opacity="${wk.lbs > 0 ? 1 : 0.15}"/>
      ${wk.lbs > 0 ? `<text x="${x + barW / 2}" y="${y - 7}" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--ink)" font-family="var(--font)">${wk.lbs.toFixed(0)}</text>` : ""}
      <text x="${x + barW / 2}" y="${h - 4}" text-anchor="middle" font-size="10.5" fill="var(--muted)" font-family="var(--font)">${esc(wk.label)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${totalW} ${h}" style="width:${Math.max(totalW, 260)}px;height:${h}px">${bars}</svg>`;
}
function tagBar(tag, w, max) {
  const pct = max > 0 ? Math.min(100, (w / max) * 100) : 0;
  return `<div class="tagbar-row"><div class="lbl"><span>${esc(tagLabel(tag))}</span><span>${w.toFixed(1)} lb</span></div><div class="tagbar-track"><i style="width:${pct}%"></i></div></div>`;
}

/* ── Photo helpers (Log screen) ───────────────────────────────── */
function resizeImage(file) {
  const maxDim = CONFIG.PHOTO_MAX_DIMENSION || 1000;
  const quality = CONFIG.PHOTO_QUALITY || 0.72;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Couldn't read that image"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ── App state ────────────────────────────────────────────────── */
let DB = null;
let DATA = { places: [], orders: [], ratings: [], people: [] };
let currentUser = CONFIG.TEAM[0]?.name || "Guest";
let tab = "home";
const view = { name: "home", placeId: null };
const lib = { tag: null, sort: "ratio" };
const statsUI = { range: "all" };
const profileUI = { creating: false, newName: "", newAccent: ACCENTS[0] };
const logState = { link: "", matchedId: null, newName: "", newTags: [], price: "", weight: "", note: "", photo: null, person: currentUser };

const main = $("#main");
const tabbarEl = $("#tabbar");

async function refresh() { DATA = await DB.getData(); }

/* ── Toast ────────────────────────────────────────────────────── */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ── Navigation ───────────────────────────────────────────────── */
function go(name, opts = {}) {
  view.name = name;
  if (opts.placeId !== undefined) view.placeId = opts.placeId;
  if (["home", "library", "stats", "profile"].includes(name)) tab = name;
  render();
}

function renderTabbar() {
  const tabs = [["home", "Home", I.home], ["library", "Library", I.list], ["stats", "Stats", I.bars], ["profile", "Profile", I.user]];
  tabbarEl.innerHTML = tabs.map(([id, label, icon]) =>
    `<button data-tab="${id}" class="${tab === id ? "active" : ""}">${icon}<span>${label}</span></button>`
  ).join("");
  tabbarEl.querySelectorAll("button").forEach((b) => b.onclick = () => go(b.dataset.tab));
}

/* ── Screens ──────────────────────────────────────────────────── */
function screenHome() {
  const ranked = rankedPlaces(DATA);
  const top = ranked[0];
  const top3 = ranked.slice(0, 3);
  const totalW = DATA.orders.reduce((s, o) => s + Number(o.weight_lbs), 0);
  const goal = CONFIG.MILESTONE_GOAL_LBS;
  const pct = Math.min(100, (totalW / goal) * 100);

  const topCover = top ? placeCoverPhoto(top.place.id, DATA.orders) : null;
  const hero = top ? `
    <div class="hero">
      <div class="glyph ${topCover ? "photo" : ""}">${topCover ? `<img src="${topCover}" alt=""/>` : I.flame}</div>
      <div>
        <div class="k">This week's top pick</div>
        <div class="v">${esc(top.place.name)}</div>
        <div class="pills">
          <span class="pill num">${costPerLb(top.s.ratio)}</span>
          <span class="pill">Grade ${gradeFor(top.s.ratio)}</span>
        </div>
      </div>
    </div>` : "";

  const medalClass = ["m1", "m2", "m3"];
  const podium = top3.length ? `
    <h2 class="section-label">Top 3 this month</h2>
    <div class="podium">
      ${top3.map((x, i) => `
        <div class="cell" data-place="${x.place.id}">
          <div class="medal ${medalClass[i]}">${I.medal}</div>
          <div class="nm">${esc(x.place.name)}</div>
          <div class="rt num">${costPerLb(x.s.ratio)}</div>
          <div style="margin-top:7px"><span class="gbadge sm ${gradeClass(gradeFor(x.s.ratio))}">${gradeFor(x.s.ratio)}</span></div>
        </div>`).join("")}
    </div>` : "";

  main.innerHTML = `
    <div class="app-head">
      <div>
        <h1>The Feast Index</h1>
        <div class="wordmark"><span class="by">by</span><img class="mlogo" src="${MERGE_LOGO}" alt="Merge" /><span class="mword">Merge</span></div>
      </div>
      <button class="avatar" data-tab="profile" style="background:${accentOf(currentUser)}">${esc(initials(currentUser))}</button>
    </div>
    ${DB.live ? "" : `<div style="margin-bottom:14px"><span class="demo-flag">DEMO DATA</span></div>`}
    ${hero || emptyBlock("No orders yet", "Log your first team dinner to start the ranking.")}
    <div class="milestone">
      <div class="glyph">${I.trophy}</div>
      <div class="body">
        <div class="row"><b>Team milestone</b><span class="amt num">${totalW.toFixed(0)} / ${goal} lbs</span></div>
        <div class="track"><i style="width:${pct}%"></i></div>
      </div>
    </div>
    ${podium}
    <button class="btn" id="logBtn">${I.plus} Log an order</button>`;

  main.querySelectorAll("[data-place]").forEach((n) => n.onclick = () => go("detail", { placeId: n.dataset.place }));
  main.querySelector("[data-tab='profile']").onclick = () => go("profile");
  $("#logBtn", main).onclick = openLog;
}

const LOG_TIP_KEY = "feast:seenLogTip";
function showLogTip() {
  if ($("#logTip")) return;
  const el = document.createElement("div");
  el.id = "logTip";
  el.className = "tip-overlay";
  el.innerHTML = `
    <div class="tip-sheet">
      <div class="glyph">${I.info}</div>
      <h2>Before you log an order</h2>
      <div class="tip-item">
        <div class="n">1</div>
        <p><b>Price = food only.</b> Leave out the delivery fee, service fee, tip, and tax — just what the food itself rang up as on the receipt.</p>
      </div>
      <div class="tip-item">
        <div class="n">2</div>
        <p><b>Weigh it as it arrives.</b> Put the whole order on the scale in its bag/containers, don't plate it first.</p>
      </div>
      <button class="btn" id="tipGotIt">Got it</button>
    </div>`;
  document.body.appendChild(el);
  $("#tipGotIt", el).onclick = () => { store.set(LOG_TIP_KEY, "1"); el.remove(); };
}

function photoFieldHTML() {
  return logState.photo
    ? `<div class="photo-preview-wrap"><img src="${logState.photo}" alt="Order photo"/><button type="button" class="photo-remove" id="removePhoto">${I.close}</button></div>`
    : `<label class="photo-add" for="photoInput">${I.camera}<span>Add a photo</span></label>`;
}

function screenLog() {
  const slug = storeSlug(logState.link);
  const matched = slug ? DATA.places.find((p) => storeSlug(p.doordash_url) === slug) : null;
  logState.matchedId = matched ? matched.id : null;

  let placeBlock = "";
  if (logState.link.trim()) {
    if (matched) {
      placeBlock = `<div class="place-strip"><div class="thumb">${matched.tags[0] ? tagIcon(matched.tags[0]) : ""}</div><div><div class="nm">${esc(matched.name)}</div><div class="sub">Matched to existing place</div></div></div>`;
    } else {
      if (!logState.newName) logState.newName = prettifySlug(slug);
      placeBlock = `
        <div class="place-strip"><div class="thumb"></div><div><div class="nm">New place</div><div class="sub">Add the details below</div></div></div>
        <div class="field"><label>Place name</label>
          <div class="input-wrap"><input class="control" id="newName" value="${esc(logState.newName)}" placeholder="Restaurant name"/></div></div>
        <div class="field"><label>Tags</label>
          <div class="chips">${CONFIG.TAGS.map((t) => `<button class="chip ${logState.newTags.includes(t) ? "on" : ""}" data-tag="${esc(t)}">${esc(tagLabel(t))}</button>`).join("")}</div></div>`;
    }
  }

  const price = parseFloat(logState.price), weight = parseFloat(logState.weight);
  const ratio = price > 0 && weight > 0 ? price / weight : 0;
  const ready = (matched || (logState.newName.trim() && logState.newTags.length)) && ratio > 0 && logState.person;

  main.innerHTML = `
    <div class="titlebar">
      <button class="iconbtn" id="back">${I.back}</button>
      <h1 style="font-size:22px">Log an order</h1>
    </div>
    <div class="field"><label>DoorDash link</label>
      <div class="input-wrap"><span class="pre">${I.link}</span>
        <input class="control has-pre" id="link" value="${esc(logState.link)}" placeholder="doordash.com/store/…"/></div></div>
    ${placeBlock}
    <div class="two-col">
      <div class="field"><label>Total price</label>
        <div class="input-wrap"><span class="pre">${I.dollar}</span>
          <input class="control has-pre num" id="price" inputmode="decimal" value="${esc(logState.price)}" placeholder="0.00"/></div></div>
      <div class="field"><label>Weight (lb)</label>
        <div class="input-wrap"><input class="control num" id="weight" inputmode="decimal" value="${esc(logState.weight)}" placeholder="0.0"/></div></div>
    </div>
    <button type="button" class="tip-link" id="tipLink">${I.info}What should I enter here?</button>
    <div class="field"><label>What'd you order? <span class="optional">(optional)</span></label>
      <textarea class="control" id="note" placeholder="2x pad thai, spring rolls…" maxlength="200">${esc(logState.note)}</textarea></div>
    <div class="field"><label>Photo <span class="optional">(optional)</span></label>
      <div id="photoField">${photoFieldHTML()}</div>
      <input type="file" id="photoInput" accept="image/*" capture="environment" hidden />
    </div>
    <div class="field"><label>Who's logging this</label>
      <div class="people">${DATA.people.map((m) =>
        `<button class="person ${logState.person === m.name ? "on" : ""}" data-person="${esc(m.name)}"><span class="ini">${esc(initials(m.name))}</span>${esc(m.name)}</button>`).join("")}</div></div>
    <div class="readout">
      <div class="k">This order's rate</div>
      <div class="v num">${ratio > 0 ? "$" + ratio.toFixed(2) : "—"}<small>/lb</small></div>
      ${ratio > 0 ? `<div class="grade"><span class="gbadge ${gradeClass(gradeFor(ratio))}">Grade ${gradeFor(ratio)}</span></div>` : ""}
    </div>
    <button class="btn" id="save" ${ready ? "" : "disabled"}>Save order</button>`;

  const rerender = () => screenLog();
  $("#back", main).onclick = () => go(tab);
  const link = $("#link", main);
  link.oninput = (e) => { logState.link = e.target.value; logState.newName = ""; screenLog(); $("#link", main).focus(); };
  $("#price", main).oninput = (e) => { logState.price = e.target.value; updateReadout(); };
  $("#weight", main).oninput = (e) => { logState.weight = e.target.value; updateReadout(); };
  const nn = $("#newName", main); if (nn) nn.oninput = (e) => { logState.newName = e.target.value; toggleSave(); };
  main.querySelectorAll("[data-tag]").forEach((c) => c.onclick = () => {
    const t = c.dataset.tag;
    logState.newTags = logState.newTags.includes(t) ? logState.newTags.filter((x) => x !== t) : [...logState.newTags, t];
    c.classList.toggle("on"); toggleSave();
  });
  main.querySelectorAll("[data-person]").forEach((b) => b.onclick = () => {
    logState.person = b.dataset.person;
    main.querySelectorAll("[data-person]").forEach((x) => x.classList.toggle("on", x === b));
    toggleSave();
  });
  $("#save", main).onclick = saveOrder;
  const tipLink = $("#tipLink", main); if (tipLink) tipLink.onclick = showLogTip;
  if (!store.get(LOG_TIP_KEY)) showLogTip();

  const note = $("#note", main);
  if (note) note.oninput = (e) => { logState.note = e.target.value; };

  const photoInput = $("#photoInput", main);
  if (photoInput) photoInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { logState.photo = await resizeImage(file); }
    catch (err) { console.error(err); toast("Couldn't use that photo"); }
    $("#photoField", main).innerHTML = photoFieldHTML();
    wireRemovePhoto();
  };
  function wireRemovePhoto() {
    const rm = $("#removePhoto", main);
    if (rm) rm.onclick = () => { logState.photo = null; $("#photoField", main).innerHTML = photoFieldHTML(); wireRemovePhoto(); };
  }
  wireRemovePhoto();

  function updateReadout() {
    const p = parseFloat(logState.price), w = parseFloat(logState.weight);
    const r = p > 0 && w > 0 ? p / w : 0;
    const ro = main.querySelector(".readout");
    ro.querySelector(".v").innerHTML = `${r > 0 ? "$" + r.toFixed(2) : "—"}<small>/lb</small>`;
    let g = ro.querySelector(".grade");
    if (r > 0) { if (!g) { g = document.createElement("div"); g.className = "grade"; ro.appendChild(g); } g.innerHTML = `<span class="gbadge ${gradeClass(gradeFor(r))}">Grade ${gradeFor(r)}</span>`; }
    else if (g) g.remove();
    toggleSave();
  }
  function toggleSave() {
    const p = parseFloat(logState.price), w = parseFloat(logState.weight);
    const ok = (logState.matchedId || (logState.newName.trim() && logState.newTags.length)) && p > 0 && w > 0 && logState.person;
    $("#save", main).disabled = !ok;
  }
}

async function saveOrder() {
  const btn = $("#save", main); btn.disabled = true; btn.textContent = "Saving…";
  try {
    let placeId = logState.matchedId;
    if (!placeId) {
      const p = await DB.addPlace({ name: logState.newName.trim(), doordash_url: logState.link.trim(), tags: logState.newTags });
      placeId = p.id;
    }
    await DB.addOrder({
      place_id: placeId, person_name: logState.person,
      price: parseFloat(logState.price), weight_lbs: parseFloat(logState.weight),
      note: logState.note.trim() || null, photo: logState.photo || null,
    });
    await refresh();
    const savedName = DATA.places.find((p) => p.id === placeId)?.name || "order";
    Object.assign(logState, { link: "", matchedId: null, newName: "", newTags: [], price: "", weight: "", note: "", photo: null });
    toast(`Logged ${savedName} · ${(parseFloat(DATA.orders.at(-1)?.weight_lbs || 0)).toFixed(1)} lb`);
    go("detail", { placeId });
  } catch (e) {
    console.error(e); toast("Couldn't save — check your connection"); btn.disabled = false; btn.textContent = "Save order";
  }
}

function screenLibrary() {
  let items = rankedPlaces(DATA);
  if (lib.tag) items = items.filter((x) => x.place.tags.includes(lib.tag));
  if (lib.sort === "rating") items.sort((a, b) => b.s.avgRating - a.s.avgRating || a.s.ratio - b.s.ratio);
  else items.sort((a, b) => a.s.ratio - b.s.ratio);

  const usedTags = [...new Set(DATA.places.flatMap((p) => p.tags))].sort();

  main.innerHTML = `
    <div class="app-head"><h1>Library</h1></div>
    <div class="filterbar">
      <button class="chip ${!lib.tag ? "on" : ""}" data-tag="">All</button>
      ${usedTags.map((t) => `<button class="chip ${lib.tag === t ? "on" : ""}" data-tag="${esc(t)}">${esc(tagLabel(t))}</button>`).join("")}
    </div>
    <div class="sortrow">
      <button class="seg ${lib.sort === "ratio" ? "on" : ""}" data-sort="ratio">Best value</button>
      <button class="seg ${lib.sort === "rating" ? "on" : ""}" data-sort="rating">Top rated</button>
    </div>
    ${items.length ? `<div>${items.map((x, i) => placeCard(x, i)).join("")}</div>`
      : emptyBlock("Nothing here yet", lib.tag ? "No places tagged " + esc(lib.tag) + " so far." : "Log an order to fill the library.")}`;

  main.querySelectorAll("[data-tag]").forEach((c) => c.onclick = () => { lib.tag = c.dataset.tag || null; screenLibrary(); });
  main.querySelectorAll("[data-sort]").forEach((b) => b.onclick = () => { lib.sort = b.dataset.sort; screenLibrary(); });
  main.querySelectorAll("[data-place]").forEach((n) => n.onclick = () => go("detail", { placeId: n.dataset.place }));
}

function placeCard(x, i) {
  const { place, s } = x;
  const stars = s.ratingCount ? `★ ${s.avgRating.toFixed(1)}` : "unrated";
  const cover = placeCoverPhoto(place.id, DATA.orders);
  const rank = i + 1;
  const tier = rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";
  const grade = gradeFor(s.ratio);
  return `<div class="place-card ${tier ? `top t-${tier}` : ""}" data-place="${place.id}">
    <div class="rank ${tier ? "" : "num"}">${tier ? I.medal : rank}</div>
    <div class="thumb">${cover ? `<img src="${cover}" alt=""/>` : (place.tags[0] ? tagIcon(place.tags[0]) : "")}</div>
    <div class="body">
      <div class="nm">${esc(place.name)}</div>
      <div class="meta"><span>${place.tags[0] ? esc(tagLabel(place.tags[0])) : "—"}</span><i class="dot"></i><span>${s.orderCount} order${s.orderCount === 1 ? "" : "s"}</span><i class="dot"></i><span>${stars}</span></div>
    </div>
    <div class="ratio"><span class="gbadge sm ${gradeClass(grade)}">${grade || "—"}</span><b class="num">${costPerLb(s.ratio)}</b></div>
  </div>`;
}

function screenDetail() {
  const place = DATA.places.find((p) => p.id === view.placeId);
  if (!place) return go("library");
  const s = computeStats(place, DATA.orders, DATA.ratings);
  const myRating = DATA.ratings.find((r) => r.place_id === place.id && r.person_name === currentUser)?.score || 0;
  const orders = [...s.orders].sort((a, b) => new Date(b.ordered_at) - new Date(a.ordered_at));
  const cover = placeCoverPhoto(place.id, DATA.orders);
  const grade = gradeFor(s.ratio);

  main.innerHTML = `
    <div class="titlebar"><button class="iconbtn" id="back">${I.back}</button><h2>Place</h2></div>
    <div class="detail-hero">
      <div class="thumb">${cover ? `<img src="${cover}" alt=""/>` : (place.tags[0] ? tagIcon(place.tags[0]) : "")}</div>
      <h1>${esc(place.name)}</h1>
      <div class="taglist">${place.tags.map((t) => `<span class="chip readonly">${esc(tagLabel(t))}</span>`).join("")}</div>
      ${place.doordash_url ? `<a class="biglink" href="${esc(place.doordash_url)}" target="_blank" rel="noopener">Open on DoorDash ↗</a>` : ""}
    </div>
    <div class="statgrid">
      <div class="cell"><div class="v num">${s.ratio > 0 ? "$" + s.ratio.toFixed(2) : "—"}</div><div class="k">$ per lb</div></div>
      <div class="cell"><div class="v">${grade ? `<span class="gbadge ${gradeClass(grade)}">${grade}</span>` : "—"}</div><div class="k">grade</div></div>
      <div class="cell"><div class="v num">${s.orderCount}</div><div class="k">orders</div></div>
    </div>
    <h3 class="section-label">Rate this place</h3>
    <div class="stars" id="stars">
      ${[1, 2, 3, 4, 5].map((n) => `<button class="${n <= myRating ? "on" : "off"}" data-score="${n}">${I.star}</button>`).join("")}
    </div>
    <p class="dim" style="text-align:center;font-size:12.5px">${s.ratingCount ? `Team average ${s.avgRating.toFixed(1)} · ${s.ratingCount} rating${s.ratingCount === 1 ? "" : "s"}` : "Be the first to rate it"}</p>
    <h3 class="section-label section-gap">Order history</h3>
    <div>${orders.map((o) => {
      const r = Number(o.weight_lbs) > 0 ? Number(o.price) / Number(o.weight_lbs) : 0;
      return `<div class="order-row">
        <div class="ini">${esc(initials(o.person_name))}</div>
        <div class="body">
          <b>${esc(o.person_name)}</b>
          <div class="sub">${money(o.price)} · ${Number(o.weight_lbs).toFixed(1)} lb · ${relTime(o.ordered_at)}</div>
          ${o.note ? `<div class="note">${esc(o.note)}</div>` : ""}
        </div>
        ${o.photo ? `<button class="thumb-btn" data-photo="${o.photo}"><img src="${o.photo}" alt="Order photo"/></button>` : ""}
        <div class="r num">${r > 0 ? "$" + r.toFixed(2) : "—"}</div>
      </div>`;
    }).join("")}</div>`;

  $("#back", main).onclick = () => go(tab === "detail" ? "library" : tab);
  main.querySelectorAll("[data-score]").forEach((b) => b.onclick = async () => {
    const score = Number(b.dataset.score);
    main.querySelectorAll("#stars button").forEach((x) => { const on = Number(x.dataset.score) <= score; x.className = on ? "on" : "off"; });
    try { await DB.upsertRating({ place_id: place.id, person_name: currentUser, score }); await refresh(); toast(`Rated ${place.name} ${score}★`); screenDetail(); }
    catch (e) { console.error(e); toast("Couldn't save rating"); }
  });
  main.querySelectorAll("[data-photo]").forEach((b) => b.onclick = () => openLightbox(b.dataset.photo));
}

function openLightbox(src) {
  const el = document.createElement("div");
  el.className = "photo-lightbox";
  el.innerHTML = `<button class="close">${I.close}</button><img src="${src}" alt="Order photo"/>`;
  el.onclick = (e) => { if (e.target === el || e.target.closest(".close")) el.remove(); };
  document.body.appendChild(el);
}

function screenStats() {
  const orders = filterByRange(DATA.orders, statsUI.range);
  const totalW = orders.reduce((s, o) => s + Number(o.weight_lbs), 0);
  const totalP = orders.reduce((s, o) => s + Number(o.price), 0);
  const overall = totalW > 0 ? totalP / totalW : 0;
  const placesTried = new Set(orders.map((o) => o.place_id)).size;

  const byPerson = {};
  for (const o of orders) {
    const k = o.person_name; byPerson[k] = byPerson[k] || { w: 0, p: 0, n: 0 };
    byPerson[k].w += Number(o.weight_lbs); byPerson[k].p += Number(o.price); byPerson[k].n += 1;
  }
  const leaders = Object.entries(byPerson).map(([name, v]) => ({ name, ...v, ratio: v.w > 0 ? v.p / v.w : 0 }))
    .sort((a, b) => b.w - a.w);

  const byTag = {};
  for (const o of orders) {
    const place = DATA.places.find((p) => p.id === o.place_id);
    (place?.tags || []).forEach((t) => { byTag[t] = (byTag[t] || 0) + Number(o.weight_lbs); });
  }
  const topTags = Object.entries(byTag).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxTag = topTags[0]?.[1] || 0;

  const ranked = rankedPlaces({ places: DATA.places, orders, ratings: DATA.ratings });
  const bestValue = ranked[0];
  const weeks = buildWeeklyBuckets(orders, statsUI.range);

  main.innerHTML = `
    <div class="app-head"><h1>Stats</h1></div>
    <div class="rangebar">
      ${Object.keys(RANGE_LABEL).map((r) => `<button class="seg ${statsUI.range === r ? "on" : ""}" data-range="${r}">${RANGE_LABEL[r]}</button>`).join("")}
    </div>
    <div class="bigstat"><div class="v num">${totalW.toFixed(0)}<small>lbs</small></div><div class="k">total feast logged</div></div>
    <div class="duo">
      <div class="cell"><div class="v num">${money(totalP).replace(".00", "")}</div><div class="k">total spent</div></div>
      <div class="cell"><div class="v num">${costPerLb(overall)}</div><div class="k">team rate</div></div>
    </div>
    <div class="quad">
      <div class="cell"><div class="v num">${orders.length}</div><div class="k">orders logged</div></div>
      <div class="cell"><div class="v num">${placesTried}</div><div class="k">places tried</div></div>
    </div>
    ${weeks.length > 1 ? `<h3 class="section-label">Pounds by week</h3><div class="chart">${chartSVG(weeks)}</div>` : ""}
    ${bestValue ? `<h3 class="section-label section-gap">Best value ${RANGE_PERIOD_LABEL[statsUI.range]}</h3><div>${placeCard(bestValue, 0)}</div>` : ""}
    ${topTags.length ? `<h3 class="section-label section-gap">Top cuisines</h3><div>${topTags.map(([t, w]) => tagBar(t, w, maxTag)).join("")}</div>` : ""}
    <h3 class="section-label section-gap">Who's feeding the team</h3>
    <div>${leaders.map((l) => `
      <div class="lead-row">
        <div class="ini">${esc(initials(l.name))}</div>
        <div class="body"><b>${esc(l.name)}</b><div class="sub">${l.n} order${l.n === 1 ? "" : "s"} · ${costPerLb(l.ratio)}</div></div>
        <div class="amt"><b class="num">${l.w.toFixed(1)}</b><span>lbs</span></div>
      </div>`).join("") || emptyBlock("No stats yet", "Log an order to see team totals.")}</div>`;

  main.querySelectorAll("[data-range]").forEach((b) => b.onclick = () => { statsUI.range = b.dataset.range; screenStats(); });
  main.querySelectorAll("[data-place]").forEach((n) => n.onclick = () => go("detail", { placeId: n.dataset.place }));
}

function screenProfile() {
  const agg = personAgg(currentUser, DATA);
  const rank = weightRankOf(currentUser, DATA);
  const ctx = { rank };
  const earnedCount = BADGES.filter((b) => evalBadge(b, agg, ctx).earned).length;

  const badgeTiles = BADGES.map((b) => {
    const r = evalBadge(b, agg, ctx);
    const cls = r.earned ? `earned ${b.tier}` : "locked";
    const track = (!r.earned && !b.rank) ? `<div class="btrack"><i style="width:${r.pct}%"></i></div>` : "";
    return `<div class="badge ${cls}" title="${esc(b.desc)}">
      <div class="ic">${b.icon}</div>
      <div class="bn">${esc(b.name)}</div>
      <div class="bs">${esc(r.sub)}</div>
      ${track}
    </div>`;
  }).join("");

  const picker = DATA.people.map((m) => {
    const sel = currentUser === m.name;
    const iniStyle = sel ? "" : `background:${m.accent || "var(--inset-2)"};color:#fff`;
    return `<button class="person ${sel ? "on" : ""}" data-person="${esc(m.name)}"><span class="ini" style="${iniStyle}">${esc(initials(m.name))}</span>${esc(m.name)}</button>`;
  }).join("");

  const createForm = profileUI.creating ? `
    <div class="create">
      <div class="field" style="margin-bottom:12px"><label>Profile name</label>
        <div class="input-wrap"><input class="control" id="pName" value="${esc(profileUI.newName)}" placeholder="Your name" maxlength="24" autocomplete="off"/></div></div>
      <label style="display:block;font-size:14px;font-weight:600;color:var(--ink-2)">Accent</label>
      <div class="swatches">${ACCENTS.map((c) => `<button class="swatch ${profileUI.newAccent === c ? "on" : ""}" data-accent="${c}" style="background:${c}" aria-label="accent"></button>`).join("")}</div>
      <div style="display:flex;gap:10px">
        <button class="btn" id="createBtn" style="flex:2">Create profile</button>
        <button class="btn ghost" id="cancelBtn" style="flex:1">Cancel</button>
      </div>
    </div>` : "";

  main.innerHTML = `
    <div class="app-head"><h1>Profile</h1></div>
    <div class="profile-head">
      <div class="big" style="background:${accentOf(currentUser)}">${esc(initials(currentUser))}</div>
      <h1>${esc(currentUser)}</h1>
      <p class="dim" style="font-size:13px">${agg.orderCount} order${agg.orderCount === 1 ? "" : "s"} · ${agg.totalW.toFixed(1)} lbs · ${money(agg.totalP).replace(".00", "")}</p>
    </div>

    <div class="row-between"><h3 style="margin:0">Badges</h3><span class="dim" style="font-size:12.5px;font-weight:600">${earnedCount} of ${BADGES.length}</span></div>
    <div class="badges">${badgeTiles}</div>

    <h3 class="section-label section-gap">Switch profile</h3>
    <div class="people">
      ${picker}
      <button class="person newp" id="newProfile"><span class="ini">+</span>New</button>
    </div>
    ${createForm}

    <div class="milestone section-gap">
      <div class="glyph">${I.scale}</div>
      <div class="body"><div class="row"><b>Data source</b><span class="amt">${DB.live ? "Supabase (shared)" : "Demo (local)"}</span></div>
      <p class="dim" style="font-size:12.5px;margin-top:4px">${DB.live ? "Everyone on the link sees the same profiles and data." : "Add your Supabase keys in config.js to share across the team."}</p></div>
    </div>`;

  main.querySelectorAll("[data-person]").forEach((b) => b.onclick = () => {
    currentUser = b.dataset.person; logState.person = currentUser; store.set("feast:user", currentUser);
    profileUI.creating = false; toast(`You're logging as ${currentUser}`); screenProfile(); renderTabbar();
  });
  const np = $("#newProfile", main); if (np) np.onclick = () => { profileUI.creating = true; screenProfile(); };
  const pName = $("#pName", main);
  if (pName) { pName.oninput = (e) => { profileUI.newName = e.target.value; }; pName.focus(); pName.setSelectionRange(pName.value.length, pName.value.length); }
  main.querySelectorAll("[data-accent]").forEach((s) => s.onclick = () => { profileUI.newAccent = s.dataset.accent; screenProfile(); });
  const cb = $("#cancelBtn", main); if (cb) cb.onclick = () => { profileUI.creating = false; profileUI.newName = ""; screenProfile(); };
  const create = $("#createBtn", main); if (create) create.onclick = createProfile;
}

async function createProfile() {
  const name = profileUI.newName.trim();
  if (!name) { toast("Enter a name first"); return; }
  if (DATA.people.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast("That name's already taken"); return; }
  const btn = $("#createBtn", main); btn.disabled = true; btn.textContent = "Creating…";
  try {
    await DB.addPerson({ name, accent: profileUI.newAccent });
    await refresh();
    currentUser = name; logState.person = name; store.set("feast:user", name);
    profileUI.creating = false; profileUI.newName = ""; profileUI.newAccent = ACCENTS[0];
    toast(`Welcome, ${name}`); screenProfile(); renderTabbar();
  } catch (e) {
    console.error(e); toast("Couldn't create profile — that name may be taken"); btn.disabled = false; btn.textContent = "Create profile";
  }
}

/* ── Shared bits ──────────────────────────────────────────────── */
function emptyBlock(title, body) {
  return `<div class="empty"><div class="glyph">${I.scale}</div><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
}
function relTime(iso) {
  const d = Math.floor((Date.now() - new Date(iso)) / 864e5);
  if (d <= 0) return "today"; if (d === 1) return "yesterday";
  if (d < 7) return d + "d ago"; if (d < 30) return Math.floor(d / 7) + "w ago";
  return Math.floor(d / 30) + "mo ago";
}
function openLog() { logState.person = currentUser; go("log"); }

/* ── Router ───────────────────────────────────────────────────── */
function render() {
  const map = { home: screenHome, log: screenLog, library: screenLibrary, detail: screenDetail, stats: screenStats, profile: screenProfile };
  (map[view.name] || screenHome)();
  main.scrollTop = 0;
  tabbarEl.style.display = view.name === "log" || view.name === "detail" ? "none" : "flex";
  renderTabbar();
}

/* ── Boot ─────────────────────────────────────────────────────── */
(async function boot() {
  try {
    DB = isLive ? await makeSupabaseDB() : makeDemoDB();
    await refresh();
  } catch (e) {
    console.error("Falling back to demo data:", e);
    DB = makeDemoDB(); await refresh();
    toast("Couldn't reach the database — showing demo data");
  }
  const names = DATA.people.map((p) => p.name);
  const saved = store.get("feast:user");
  currentUser = (saved && names.includes(saved)) ? saved : (names[0] || currentUser);
  logState.person = currentUser;
  render();
})();

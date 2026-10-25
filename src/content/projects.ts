// The four projects on the site. Facts here were checked against each project's repo,
// status docs and live deployment (see PRODUCT.md, "Evidence on Hand").
// Fields set to null are unknown: fill them in and the page shows them automatically.

export type Status = "live" | "beta" | "in-progress";

export const statusLabel: Record<Status, string> = {
  live: "Live",
  beta: "Beta",
  "in-progress": "In progress",
};

export const statusMeaning: Record<Status, string> = {
  live: "Deployed and publicly reachable",
  beta: "Released builds exist; parts are not yet verified on real devices or accounts",
  "in-progress": "Core features built and tested locally; not deployed yet",
};

export type Still = { src: string; alt: string; width: number; height: number; label?: string };

export type Visual =
  // Real screenshots of the running product; more than one plays as a slow reel.
  | { kind: "screens"; screens: Still[] }
  // Drawn from the project's own architecture docs, for apps with no public UI.
  | { kind: "diagram"; diagram: "vybe" | "cross-campus" | "bunkr"; alt: string };

export type Ledger = { item: string; state: "verified" | "built" | "blocked" }[];

export type CaseStudy = {
  problem: string;
  // Unknown until Sarthak writes it; rendered only when filled in.
  why: string | null;
  role: string;
  howItWorks: string[];
  decisions: { decision: string; reason: string }[];
  challenges: { title: string; detail: string }[];
  ledger: Ledger;
  unfinished: string[];
  learned: string | null;
};

export type Project = {
  slug: string;
  title: string;
  // One short line used where space is tight (hero list, index).
  tagline: string;
  summary: string;
  category: string;
  year: string;
  status: Status;
  statusNote: string;
  stack: string[];
  repo: { href: string } | { private: true };
  live?: string;
  mark?: string;
  visual: Visual;
  // Extra real screenshots for the case study (add phone screenshots here).
  stills?: Still[];
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "polaris",
    title: "Polaris",
    tagline: "Live Earth-observation data on a 3D globe",
    summary:
      "A world intelligence website: wildfires, storms, earthquakes, aircraft and satellites on a live 3D Earth, each with its source and the time it was observed.",
    category: "Web app · Geospatial",
    year: "2026",
    status: "live",
    statusNote: "Deployed on Vercel; stored history in PostGIS is the next phase",
    stack: ["Next.js 16", "React 19", "TypeScript", "CesiumJS", "satellite.js (SGP4)", "zod", "Tailwind CSS", "Vitest", "Playwright", "axe-core"],
    repo: { href: "https://github.com/sarthxkz/POLARIS" },
    live: "https://polaris-seven-ashen.vercel.app",
    mark: "/work/polaris-icon.svg",
    visual: {
      kind: "screens",
      screens: [
        {
          src: "/work/polaris-globe.png",
          label: "Live globe",
          alt: "Polaris globe showing the Americas with 451 natural events and earthquake markers, a layer rail on the left, an event feed on the right and a 7-day timeline below.",
          width: 1440,
          height: 900,
        },
        {
          src: "/work/polaris-event.png",
          label: "Earthquake",
          alt: "Polaris zoomed in on a magnitude 4.9 earthquake near Hualien City, Taiwan, with aircraft nearby and a NASA satellite image of the area in the detail panel.",
          width: 1440,
          height: 900,
        },
        {
          src: "/work/polaris-satellite.png",
          label: "ISS",
          alt: "Polaris tracking the ISS: its estimated position and next orbit drawn over the Pacific, with altitude, speed and orbital elements in the detail panel.",
          width: 1440,
          height: 900,
        },
      ],
    },
    stills: [
      {
        src: "/work/polaris-search.png",
        alt: "Polaris search showing two ISS modules as results, over Taiwan's city lights on the night side of the globe.",
        width: 1440,
        height: 900,
      },
      {
        src: "/work/polaris-weather.png",
        alt: "Polaris detail panel for a point of open water in the Pacific: modelled weather from Open-Meteo and no other events within 800 km.",
        width: 1440,
        height: 900,
      },
    ],
    caseStudy: {
      problem:
        "Earth-observation data is public but scattered across agency feeds with different formats, limits and update rates. Polaris puts it on one globe and labels every object with where it came from and how old it is, so a visitor can trust what they are looking at.",
      why: null,
      role: "Owner and developer: product scope, data pipeline, the globe engine and the site.",
      howItWorks: [
        "Server routes collect from NASA EONET, USGS, OpenSky, CelesTrak, NASA GIBS and Open-Meteo. Every response is validated with zod and normalised into one domain model.",
        "Collectors fetch only when someone asks and the cache is due, never run two requests at once, keep serving the last good copy on failure, and back off for exactly as long as a provider's Retry-After says.",
        "CesiumJS renders NASA Blue Marble with real VIIRS city lights on the night side. Rendering stays out of React: aircraft are billboards in collections and satellites a point collection propagated once a second with SGP4.",
        "The scene renders on demand, so an idle globe costs almost nothing, and a 7-day timeline replays recorded observations.",
      ],
      decisions: [
        { decision: "The browser never talks to rate-limited providers", reason: "The server holds every credential and enforces each provider's limits; browsers only load NASA imagery tiles directly." },
        { decision: "On-demand, single-flight collection", reason: "An idle site spends no provider quota, which matters with anonymous OpenSky's 400 credits a day." },
        { decision: "Estimates are labelled as estimates", reason: "Satellite positions are SGP4 estimates from published elements, not tracking, and the detail panel says so." },
        { decision: "Privacy by construction", reason: "No accounts, cookies or analytics. Aircraft appear only by broadcast identifiers; owners are never looked up." },
      ],
      challenges: [
        {
          title: "Thousands of aircraft without React re-rendering",
          detail:
            "About 10,000 aircraft and every tracked satellite are drawn as Cesium primitives that React drives through method calls on a GlobeEngine, instead of components that re-render each update.",
        },
        {
          title: "Living inside provider limits",
          detail:
            "Anonymous OpenSky allows roughly one global snapshot every 15 minutes, and CelesTrak asks not to be polled faster than every 2 hours. Each feed has its own refresh policy and freshness threshold, and the Sources page shows the live state of every one.",
        },
      ],
      ledger: [
        { item: "41 unit tests passing for normalisers, the collector, geo maths and SGP4 (run 25 Oct 2026)", state: "verified" },
        { item: "Live on Vercel at polaris-seven-ashen.vercel.app", state: "verified" },
        { item: "Playwright end-to-end and axe accessibility specs", state: "built" },
        { item: "Stored history in PostgreSQL + PostGIS on an Oracle VM", state: "blocked" },
      ],
      unfinished: [
        "PostgreSQL + PostGIS on the Oracle VM for stored history",
        "Docker Compose and an HTTPS reverse proxy for the server phase",
        "Authenticated OpenSky access for a faster aircraft refresh",
      ],
      learned: null,
    },
  },
  {
    slug: "vybe",
    title: "Vybe",
    tagline: "Private friends map and end-to-end encrypted chat",
    summary:
      "A private, Android-first social app: a live friends map with consent-based location sharing, private photo sharing and end-to-end encrypted chat.",
    category: "Mobile app · Security",
    year: "2026",
    status: "beta",
    statusNote: "APK 0.1.5 published 22 Oct 2026 with push; E2EE chat and push not yet confirmed on a physical phone",
    stack: ["Expo SDK 58", "React Native", "TypeScript", "Kotlin", "libsignal", "Express 5", "Prisma 7", "PostgreSQL 17", "Firebase Cloud Messaging", "Docker", "Caddy"],
    repo: { href: "https://github.com/sarthxkz/VYBE" },
    mark: "/work/vybe-icon.png",
    visual: {
      kind: "diagram",
      diagram: "vybe",
      alt: "Vybe system diagram: Android app with the libsignal module talks over HTTPS and WebSocket to Caddy, which proxies to the Express API and PostgreSQL on one VM.",
    },
    caseStudy: {
      problem:
        "Location-sharing apps tend to share too much with too many people. Vybe keeps the circle to accepted friends, makes every share an explicit choice, and encrypts chat so the server only ever stores ciphertext.",
      why: null,
      role: "Owner and developer: product decisions, architecture, the Android release builds and the server deployment.",
      howItWorks: [
        "The Android app (Expo dev build, expo-router, TanStack Query) talks to a single Express 5 API over HTTPS and an authenticated WebSocket for realtime fan-out.",
        "Location runs as a foreground service with a 120 s target. The server decides who may see a point in one place, authz.ts, and purges locations after 24 hours.",
        "Chat uses Signal's own libsignal through a Kotlin native module: PQXDH session setup and the Double Ratchet. Private keys never leave the device; history sits in SQLCipher.",
        "The API, PostgreSQL 17 and media run in Docker Compose behind Caddy with automatic TLS on an Oracle Cloud VM. Over-the-air updates are code-signed.",
      ],
      decisions: [
        { decision: "libsignal instead of custom crypto", reason: "A reviewed, maintained Signal implementation with PQXDH and the Double Ratchet. It makes the app AGPL-3.0." },
        { decision: "One encrypted device per account", reason: "Multi-device Signal needs sender keys and device lists; getting it wrong breaks the security model." },
        { decision: "Store-and-forward only for chat", reason: "Ciphertext is deleted on acknowledgement, and read receipts are encrypted control messages, so the server never learns read state." },
        { decision: "No Redis, no PostGIS", reason: "One API process on one VM. Queries are 'latest point for these friends', never 'users near X'." },
      ],
      challenges: [
        {
          title: "Chat failed only in release builds",
          detail:
            "Every send failed in processBundle. Replaying a friend's real key bundle with desktop libsignal worked, so the keys were fine. The R8 mapping showed a libsignal callback type renamed by minification; adding keep rules fixed it.",
        },
        {
          title: "Sessions looked up with ourselves",
          detail:
            "libsignal's SessionCipher and SessionBuilder take the local and remote addresses in opposite orders. The module passed them the same way to both. Fixed and verified in a full two-phone round trip.",
        },
        {
          title: "Windows path limits broke the native build",
          detail:
            "React Native codegen paths exceeded 260 characters. Long paths plus a newer SDK CMake got the first signed release APK built on Windows.",
        },
      ],
      ledger: [
        { item: "79 server integration tests against real Postgres 17 (auth, friends, location, photos, E2EE via the API, realtime, stories, admin)", state: "verified" },
        { item: "API live over HTTPS with a Let's Encrypt certificate; only Caddy exposes ports", state: "verified" },
        { item: "Signed release APKs 0.1.0 to 0.1.5 and a code-signed OTA channel", state: "built" },
        { item: "E2EE chat, camera and background location on a physical phone", state: "built" },
        { item: "Push notifications through Firebase (server key accepted by Google; not yet confirmed on a phone)", state: "built" },
        { item: "Google sign-in (needs an OAuth client)", state: "blocked" },
        { item: "Encrypted backups (need an age key pair)", state: "blocked" },
      ],
      unfinished: [
        "Device testing of chat, camera, background location cadence and Keystore storage",
        "Confirm push on a phone, and set up Google sign-in",
        "Legal review of the privacy policy and terms before a public launch",
        "Multi-device encryption (deliberately out of scope for v1)",
      ],
      learned: null,
    },
  },
  {
    slug: "bunkr",
    title: "Bunkr",
    tagline: "Attendance and leave planner for SRMIST",
    summary:
      "Attendance and timetable for SRMIST students, with planners on top: how many classes you can skip, and what a leave, OD or ML costs.",
    category: "Mobile app",
    year: "2026",
    status: "beta",
    statusNote: "The Academia sign-in and attendance parser have not yet been checked on a real phone and account",
    stack: ["Expo SDK 57", "React Native", "TypeScript", "Supabase", "Row Level Security", "zod", "Vitest"],
    repo: { private: true },
    mark: "/work/bunkr-logo.jpg",
    visual: {
      kind: "diagram",
      diagram: "bunkr",
      alt: "Bunkr diagram: the phone signs in to SRM Academia through SRM's own Zoho sign-in, parses attendance on the device, and syncs validated data to a Supabase account protected by row-level security.",
    },
  },
  {
    slug: "cross-campus",
    title: "Cross Campus",
    tagline: "Find students to build with",
    summary:
      "A verified student collaboration network for finding teammates, hackathon partners and research groups, launching at SRMIST.",
    category: "Web platform",
    year: "2026",
    status: "in-progress",
    statusNote: "Built and tested locally; hosting, SMTP and Google OAuth are waiting on credentials",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Row Level Security", "Tailwind CSS", "Vitest", "Playwright", "pgTAP"],
    repo: { private: true },
    mark: "/work/cross-campus-mark.svg",
    visual: {
      kind: "diagram",
      diagram: "cross-campus",
      alt: "Cross Campus system diagram: Next.js server components call a service layer, which talks to Supabase; Postgres row-level security and security-definer functions enforce authorization.",
    },
    caseStudy: {
      problem:
        "Students who want to build something rarely know who else on campus has the skills or the time. Cross Campus is a tool for finding the people who will actually build with you, not another social feed.",
      why: null,
      role: "Owner and developer: product scope, data model, authorization rules and the web app.",
      howItWorks: [
        "Next.js 16 App Router with Server Components for data pages; Client Components only where there is interaction.",
        "Every database call goes through one service layer that takes an injected Supabase client, so the UI never imports the database directly.",
        "Authorization lives in Postgres: row-level security on every table, default-deny, and multi-table actions such as accepting a join request go through SECURITY DEFINER functions that re-check the caller.",
        "Students with an institution email are verified automatically by matching the domain, tested for srmist.edu.in.",
        "Direct messages and team chats use Supabase Realtime, which is filtered by the same RLS rules, so a client only receives rows it could read.",
      ],
      decisions: [
        { decision: "Authorization in the database, not the app", reason: "It holds even if the UI is bypassed. The route proxy is a convenience, not the boundary." },
        { decision: "One backend provider", reason: "The MVP already ran on Supabase with working RLS; a second backend would double the security surface for no user value." },
        { decision: "Discovery ranked by shared skills, no AI claims", reason: "Cards say 'N skills in common', which is true and explainable." },
      ],
      challenges: [
        {
          title: "Proving a non-owner can't approve their own request",
          detail:
            "Join requests are accepted through a server-side function. An automated test signs in as a non-owner and confirms the approval is refused.",
        },
        {
          title: "Realtime without leaking rows",
          detail:
            "Notifications moved from 45-second polling to Realtime subscriptions that respect RLS, with a catch-up fetch on reconnect.",
        },
      ],
      ledger: [
        { item: "28 pgTAP authorization tests and 50 unit tests passing; production build passes", state: "verified" },
        { item: "Each end-to-end suite (privacy, collaboration, messaging) passed individually", state: "verified" },
        { item: "Remote database migrated with all 7 migrations", state: "verified" },
        { item: "Google OAuth sign-in (needs a Google Cloud OAuth client)", state: "blocked" },
        { item: "Hosting, SMTP and the production redirect URLs", state: "blocked" },
        { item: "Full-viewport walkthrough at 375, 768 and 1280 px", state: "built" },
      ],
      unfinished: [
        "Deploy to production and point Supabase redirect URLs at the real domain",
        "Configure SMTP so confirmation and reset emails deliver",
        "A real person's review of the privacy and terms pages",
      ],
      learned: null,
    },
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

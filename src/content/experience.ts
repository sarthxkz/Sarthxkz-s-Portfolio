// Skills are grouped by where they were actually used. "usedIn" lists project
// titles from projects.ts or a plain note, so every entry has evidence behind it.

export type SkillGroup = {
  title: string;
  items: { name: string; usedIn: string }[];
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", usedIn: "Polaris, Vybe, Bunkr, Cross Campus" },
      { name: "JavaScript", usedIn: "Web projects and coursework" },
      { name: "SQL", usedIn: "Cross Campus, Vybe" },
      { name: "Kotlin", usedIn: "Vybe's libsignal module" },
      { name: "Python", usedIn: "ML coursework" },
      { name: "C++, C and Java", usedIn: "Coursework" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", usedIn: "Every project" },
      { name: "Next.js", usedIn: "Polaris, Cross Campus" },
      { name: "React Native and Expo", usedIn: "Vybe, Bunkr" },
      { name: "CesiumJS", usedIn: "Polaris's 3D globe" },
      { name: "Tailwind CSS", usedIn: "Polaris, Cross Campus" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js and Express", usedIn: "Vybe" },
      { name: "Next.js route handlers", usedIn: "Polaris's data collectors" },
      { name: "Supabase", usedIn: "Cross Campus, Bunkr" },
      { name: "Prisma", usedIn: "Vybe" },
      { name: "WebSockets", usedIn: "Vybe" },
      { name: "zod validation", usedIn: "Polaris, Bunkr, Cross Campus" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", usedIn: "Vybe, Cross Campus, Bunkr" },
      { name: "Row Level Security", usedIn: "Cross Campus, Bunkr" },
      { name: "SQLite / SQLCipher", usedIn: "Vybe (on device)" },
    ],
  },
  {
    title: "Security",
    items: [
      { name: "Signal protocol (libsignal)", usedIn: "Vybe's end-to-end encrypted chat" },
      { name: "Auth: argon2id, rotating refresh tokens", usedIn: "Vybe" },
      { name: "Database-level authorization", usedIn: "Cross Campus, Bunkr" },
    ],
  },
  {
    title: "Infrastructure and testing",
    items: [
      { name: "Docker Compose", usedIn: "Vybe, Bunkr" },
      { name: "Caddy and Linux VMs", usedIn: "Vybe on Oracle Cloud" },
      { name: "Vercel", usedIn: "Polaris" },
      { name: "Vitest, Jest, Playwright", usedIn: "Polaris, Vybe, Bunkr, Cross Campus" },
      { name: "Git and GitHub", usedIn: "Every project" },
    ],
  },
];

export type Activity = {
  title: string;
  org: string;
  period: string | null;
  detail: string;
};

export const activities: Activity[] = [
  {
    title: "Member, Corporate Domain",
    org: "PLACVS, SRMIST",
    period: "Feb 2025 – present",
    detail: "Volunteered across 20+ campus placement processes, supporting workshops, seminars and placement activities with a student team.",
  },
  {
    title: "Intern",
    org: "Navjyoti India Foundation, Bawana",
    period: "Jul 2026",
    detail: "One-week community education internship on the 'Classroom Engagement & Success Story of Alumni' project.",
  },
  {
    title: "Round 1 submission",
    org: "Project Zenith: The Celestial Eye",
    period: "Jun 2026",
    detail: "Submitted Zenith Quest, a real-time sky guide.",
  },
  {
    title: "Participant",
    org: "Ossome Hacks, GitHub Community SRMIST",
    period: "Apr 2026",
    detail: "Hackathon participation.",
  },
  {
    title: "Team Cognitive Coders",
    org: "HACK NOVA 3.0",
    period: "2026",
    detail: "Planned LexiLearn, a dyslexia screening and learning-support platform, with three teammates.",
  },
  {
    title: "Shortlisted at university level",
    org: "Smart India Hackathon",
    period: "2025",
    detail: "University-level shortlist.",
  },
  {
    title: "Member",
    org: "Computer Society of India, SRM KTR",
    period: null,
    detail: "Helped organise tech events and workshops. Also an NSS outreach participant (education).",
  },
];

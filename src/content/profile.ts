// Everything personal on the site comes from this file.
// Edit freely; components only read from here.

export const profile = {
  name: "Sarthak Kumar",
  shortName: "Sarthak",
  // Wordmark in the navigation bar.
  handle: "sarthxkz",
  // Used for <title>, Open Graph and the hero sentence.
  headline: "I build software products, and I keep an honest record of what works.",
  // The paragraph under the hero headline.
  heroDescription:
    "CSE student at SRMIST, Kattankulathur, class of 2028. I build full systems, from the database rules to the release build: a live 3D globe of Earth-observation data, a private social app with end-to-end encrypted chat, an attendance planner for SRMIST students and a network for finding teammates. I work across full-stack, mobile, security and AI, and I'm a member of PLACVS, SRMIST's placement team.",
  intro:
    "Computer Science student at SRMIST, Kattankulathur. I build full-stack apps end to end, from the database rules to the release build, and write down what is verified and what is still unfinished.",
  location: "Chennai, India",
  // Canonical origin for metadata, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL
  // once a custom domain exists; on Vercel it falls back to the production domain.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  education: {
    degree: "B.Tech, Computer Science and Engineering",
    university: "SRM Institute of Science and Technology",
    campus: "Kattankulathur (KTR)",
    period: "Aug 2024 – 2028 (expected)",
  },

  // Portrait shown in the About section. To change it, drop a new image in
  // /public and update src (any aspect ratio works; it is cropped to 4:5).
  // `position` picks the focal point of the crop. Set photo to null to hide it.
  photo: {
    src: "/sarthak.jpg",
    alt: "Sarthak Kumar on a rooftop, looking out over a lake and hills under a cloudy sky",
    width: 1440,
    height: 1440,
    position: "48% 45%",
  } as { src: string; alt: string; width: number; height: number; position: string } | null,

  // Public contact details, approved for display. Phone is intentionally absent.
  email: "sarthak14072006@gmail.com",
  links: {
    github: "https://github.com/sarthxkz",
    linkedin: "https://www.linkedin.com/in/sarthakkkkumar",
  },
  resume: {
    href: "/sarthak-kumar-resume.pdf",
    updated: "Oct 2026",
  },

  interests: [
    "Full-stack development",
    "AI / ML and generative AI",
    "Cybersecurity",
    "UI / UX",
    "Software engineering",
    "Cloud and DevOps",
  ],

  // What he is working on learning right now. Edit as it changes.
  learning: [
    "End-to-end encryption with the Signal protocol",
    "Postgres row-level security as an authorization layer",
    "Native Android builds and signed over-the-air updates",
  ],

  about: [
    "I'm a second-year CSE student at SRM Institute of Science and Technology in Kattankulathur, graduating in 2028. Most of what I know I learned by building things people around me actually need: an attendance planner for my classmates, a place for students to find teammates, a private map for friends.",
    "I like owning the whole system. In one project that meant writing database authorization rules, a Kotlin bridge to libsignal and the server that deploys behind Caddy on a cloud VM. I keep status files in every repo that separate what has been tested from what has only been written, and this site reports my work the same way.",
    "Outside the code I'm a member of PLACVS, SRMIST's placement team, in the corporate domain, and I take part in hackathons whenever I can.",
  ],
} as const;

export type Profile = typeof profile;

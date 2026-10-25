# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated, from the brief's stated preference: Next.js (App Router) + TypeScript + Tailwind CSS, statically generated, self-hosted at https://sarthxkz.in on the Oracle Cloud VM next to Vybe (user choice, 2026-10-25). No backend, no database, no contact form (no secure form backend is configured). Chosen 2026-10-23.

## Users

- Recruiters and engineers screening a second-year CSE student for internships: they skim for 30–90 seconds, open one or two projects, and look for evidence that the work is real (repos, live links, honest status).
- Hackathon teammates, club peers and collaborators at SRMIST who want to see what Sarthak builds and how to reach him.

## Product Purpose

Personal portfolio of Sarthak Kumar, B.Tech CSE student at SRM Institute of Science and Technology, Kattankulathur (Aug 2024 to expected 2028). It shows the software he builds, each piece with its real status, so a visitor can judge the engineering and get in touch. Success means a visitor opens a case study or repo and then emails, connects on LinkedIn, or downloads the resume.

## Positioning

A student who ships documented systems, not demos: his repositories carry their own status ledgers (what is verified, what is implemented but untested, what is blocked) and that honesty is the differentiator. The portfolio reports every project the same way.

## Operating Context

Viewed on laptops during recruiting and on phones from LinkedIn/WhatsApp links. Visitors follow links to GitHub and live deployments.

## Capabilities and Constraints

- Static site; content lives in typed config files (`src/content/`) so Sarthak can edit without touching components.
- Contact: email sarthak14072006@gmail.com, github.com/sarthxkz, linkedin.com/in/sarthakkkumar (approved for public display 2026-10-23). Phone number must never be published on the page.
- Resume: the 2026-10-21 PDF is linked as-is (user-approved; the PDF itself contains phone and CGPA).
- Private repos (Cross Campus, Bunkr, HELIOS/HELIX-AI) must not be linked as if public.
- Projects on the site: only Polaris, Vybe, Bunkr and Cross Campus (user instruction, 2026-10-25). Other projects are not shown.
- Case studies: Polaris, Vybe and Cross Campus.

## Brand Commitments

- Visual register pinned by Sarthak (2026-10-23, after two re-rolled direction hands): dark, technical, premium, few metaphors. Graphite/near-black ground, off-white type, one accent. Craft bar: Linear and Vercel. No costume worlds (drawing sets, notebooks, terminals).
- GitHub handle `sarthxkz` is the public identity on code.

## Evidence on Hand

- Polaris: public repo github.com/sarthxkz/POLARIS, live at polaris-seven-ashen.vercel.app. Next.js 16 + CesiumJS globe of NASA EONET, USGS, OpenSky, CelesTrak, GIBS and Open-Meteo data. 41 unit tests passed when run on 2026-10-25. Real screenshots from its own review captures (local repo "F:/God's eye"). Server phase (PostGIS on Oracle VM) planned, not started.

- Vybe: public repo github.com/sarthxkz/VYBE (AGPL-3.0), PROJECT_STATUS.md with per-phase verification, ARCHITECTURE.md, ENCRYPTION_DESIGN.md. Android app (Expo SDK 58, RN), Express 5 + Prisma 7 + PostgreSQL 17 API, libsignal E2EE native module, deployed API on an Oracle Cloud VM. Releases built; most app features not yet verified on a physical phone.
- Cross Campus: private repo, Next.js 16 + Supabase (RLS, SECURITY DEFINER functions), Vitest + Playwright, docs/BUILD_STATUS.md and LAUNCH_CHECKLIST.md. In progress; production Supabase/SMTP/deploy blocked on credentials.
- Bunkr (beta): private monorepo, Expo SDK 57 app, Supabase server with RLS, shared attendance/leave/SGPA maths. Academia sign-in and parser not yet verified on a real phone/account.
- Zenith Quest: public repo, live at zenithquestx.netlify.app; hackathon submission "Project Zenith: The Celestial Eye", round 1.
- Idea Graveyard: public repo, live at idea-gravyard.vercel.app.
- Rabin-Karp Algorithm Visualizer: public repo, live at rabin-karp-algorithm-visualizer.vercel.app (DAA course).
- StocksPro: local Next.js 16 dashboard running on mock data.
- Finance Visualizer: local Express + MySQL + Chart.js app.
- Algorithm Maze Solver (A* + BFS) and LexiLearn (HACK NOVA 3.0, team Cognitive Coders, 4 members): presentation decks only; no code located.
- HELIOS AI (HELIX-AI): private monorepo scaffold, one commit.
- Resume facts: PLACVS member since Feb 2025 (20+ placement processes); one-week internship at Navjyoti India Foundation (Jul 2026); SIH 2025 university-level shortlist; Ossome Hacks (GitHub Community SRMIST) participant Apr 2026; CSI SRM-KTR member; NSS outreach.
- Absent and never to be fabricated: testimonials, user counts, traction, project screenshots of apps that have no deployed web UI, HRES project material.

## Product Principles

1. Status is content: every project states what is live, what is built, and what is unfinished.
2. Proof over adjectives: link the repo, the live build, or the doc; otherwise say it is private.
3. Editable by its owner: all facts in typed config, nothing hard-coded in components.
4. Fast and readable on a phone from a shared link.

## Accessibility & Inclusion

WCAG 2.1 AA: keyboard navigation, visible focus, reduced-motion support, contrast checked.

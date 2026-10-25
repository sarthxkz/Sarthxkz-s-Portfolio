---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/work/[slug]/page.tsx"]
---

## Scope

Whole portfolio site (home `/`, case studies `/work/[slug]` for Polaris, Vybe, Cross Campus, not-found). Mode: Experience; the work leads from the first viewport. Only four projects are shown: Polaris, Vybe, Bunkr, Cross Campus (user, 2026-10-25).

## Audience and job

Recruiters and engineers skim for 30–90 s, open one project, check repo/live link, then email, LinkedIn or resume. SRMIST peers look for what he builds and how to reach him.

## Direction contract

THESIS: A dark, exact engineering portfolio where project status is first-class data (live, beta, in progress) and the work is shown as real screens or real architecture, never mock-ups. Refuses the gradient-blob hero over a three-card project grid.

OWN-WORLD: Warm graphite ground (#0D0E0E) stepped by tone (#151615, #1C1D1C, #252625), never by shadow; warm off-white ink (#EDEBE6). One accent, sodium amber (#F2A93B), reserved for "live" marks and the primary action. Status by mark form: filled dot live, ring beta, dashed ring in progress. One family, Mona Sans, width axis for display; mono only for literal code. Square corners; 1px rules only on tabular data.

STORY: Visitor learns who (CSE student, SRMIST, builds full systems), sees Polaris live in the first viewport, scrolls four project chapters with honest status, tries Bunkr's real maths, opens a case study, then contacts.

FIRST VIEWPORT: Adapted from the first contract on purpose (user asked for a stunning, fuller first screen): the name on one line across the full width (letters rise, width axis stretches), then a 5/7 split. Left: one-sentence promise, one line of who, primary "Explore my work" (amber fill) + "Contact me", then the four projects as one-line rows (mark, name, tagline, status). Right: a real Polaris screenshot on a pointer tilt, captioned "Now shipping" with its last public push date.

FORM: Pinned by the user after two re-rolls ("dark, technical, premium"), canon register at Linear/Vercel craft; seed: seed:fdb6e5a91303c7f1. Signature interaction: Work as stacked chapters. Each project is a full-height panel that sticks under the nav while the next slides over it; the covered panel settles back (scale 0.92) and dims, scrubbed to scroll (GSAP ScrollTrigger), plain stack on phones and under reduced motion. Inside: Polaris's real screens crossfade on a slow zoom with timed tabs; the other three show vertical system diagrams with packets travelling each connection. Headings rise word by word or letter by letter from behind a line mask. Live thing: Bunkr's real canSkip/needToAttend maths with an attendance bar against the 75% line.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Vybe, Bunkr, Cross Campus have no public UI: diagrams stand in for screenshots until phone screenshots are added via `stills`.

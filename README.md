# Sarthak Kumar — portfolio

Personal portfolio: Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, GSAP for the one scroll-scrubbed hero move, CSS transitions for everything else. Statically prerendered; no backend, no database, no tracking.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
```

## Edit the content

Everything a visitor reads lives in `src/content/`. Components only read from these files.

| File | What it holds |
| --- | --- |
| `src/content/profile.ts` | Name, intro, education, email and links, resume path, interests, what you're learning, About paragraphs, **your photo** |
| `src/content/projects.ts` | Every project: status, stack, links, visuals, and the two case studies |
| `src/content/experience.ts` | Skills (each with where you used it) and activities |

### Your photo

`profile.photo` controls the portrait in About. Put an image in `public/` and point `src` at it. Any aspect ratio works; it is cropped to 4:5, and `position` sets the focal point (for example `"50% 30%"`). Set `photo: null` to hide it.

### Projects

The site shows four projects: Polaris, Vybe, Bunkr and Cross Campus, in the order they appear in `projects.ts`.

- **Status** is `live`, `beta` or `in-progress`. Each has its own mark (filled dot, ring, dashed ring) and `statusNote` says why in one line.
- **`visual`**: either `screens` (real screenshots in `public/work/`; more than one plays as a slow reel with tabs) or a `diagram` (`vybe`, `cross-campus`, `bunkr`) drawn in `src/components/system-diagram.tsx` from each project's architecture notes.
- **`stills`**: extra real screenshots for a project's case study. Add phone screenshots of Vybe or Bunkr here once you have them.
- **`caseStudy`**: fields set to `null` (`why`, `learned`) stay hidden until you write them.

## Motion

- Work is a stack of chapters: each panel sticks while the next slides over it, scrubbed with GSAP ScrollTrigger (`src/components/motion/stack-scroll.tsx`). Phones and reduced motion get a plain stack.
- Headings rise from behind a line mask (`src/components/motion/split.tsx`); the footer name rises letter by letter as the footer arrives.
- Polaris's screens crossfade on a slow zoom; diagrams show packets crossing each connection.
- Every effect has a `prefers-reduced-motion` fallback, and no content is hidden when JavaScript is off.

## Deploy

Self-hosted at **https://sarthxkz.in** on the Oracle Cloud VM (161.153.37.106, arm64) next to Vybe.

- The site runs as its own container (`deploy/docker-compose.yml`, built on the VM from `Dockerfile` as a standalone Next.js server). It publishes no port.
- Vybe's Caddy owns ports 80/443 and imports `~/vybe/deploy/sites/*.caddy`; `deploy/portfolio.caddy` routes `sarthxkz.in` (and redirects `www`) to the container over Vybe's `edge` network, with automatic HTTPS.
- DNS: A records for `sarthxkz.in` and `www.sarthxkz.in` point to `161.153.37.106`.

Ship a change (Git Bash, needs `~/.ssh/bunkr_oracle`):

```bash
bash deploy/deploy.sh
```

It uploads the working tree, rebuilds the container on the VM, installs the Caddy site file, validates and reloads Caddy without downtime. Canonical URLs use `NEXT_PUBLIC_SITE_URL`, set to `https://sarthxkz.in` in the compose file.

## Design notes

- `PRODUCT.md`: product truth for the design tooling (what is real, what must never be invented).
- `DESIGN.md`: the design system as built (tokens, type, motion).
- Motion respects `prefers-reduced-motion` everywhere; content is never hidden when JavaScript is off.

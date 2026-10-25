import { Fragment, type CSSProperties } from "react";

type Kind = "Client" | "Edge" | "Service" | "Data" | "External";
type Node = { title: string; kind: Kind; note?: string; items: string[] };
type Diagram = { nodes: Node[]; links: string[] };

// Drawn from each project's own ARCHITECTURE / README docs. Each node is a real
// process or service; each link is the actual boundary between them.
const diagrams: Record<"vybe" | "cross-campus" | "bunkr", Diagram> = {
  vybe: {
    nodes: [
      {
        title: "Android app",
        kind: "Client",
        note: "Expo dev build",
        items: ["expo-router + TanStack Query", "Location task, 120 s target", "vybe-signal: Kotlin + libsignal", "SQLCipher chat history"],
      },
      { title: "Caddy", kind: "Edge", note: "TLS, auto-renew", items: ["Only public ports: 80 / 443"] },
      {
        title: "Express 5 API + ws",
        kind: "Service",
        note: "One Node process",
        items: ["auth.ts: argon2id, 15 min JWT", "authz.ts: the only access policy", "realtime.ts: authorized fan-out", "jobs.ts: 24 h location purge"],
      },
      { title: "PostgreSQL 17", kind: "Data", note: "localhost only", items: ["Prisma 7 migrations", "Private media volume"] },
    ],
    links: ["HTTPS · WSS on 443", "proxy to 127.0.0.1:3000", "local socket"],
  },
  "cross-campus": {
    nodes: [
      { title: "Browser", kind: "Client", items: ["Server Components for data pages", "Client Components for interaction"] },
      {
        title: "Next.js 16 app",
        kind: "Service",
        note: "App Router",
        items: ["proxy.ts refreshes the session", "lib/services: every DB call", "zod validation on forms"],
      },
      {
        title: "Supabase",
        kind: "Data",
        note: "The security boundary",
        items: ["Postgres RLS, default-deny", "SECURITY DEFINER functions", "Realtime filtered by RLS", "Auth and Storage"],
      },
    ],
    links: ["page requests", "user-scoped client, the caller's JWT"],
  },
  bunkr: {
    nodes: [
      { title: "Bunkr app", kind: "Client", note: "Expo SDK 57", items: ["Attendance and leave maths", "SRMIST grading and SGPA", "Secure store, opt-in"] },
      { title: "SRM Academia", kind: "External", note: "SRM's own Zoho sign-in", items: ["My Attendance, parsed on the phone"] },
      { title: "Bunkr Main Server", kind: "Data", note: "Supabase", items: ["One row set per student (RLS)", "Roles, approvals, audit log"] },
    ],
    links: ["NetID + password, only to SRM", "validated data, every 5 min"],
  },
};

// A vertical system drawing: role-tagged nodes joined by drawn tracks. Each
// track names the protocol it carries and has a packet on it (still frames
// show it mid-track; with motion allowed it travels the track on a loop).
export function SystemDiagram({ name }: { name: keyof typeof diagrams }) {
  const d = diagrams[name];
  return (
    <ol className="text-[15px]">
      {d.nodes.map((node, i) => (
        <Fragment key={node.title}>
          <li className="t-stagger-line bg-surface-2 px-4 py-4 lg:px-5" style={{ "--i": i * 2 } as CSSProperties}>
            <div className="flex items-baseline justify-between gap-4">
              <p>
                <span className="font-semibold text-ink" style={{ fontVariationSettings: '"wdth" 112' }}>
                  {node.title}
                </span>
                {node.note && <span className="text-ink-3"> · {node.note}</span>}
              </p>
              <span className="flex-none text-[15px] text-ink-3">{node.kind}</span>
            </div>
            <ul className="mt-2.5 grid gap-x-6 gap-y-1 text-ink-2 sm:grid-cols-2">
              {node.items.map((item) => (
                <li key={item} className="flex items-baseline gap-2.5">
                  <span aria-hidden className="h-1 w-1 flex-none translate-y-[-0.2em] bg-ink-3" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
          {i < d.links.length && (
            <li
              aria-hidden
              className="t-stagger-line flex h-12 items-stretch gap-3 pl-[22px]"
              style={{ "--i": i * 2 + 1 } as CSSProperties}
            >
              <span className="relative block w-[9px] flex-none">
                <svg className="absolute inset-0 h-full w-full text-ink-3" viewBox="0 0 9 48" preserveAspectRatio="none">
                  <path d="M4.5 0v42M1 37l3.5 5 3.5-5" fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="packet" style={{ "--pd": `${i * 0.7}s` } as CSSProperties} />
              </span>
              <span className="self-center text-[15px] text-ink-2">{d.links[i]}</span>
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}

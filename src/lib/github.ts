import { cacheLife } from "next/cache";

export type RepoActivity = { name: string; pushedAt: string; url: string };

// Latest pushes to public repositories. Cached for a day and captured into the
// static shell; on failure the page simply leaves the field out.
export async function getRepoActivity(user: string): Promise<Record<string, RepoActivity>> {
  "use cache";
  cacheLife("days");
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "sarthak-portfolio" },
    });
    if (!res.ok) return {};
    const repos = (await res.json()) as { name: string; pushed_at: string; html_url: string; fork: boolean }[];
    return Object.fromEntries(
      repos
        .filter((r) => !r.fork)
        .map((r) => [r.html_url.toLowerCase(), { name: r.name, pushedAt: r.pushed_at, url: r.html_url }]),
    );
  } catch {
    return {};
  }
}

export function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(iso),
  );
}

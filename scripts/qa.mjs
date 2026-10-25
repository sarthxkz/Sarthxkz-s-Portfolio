// Final QA pass against a running build. Usage: node scripts/qa.mjs [baseUrl]
// Checks every route for accessibility (axe), console errors, broken images and
// links, horizontal overflow, reduced-motion and no-JS rendering, plus headers
// and the metadata routes. Exits 1 if anything fails.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3100";
const routes = ["/", "/work/polaris", "/work/vybe", "/work/cross-campus"];
const axeSource = readFileSync(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log("  ok  ", msg);

const browser = await chromium.launch({ channel: "chrome" });

// 1. Per route at desktop: axe, console, images, links collected
const links = new Set();
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  const res = await page.goto(base + route, { waitUntil: "networkidle" });
  if (res.status() !== 200) fail(`${route} returned ${res.status()}`);
  // Scroll through so lazy images and reveals run.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(1200);
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
  );
  broken.length ? fail(`${route} broken images: ${broken.join(", ")}`) : ok(`${route} images load`);
  (await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.href))).forEach((l) => links.add(l));
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] });
    return r.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
  });
  axe.length ? fail(`${route} axe:\n      ${axe.join("\n      ")}`) : ok(`${route} axe: no violations`);
  errors.length ? fail(`${route} console errors: ${errors.join(" | ")}`) : ok(`${route} no console errors`);
  await page.close();
}

// 2. Horizontal overflow at phone, tablet, laptop
for (const width of [360, 390, 768, 1024, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    over > 0 ? fail(`${route} @${width}px overflows by ${over}px`) : ok(`${route} @${width}px no sideways scroll`);
  }
  await page.close();
}

// 3. Reduced motion and no JavaScript: content must be visible without animation
for (const [label, opts] of [
  ["reduced motion", { reducedMotion: "reduce" }],
  ["no JavaScript", { javaScriptEnabled: false }],
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const hidden = await page.evaluate(() => {
    const els = [...document.querySelectorAll("h1, h2, h3, p, img")].filter((el) => el.getBoundingClientRect().height > 0);
    return els.filter((el) => Number(getComputedStyle(el).opacity) < 0.5 && !el.closest("[aria-hidden]")).length;
  });
  hidden ? fail(`${label}: ${hidden} visible-content elements stay transparent`) : ok(`${label}: content visible`);
  await ctx.close();
}

// 4. Links (internal and external)
for (const href of links) {
  if (href.startsWith("mailto:")) continue;
  const url = new URL(href);
  if (url.hash && url.origin + url.pathname === new URL(base).origin + "/") continue;
  try {
    const r = await fetch(href, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 portfolio-qa" } });
    // LinkedIn answers bots with 999; treat it as reachable.
    if (r.status >= 400 && r.status !== 999) fail(`link ${href} -> ${r.status}`);
    else ok(`link ${href} -> ${r.status}`);
  } catch (e) {
    fail(`link ${href} -> ${e.message}`);
  }
}

// 5. Headers and metadata routes
const home = await fetch(base + "/");
for (const hdr of ["x-content-type-options", "referrer-policy", "x-frame-options", "permissions-policy", "strict-transport-security"]) {
  home.headers.get(hdr) ? ok(`header ${hdr}: ${home.headers.get(hdr)}`) : fail(`missing header ${hdr}`);
}
home.headers.get("x-powered-by") ? fail("x-powered-by is exposed") : ok("no x-powered-by");
for (const [path, want] of [
  ["/robots.txt", 200],
  ["/sitemap.xml", 200],
  ["/opengraph-image", 200],
  ["/sarthak-kumar-resume.pdf", 200],
  ["/this-page-does-not-exist", 404],
  ["/work/not-a-project", 404],
]) {
  const r = await fetch(base + path);
  r.status === want ? ok(`${path} -> ${r.status}`) : fail(`${path} -> ${r.status}, expected ${want}`);
}

await browser.close();
console.log(failures.length ? `\nFAILED (${failures.length}):\n- ${failures.join("\n- ")}` : "\nALL CHECKS PASSED");
process.exit(failures.length ? 1 : 0);

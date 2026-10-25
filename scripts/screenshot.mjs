// Full-page review screenshots with motion settled.
// Usage: node scripts/screenshot.mjs <baseUrl> <outDir> [path ...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [base = "http://localhost:3100", out = ".impeccable/review", ...paths] = process.argv.slice(2);
const routes = paths.length ? paths : ["/"];
mkdirSync(out, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ channel: "chrome" });
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    // Scroll through so every reveal fires, then return to the top.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += vp.height * 0.6) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
    await page.screenshot({ path: `${out}/${vp.name}-${slug}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${vp.name}-${slug}-fold.png` });
    console.log("captured", vp.name, route);
  }
  await page.close();
}
await browser.close();

// Viewport-sized slices down a page, for close review.
// Usage: node scripts/slices.mjs <url> <outDir> <width> <height>
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(url, { waitUntil: "networkidle" });
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += +h) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${out}/slice-${String(i++).padStart(2, "0")}.png` });
}
console.log("slices", i);
await browser.close();

"use client";

import { useEffect, useRef } from "react";

const GAP = 28; // grid spacing in CSS px
const DRIFT = 0.12; // grid moves at this fraction of the scroll, for depth
const LENS = 190; // cursor lens radius
const INK = "237, 235, 230";

// The page background: an engineering-paper dot field drawn on one fixed canvas.
// A ripple runs through it on load, a slow band of light sweeps across it, and
// around a mouse pointer the dots swell, brighten and part like a lens. It pauses
// in background tabs, idles at 30 fps, and is a single still frame under reduced
// motion. Touch devices get the field without the lens.
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    const start = performance.now();
    // Smoothed pointer (spring-ish follow) and its target.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      mouse.on += (mouse.ton - mouse.on) * 0.08;

      ctx.clearRect(0, 0, w, h);
      const offset = -((window.scrollY * DRIFT) % GAP);
      const ox = w * 0.5;
      const oy = h * 0.42;
      const rippleR = t * 900; // load ripple radius, px
      const rippleOn = !reduce && t < 2.4;

      for (let gy = offset - GAP; gy < h + GAP; gy += GAP) {
        for (let gx = GAP / 2; gx < w + GAP; gx += GAP) {
          let x = gx;
          let y = gy;
          let a = 0.12;
          let s = 1.4;

          if (!reduce) {
            // A slow diagonal band of light, about one pass every 14 s.
            const band = 0.5 + 0.5 * Math.sin((gx * 0.7 + gy) / 300 - t * 0.45);
            a += 0.11 * band ** 6;
          }
          if (rippleOn) {
            const d = Math.hypot(gx - ox, gy - oy) - rippleR;
            a += 0.45 * Math.exp(-(d * d) / (2 * 70 * 70)) * (1 - t / 2.4);
          }
          if (mouse.on > 0.01) {
            const dx = gx - mouse.x;
            const dy = gy - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < LENS) {
              const k = (1 - d / LENS) ** 2 * mouse.on;
              const push = (k * 14) / (d || 1);
              x += dx * push;
              y += dy * push;
              a += 0.5 * k;
              s += 1.6 * k;
            }
          }
          ctx.fillStyle = `rgba(${INK}, ${Math.min(0.85, a).toFixed(3)})`;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden) return;
      const active = mouse.on > 0.01 || now - start < 2500;
      if (!active && now - last < 33) return; // idle at ~30 fps
      last = now;
      draw(now);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (mouse.x < -999) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.ton = 1;
    };
    const onLeave = () => (mouse.ton = 0);
    const redrawStill = () => draw(start + 10_000);

    const onResize = () => {
      resize();
      if (reduce) redrawStill();
    };
    resize();
    window.addEventListener("resize", onResize);
    if (reduce) {
      redrawStill();
      window.addEventListener("scroll", redrawStill, { passive: true });
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", redrawStill);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden className="dot-field" />
      <div aria-hidden className="dot-vignette" />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

const DRIFT = 0.12; // the grid moves at this fraction of the scroll, for depth

// Engineering-paper dot grid behind the page. The base layer drifts slightly
// with the scroll; a brighter copy is masked to a soft circle that follows a
// mouse pointer. Values are written to these two elements only (never the root)
// so nothing else restyles. Static grid for touch and reduced motion.
export function DotGrid() {
  const base = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = base.current;
    const g = glow.current;
    if (!b || !g || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let mx = -9999;
    let my = -9999;
    const paint = () => {
      frame = 0;
      const y = `${(-window.scrollY * DRIFT).toFixed(1)}px`;
      b.style.backgroundPositionY = y;
      g.style.backgroundPositionY = y;
      g.style.setProperty("--mx", `${mx}px`);
      g.style.setProperty("--my", `${my}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      g.dataset.on = "true";
      schedule();
    };
    const onLeave = () => (g.dataset.on = "false");

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={base} aria-hidden className="dot-grid" />
      <div ref={glow} aria-hidden className="dot-grid dot-grid--glow" data-on="false" />
    </>
  );
}

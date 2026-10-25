"use client";

import { useEffect, useRef, type ReactNode } from "react";

const BURST = 640; // ms, matches the glitch keyframes in globals.css

// Slice glitch: two decorative copies of the text (an amber channel and a dim
// ghost) flash in torn horizontal bands while the base jitters. Fires once after
// the entrance, on mouse hover, and now and then while on screen. Never under
// reduced motion; the text itself is never hidden.
export function Glitch({ children, layer, firstAt = 1900 }: { children: ReactNode; layer: ReactNode; firstAt?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let busy = false;
    let visible = true;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };

    const burst = () => {
      if (busy || !visible || document.hidden) return;
      busy = true;
      el.classList.remove("is-glitching");
      void el.offsetWidth; // restart the keyframes
      el.classList.add("is-glitching");
      later(() => {
        el.classList.remove("is-glitching");
        busy = false;
      }, BURST);
    };

    // Idle bursts every 7-11 s, only while the name is on screen.
    const idle = () => later(() => {
      burst();
      idle();
    }, 7000 + Math.random() * 4000);

    later(burst, firstAt);
    idle();

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(el);
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") burst();
    };
    el.addEventListener("pointerenter", onEnter);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
      el.removeEventListener("pointerenter", onEnter);
    };
  }, [firstAt]);

  return (
    <span ref={ref} className="glitch">
      <span className="glitch-base">{children}</span>
      <span aria-hidden className="glitch-layer glitch-layer--a">
        {layer}
      </span>
      <span aria-hidden className="glitch-layer glitch-layer--b">
        {layer}
      </span>
    </span>
  );
}

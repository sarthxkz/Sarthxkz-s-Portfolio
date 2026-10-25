"use client";

import { useRef, type ReactNode } from "react";

const MAX = 7; // peak tilt in degrees at the edges: a lean, not a flip

// Card-tilt recipe (transitions.dev): the flat outer wrapper tracks a mouse
// pointer and the inner card leans toward it, easing back to flat on leave.
// Touch keeps normal scrolling, and reduced motion keeps the card flat.
export function Tilt({
  children,
  className = "",
  cardClassName = "",
}: {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  function reset() {
    const c = card.current;
    if (!c) return;
    c.classList.remove("is-tilting");
    c.style.setProperty("--tilt-rx", "0deg");
    c.style.setProperty("--tilt-ry", "0deg");
  }

  return (
    <div
      ref={outer}
      className={`t-tilt ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = outer.current!.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        const c = card.current!;
        c.classList.add("is-tilting");
        c.style.setProperty("--tilt-ry", ((px - 0.5) * MAX).toFixed(2) + "deg");
        c.style.setProperty("--tilt-rx", ((0.5 - py) * MAX).toFixed(2) + "deg");
      }}
      onPointerLeave={reset}
    >
      <div ref={card} className={`t-tilt-card ${cardClassName}`}>
        {children}
      </div>
    </div>
  );
}

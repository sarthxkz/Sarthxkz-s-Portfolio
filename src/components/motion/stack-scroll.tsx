"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV = 88; // panels stick just under the nav
const GAP = 16; // breathing room under a tall panel's foot

// Stacked chapters: on large screens each panel sticks while the next one slides
// over it; the covered panel settles back (scale) and dims (a shade layer's
// opacity), scrubbed to the scroll. A panel taller than the screen sticks by its
// foot instead of its head, so its whole content is seen before it is covered.
// Transform and opacity only. Phones and reduced motion get a plain stack.
export function StackScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".stack-panel", ref.current);
        const topOf = (panel: HTMLElement) => Math.min(NAV, window.innerHeight - panel.offsetHeight - GAP);
        const setTops = () => panels.forEach((panel) => (panel.style.top = `${topOf(panel)}px`));
        setTops();
        ScrollTrigger.addEventListener("refreshInit", setTops);

        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          if (!next) return;
          const inner = panel.querySelector<HTMLElement>(".stack-inner");
          const shade = panel.querySelector<HTMLElement>(".stack-shade");
          gsap
            .timeline({
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: () => `top top+=${topOf(next)}`,
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            })
            .to(inner, { scale: 0.92, ease: "none" }, 0)
            .to(shade, { opacity: 0.72, ease: "none" }, 0);
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", setTops);
          panels.forEach((panel) => (panel.style.top = ""));
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="stack">
      {children}
    </div>
  );
}

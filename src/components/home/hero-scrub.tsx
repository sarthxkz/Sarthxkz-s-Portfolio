"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// As the hero scrolls away the name drifts up and dims, scrubbed to the scroll
// position. Transform and opacity only; skipped entirely for reduced motion.
export function HeroScrub({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top+=64",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}

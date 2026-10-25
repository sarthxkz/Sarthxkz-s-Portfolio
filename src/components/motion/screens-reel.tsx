"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Still } from "@/content/projects";

const HOLD = 5200; // ms each screen stays up

// Real screenshots that crossfade on a slow zoom while the reel is on screen.
// Pauses on hover and focus, never auto-advances under reduced motion, and
// the tabs below jump straight to a screen.
export function ScreensReel({
  screens,
  labels,
  sizes,
  priority = false,
}: {
  screens: Still[];
  labels: string[];
  sizes: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || screens.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [screens.length]);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (!hovered.current) setActive((a) => (a + 1) % screens.length);
    }, HOLD);
    return () => window.clearTimeout(t);
  }, [running, active, screens.length]);

  return (
    <div
      ref={ref}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      onFocus={() => (hovered.current = true)}
      onBlur={() => (hovered.current = false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {screens.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes={sizes}
            priority={priority && i === 0}
            aria-hidden={i !== active}
            className="reel-frame screenshot-outline absolute inset-0 h-full w-full object-cover"
            data-active={i === active ? "true" : "false"}
          />
        ))}
      </div>
      {screens.length > 1 && (
        <div role="tablist" aria-label="Screens" className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${screens.length}, 1fr)` }}>
          {screens.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className="group relative flex min-h-11 items-start pt-3 text-left text-[15px] leading-tight text-ink-3 transition-colors duration-150 hover:text-ink aria-selected:text-ink"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-surface-3"
              />
              <span
                aria-hidden
                key={`${active}-${running}`}
                className={`reel-progress absolute inset-x-0 top-0 h-[2px] origin-left bg-ink ${
                  i === active ? (running ? "is-running" : "is-full") : ""
                }`}
                style={{ animationDuration: `${HOLD}ms` }}
              />
              {labels[i]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

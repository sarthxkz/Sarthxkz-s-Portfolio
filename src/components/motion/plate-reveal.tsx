"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Clip-path reveal for a picture, played once when it enters the viewport.
export function PlateReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`plate ${className}`} data-active={shown ? "true" : "false"}>
      {children}
    </div>
  );
}

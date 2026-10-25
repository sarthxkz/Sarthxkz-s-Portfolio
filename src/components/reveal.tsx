"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Texts-reveal recipe: children marked .t-stagger-line rise in, staggered by
// their --i index, once the block enters the viewport. `immediate` plays on mount.
export function Reveal({
  as: Tag = "div",
  className = "",
  immediate = false,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate) {
      const id = requestAnimationFrame(() => el.classList.add("is-shown"));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag ref={ref} className={`t-stagger ${className}`} {...rest}>
      {children}
    </Tag>
  );
}


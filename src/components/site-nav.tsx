"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Activities" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Slide the bar away while reading down; bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) < 6) return;
        setHidden(y > last && y > 240);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the section currently under the reading line.
  useEffect(() => {
    if (!onHome) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  function closeMenu(returnFocus = true) {
    if (!open) return;
    setOpen(false);
    setClosing(true);
    window.setTimeout(() => setClosing(false), 150);
    if (returnFocus) buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
    // closeMenu is stable enough for this effect's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="site-header sticky top-0 z-50 bg-ground" data-hidden={hidden && !open ? "true" : "false"} onFocusCapture={() => setHidden(false)}>
      <nav aria-label="Primary" className="frame flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-semibold tracking-[-0.01em] text-[17px] text-ink"
          style={{ fontVariationSettings: '"wdth" 112' }}
          onClick={() => closeMenu(false)}
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => {
            const current = onHome && active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={href(s.id)}
                  aria-current={current ? "location" : undefined}
                  className={`relative inline-flex h-11 items-center px-3 text-[15px] transition-colors duration-150 ${
                    current ? "text-ink" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-2 h-[2px] origin-left bg-ink transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      current ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          <li className="ml-3">
            <a href={profile.resume.href} className="btn btn-secondary !min-h-10 !px-4 text-[15px]" target="_blank" rel="noopener">
              Resume
            </a>
          </li>
        </ul>

        <div className="relative md:hidden">
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-secondary !min-h-11 !px-4"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            {open ? "Close" : "Menu"}
          </button>
          <div
            ref={panelRef}
            id="mobile-menu"
            className={`t-dropdown absolute right-0 top-[calc(100%+8px)] w-[min(78vw,320px)] bg-surface-2 p-2 overlay-shadow ${
              open ? "is-open" : ""
            } ${closing ? "is-closing" : ""}`}
            data-origin="top-right"
          >
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={href(s.id)}
                    onClick={() => closeMenu(false)}
                    className="flex min-h-12 items-center px-3 text-[17px] text-ink hover:bg-surface-3"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => closeMenu(false)}
                  className="flex min-h-12 items-center px-3 text-[17px] text-ink hover:bg-surface-3"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

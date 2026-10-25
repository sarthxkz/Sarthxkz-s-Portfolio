"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      className="btn btn-secondary !min-h-11 !px-4 text-[15px]"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <ArrowUp size={16} strokeWidth={2} aria-hidden />
      Back to top
    </button>
  );
}

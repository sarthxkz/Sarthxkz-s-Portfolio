"use client";

import { useEffect, useRef, useState } from "react";

// Text-morph recipe: "Copy email" -> "Copied": the shared "Cop" stays put and
// only the changing letters cross-blur while the width eases.
function morphText(el: HTMLElement & { _morphTimer?: number }, next: string) {
  const prev = el.dataset.text ?? el.textContent ?? "";
  if (prev === next) return;
  el.dataset.text = next;
  window.clearTimeout(el._morphTimer);

  let a = 0;
  while (a < prev.length && a < next.length && prev[a] === next[a]) a++;
  let b = 0;
  while (b < prev.length - a && b < next.length - a && prev[prev.length - 1 - b] === next[next.length - 1 - b]) b++;

  const swap = document.createElement("span");
  swap.className = "t-morph-swap";
  const out = document.createElement("span");
  out.className = "t-morph-old";
  out.setAttribute("aria-hidden", "true");
  out.textContent = prev.slice(a, prev.length - b);
  const inn = document.createElement("span");
  inn.className = "t-morph-new";
  inn.textContent = next.slice(a, next.length - b);
  swap.append(out, inn);

  el.textContent = "";
  el.append(next.slice(0, a), swap, next.slice(next.length - b));

  swap.style.width = out.getBoundingClientRect().width + "px";
  void swap.offsetWidth;
  swap.classList.add("is-morphing");
  swap.style.width = inn.getBoundingClientRect().width + "px";

  el._morphTimer = window.setTimeout(() => {
    el.textContent = next;
  }, 280);
}

export function CopyEmail({ email }: { email: string }) {
  const label = useRef<HTMLSpanElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (!label.current) return;
    morphText(label.current, status === "copied" ? "Copied" : status === "failed" ? "Copy failed, select it above" : "Copy email");
    if (status === "idle") return;
    const t = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(t);
  }, [status]);

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setStatus("copied");
        } catch {
          setStatus("failed");
        }
      }}
    >
      <span ref={label} className="t-morph">
        Copy email
      </span>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Email address copied" : ""}
      </span>
    </button>
  );
}

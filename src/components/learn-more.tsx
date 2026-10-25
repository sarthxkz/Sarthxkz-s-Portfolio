import Link from "next/link";
import type { ReactNode } from "react";

function Chevron() {
  return (
    <span className="t-learn-chevron" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
      </svg>
    </span>
  );
}

export function LearnMore({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `t-learn inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {children}
        <Chevron />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <Chevron />
    </Link>
  );
}

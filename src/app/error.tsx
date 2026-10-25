"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="frame flex min-h-[70vh] flex-col justify-center py-24">
      <h1 className="display text-[clamp(48px,7vw,120px)]">Something broke</h1>
      <p className="mt-6 max-w-[44ch] text-[19px] text-ink">
        This page failed to load. Try again, and if it keeps happening, email me so I can fix it.
      </p>
      <div className="mt-10">
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}

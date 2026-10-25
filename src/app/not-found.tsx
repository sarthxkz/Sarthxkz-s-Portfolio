import Link from "next/link";

export default function NotFound() {
  return (
    <section className="frame flex min-h-[70vh] flex-col justify-center py-24">
      <p className="text-[15px] text-ink-3">Error 404</p>
      <h1 className="display mt-4 text-[clamp(56px,9vw,152px)]">Not on the map</h1>
      <p className="mt-6 max-w-[44ch] text-[19px] text-ink">
        This page doesn&apos;t exist. It may have moved, or the link has a typo.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Go to the homepage
        </Link>
        <Link href="/#work" className="btn btn-secondary">
          See my work
        </Link>
      </div>
    </section>
  );
}

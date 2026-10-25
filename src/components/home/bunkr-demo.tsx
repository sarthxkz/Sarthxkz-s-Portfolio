import { Plus } from "lucide-react";
import { canSkipSource } from "@/lib/bunkr-attendance";
import { Reveal } from "@/components/reveal";
import { line } from "@/lib/line";
import { SkipCalculator } from "@/components/home/skip-calculator";
import { Split } from "@/components/motion/split";

export function BunkrDemo() {
  return (
    <section aria-labelledby="bunkr-title" className="frame mt-[var(--section-gap)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <h2 id="bunkr-title" className="heading text-[clamp(44px,5vw,88px)]">
            <Split text="Bunkr's maths" />
          </h2>
          <p {...line(1)} className="t-stagger-line mt-5 text-[19px] text-ink">
            The question every SRMIST student asks: how many more classes can I miss and stay above 75%? This runs
            the same functions as Bunkr, copied from its tested shared package.
          </p>
          <p {...line(2)} className="t-stagger-line mt-4 text-ink-2">
            Everything is integer maths with the threshold as a whole percent, so a value that lands exactly on 75% is
            never misjudged by floating-point error.
          </p>
        </Reveal>
        <div className="lg:col-span-8">
          <SkipCalculator />
          <details className="group mt-3 bg-surface-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-[15px] text-ink-2 hover:text-ink md:px-8">
              Show the function
              <Plus aria-hidden size={18} strokeWidth={2} className="transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45" />
            </summary>
            <pre className="overflow-x-auto px-5 pb-6 font-mono text-[13.5px] leading-relaxed text-ink-2 md:px-8">
              <code>{canSkipSource}</code>
            </pre>
          </details>
        </div>
      </div>
    </section>
  );
}

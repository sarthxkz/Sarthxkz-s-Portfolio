"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { canSkip, needToAttend, percentOf, riskOf } from "@/lib/bunkr-attendance";

const THRESHOLD = 75; // SRMIST's attendance requirement

// Number pop-in recipe: only the digits that changed re-enter.
// Remounting the group (key = value) replays the keyframes; the first render
// stays still.
function PopNumber({ value }: { value: string }) {
  const [state, setState] = useState({ value, prev: value, changed: false });
  if (state.value !== value) setState({ value, prev: state.value, changed: true });

  const { prev, changed } = state;
  let same = 0;
  while (same < prev.length && same < value.length && prev[same] === value[same]) same++;
  const chars = value.split("");

  return (
    <span key={value} className={`t-digit-group tabular ${changed ? "is-animating" : ""}`} aria-hidden>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="t-digit"
          data-same={i < same ? "" : undefined}
          data-stagger={chars.length > 1 && i === chars.length - 1 ? "1" : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Stepper({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  const id = useId();
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? Math.round(n) : min));
  return (
    <div>
      <label htmlFor={id} className="text-[15px] text-ink-2">
        {label}
      </label>
      <div className="mt-2 flex h-14 items-stretch bg-surface-2">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="btn !min-h-0 !px-4 text-ink-2 hover:text-ink"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
        >
          <Minus size={18} strokeWidth={2} aria-hidden />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(e.currentTarget.valueAsNumber))}
          className="tabular w-full min-w-0 bg-transparent text-center text-[22px] font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className="btn !min-h-0 !px-4 text-ink-2 hover:text-ink"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
        >
          <Plus size={18} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function SkipCalculator() {
  const [conducted, setConducted] = useState(40);
  const [attended, setAttended] = useState(34);

  const att = Math.min(attended, conducted);
  const percent = percentOf(conducted, att);
  const risk = riskOf(conducted, att, THRESHOLD);
  const skip = canSkip(conducted, att, THRESHOLD);
  const need = needToAttend(conducted, att, THRESHOLD);

  const headline = risk === "danger" ? need : skip;
  const sentence =
    risk === "danger"
      ? `Attend the next ${need} ${need === 1 ? "class" : "classes"} in a row to get back to ${THRESHOLD}%.`
      : skip === 0
        ? `You're at the line: skip one more and you drop below ${THRESHOLD}%.`
        : `You can skip ${skip} more ${skip === 1 ? "class" : "classes"} and stay at or above ${THRESHOLD}%.`;

  return (
    <div className="grid gap-8 bg-surface-1 p-5 md:grid-cols-2 md:p-8">
      <div className="space-y-5">
        <Stepper label="Classes conducted" value={conducted} min={0} max={400} onChange={(n) => {
          setConducted(n);
          if (attended > n) setAttended(n);
        }} />
        <Stepper label="Classes attended" value={att} min={0} max={conducted} onChange={setAttended} />
        <div>
          <p className="text-[15px] text-ink-3">
            Current attendance{" "}
            <span className="tabular text-ink">{Number.isInteger(percent) ? percent : percent.toFixed(1)}%</span>
            {risk === "borderline" && <span> · within 5 points of the line</span>}
          </p>
          {/* Attendance against the 75% line: the fill eases to the new value. */}
          <div className="relative mt-3 h-2.5 bg-surface-3" aria-hidden>
            <div
              className={`absolute inset-y-0 left-0 w-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                risk === "danger" ? "bg-ink-3" : "bg-ink-2"
              }`}
              style={{ transform: `scaleX(${Math.min(100, percent) / 100})` }}
            />
            <div className="absolute -inset-y-1.5 w-[2px] bg-ink" style={{ left: `${THRESHOLD}%` }} />
          </div>
          <p className="mt-1.5 text-[15px] text-ink-3" style={{ paddingLeft: `calc(${THRESHOLD}% - 1.1em)` }}>
            75%
          </p>
        </div>
      </div>

      <div className="order-first flex flex-col justify-end gap-4 bg-surface-2 p-5 md:order-none md:p-6" aria-live="polite">
        <p aria-hidden className={`display text-[clamp(88px,11vw,160px)] text-ink`}>
          <PopNumber value={String(headline)} />
        </p>
        <p className="text-[19px] text-ink">{sentence}</p>
      </div>
    </div>
  );
}

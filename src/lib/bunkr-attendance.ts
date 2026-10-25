// Copied from Bunkr: packages/shared/src/attendance.ts (unit-tested there).
// All math is integer-based with the threshold as a whole percent (e.g. 75) so values that
// land exactly on the threshold are never misjudged by floating point error.

export type Risk = "safe" | "borderline" | "danger";

/** Within this many percentage points above the threshold counts as borderline. */
export const BORDERLINE_BUFFER = 5;

function assertThreshold(threshold: number) {
  if (!Number.isInteger(threshold) || threshold < 1 || threshold > 100) {
    throw new RangeError(`threshold must be an integer in 1..100, got ${threshold}`);
  }
}

/** 100 when nothing has been conducted yet: nothing missed. */
export function percentOf(conducted: number, attended: number): number {
  return conducted === 0 ? 100 : (100 * attended) / conducted;
}

/** Largest N such that attended / (conducted + N) stays at or above the threshold. */
export function canSkip(conducted: number, attended: number, threshold: number): number {
  assertThreshold(threshold);
  return Math.max(0, Math.floor((100 * attended - threshold * conducted) / threshold));
}

/** Smallest N such that (attended + N) / (conducted + N) reaches the threshold. Infinity if unreachable. */
export function needToAttend(conducted: number, attended: number, threshold: number): number {
  assertThreshold(threshold);
  if (threshold === 100) return attended < conducted ? Infinity : 0;
  return Math.max(0, Math.ceil((threshold * conducted - 100 * attended) / (100 - threshold)));
}

export function riskOf(conducted: number, attended: number, threshold: number): Risk {
  assertThreshold(threshold);
  if (100 * attended < threshold * conducted) return "danger";
  if (100 * attended < (threshold + BORDERLINE_BUFFER) * conducted) return "borderline";
  return "safe";
}

// Shown on the page as the real source.
export const canSkipSource = `/** Largest N such that attended / (conducted + N) stays at or above the threshold. */
export function canSkip(conducted: number, attended: number, threshold: number): number {
  assertThreshold(threshold);
  return Math.max(0, Math.floor((100 * attended - threshold * conducted) / threshold));
}`;

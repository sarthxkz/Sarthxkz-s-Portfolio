import type { CSSProperties } from "react";

// Props for one line of a <Reveal> block: the stagger index drives its delay.
export const line = (i: number) => ({ className: "t-stagger-line", style: { "--i": i } as CSSProperties });

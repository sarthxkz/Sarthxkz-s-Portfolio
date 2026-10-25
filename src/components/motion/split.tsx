import { Fragment, type CSSProperties } from "react";

// Line-mask reveal: each word (or letter) sits in an overflow-hidden box and
// rises into place when the enclosing <Reveal> is shown. Screen readers get the
// plain text once; the animated copy is hidden from them.
export function Split({
  text,
  by = "word",
  delay = 0,
  step = by === "char" ? 32 : 55,
  decorative = false,
}: {
  text: string;
  by?: "word" | "char";
  delay?: number;
  step?: number;
  // Already hidden from assistive tech by its parent: skip the plain-text copy.
  decorative?: boolean;
}) {
  const words = text.split(" ");
  let index = 0;
  return (
    <>
      {!decorative && <span className="sr-only">{text}</span>}
      <span aria-hidden className="split">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="split-word">
              {by === "word" ? (
                <span className="split-unit">
                  <span style={{ "--sd": `${delay + index++ * step}ms` } as CSSProperties}>{word}</span>
                </span>
              ) : (
                word.split("").map((ch, ci) => (
                  <span key={ci} className="split-unit">
                    <span style={{ "--sd": `${delay + index++ * step}ms` } as CSSProperties}>{ch}</span>
                  </span>
                ))
              )}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}

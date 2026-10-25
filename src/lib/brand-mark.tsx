// The site's mark: a bold off-white "s" (for sarthxkz) on the graphite ground,
// with the amber "live" dot. Rendered to PNG by app/icon.tsx and app/apple-icon.tsx.
export function BrandMark({ size }: { size: number }) {
  const u = size / 32;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c1116",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#edebe6",
          fontSize: 30 * u,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: -1 * u,
          marginTop: -4 * u,
        }}
      >
        s
      </div>
      <div
        style={{
          position: "absolute",
          right: 5 * u,
          bottom: 5 * u,
          width: 6 * u,
          height: 6 * u,
          borderRadius: 3 * u,
          background: "#f2a93b",
        }}
      />
    </div>
  );
}

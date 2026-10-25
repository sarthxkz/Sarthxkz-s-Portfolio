import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, student developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1116",
          color: "#edebe6",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a9aeb3" }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#f2a93b" }} />
          B.Tech CSE · SRMIST Kattankulathur · 2028
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>Sarthak</div>
          <div style={{ fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>Kumar</div>
        </div>
        <div style={{ fontSize: 32, color: "#edebe6", maxWidth: 900 }}>{profile.headline}</div>
      </div>
    ),
    size,
  );
}

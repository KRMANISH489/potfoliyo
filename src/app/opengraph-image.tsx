import { ImageResponse } from "next/og";

export const alt = "CodAbhi | Full Stack Developer & SEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          <span style={{ color: "#22d3ee" }}>Cod</span>
          <span style={{ color: "#ffffff" }}>Abhi</span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#e2e8f0" }}>
          Full Stack Developer & SEO
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 28, color: "#94a3b8" }}>
          New Delhi, India
        </div>
      </div>
    ),
    { ...size }
  );
}

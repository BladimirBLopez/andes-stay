import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(to top, #1b2a3a, #28405a)",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#d1795a", marginBottom: 16, display: "flex" }}>
          La Paz, Bolivia
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, color: "#f2ebe1", lineHeight: 1.15, maxWidth: 900, display: "flex" }}>
          Su apartamento, administrado sin que usted mueva un dedo.
        </div>
        <div style={{ fontSize: 24, color: "#f2ebe1", opacity: 0.75, marginTop: 24, display: "flex" }}>
          ★ 4.69 · 160 reseñas · Andes Stay
        </div>
      </div>
    ),
    { ...size }
  );
}

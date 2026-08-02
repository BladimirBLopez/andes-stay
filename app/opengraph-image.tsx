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
          background: "linear-gradient(to top, #121212, #1f1f1f)",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#c9a227", marginBottom: 16, display: "flex" }}>
          La Paz, Bolivia
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, color: "#f7f4ec", lineHeight: 1.15, maxWidth: 900, display: "flex" }}>
          VIP Estadías — Alojamientos que te hacen sentir en casa
        </div>
        <div style={{ fontSize: 24, color: "#f7f4ec", opacity: 0.75, marginTop: 24, display: "flex" }}>
          Apartamentos amoblados en Sopocachi
        </div>
      </div>
    ),
    { ...size }
  );
}

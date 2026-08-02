import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/elegante-exterior-1";

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
          position: "relative",
        }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(18,18,18,0.95), rgba(18,18,18,0.3))",
          }}
        />
        <div style={{ position: "relative", padding: 80, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#c9a227", marginBottom: 16, display: "flex" }}>
            La Paz, Bolivia
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, color: "#f7f4ec", lineHeight: 1.15, maxWidth: 900, display: "flex" }}>
            VIP Estadías — Departamentos que te hacen sentir en casa
          </div>
          <div style={{ fontSize: 24, color: "#f7f4ec", opacity: 0.75, marginTop: 24, display: "flex" }}>
            Apartamentos amoblados en Sopocachi
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

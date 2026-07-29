import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b2a3a",
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#b85c38",
            fontFamily: "serif",
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}

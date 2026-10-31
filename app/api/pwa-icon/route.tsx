import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const s = Number(new URL(req.url).searchParams.get("s"));
  const size = s === 512 ? 512 : 192;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121212",
        }}
      >
        <span
          style={{
            fontSize: Math.round(size * 0.55),
            fontWeight: 700,
            color: "#c9a227",
            fontFamily: "serif",
          }}
        >
          V
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}

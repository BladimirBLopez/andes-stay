import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Falta ANTHROPIC_API_KEY en Vercel" }, { status: 500 });
  }
  const b = await req.json().catch(() => ({}));
  const src = {
    nombre: String(b.nombre ?? ""),
    titulo: String(b.titulo ?? ""),
    detalle: String(b.detalle ?? ""),
    descripcion: String(b.descripcion ?? ""),
  };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 2500,
        messages: [
          {
            role: "user",
            content:
              "Traduce del español al inglés el texto de un alojamiento turístico en La Paz, Bolivia. Tono cálido y profesional, sin inventar datos. Mantén nombres propios y los saltos de párrafo. Responde SOLO un JSON con las mismas claves (nombre, titulo, detalle, descripcion), sin comillas de código.\n\n" +
              JSON.stringify(src),
          },
        ],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Traductor respondió ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    const texto = String(data?.content?.[0]?.text ?? "").replace(/```json|```/g, "").trim();
    const out = JSON.parse(texto);
    return NextResponse.json({
      nombre: String(out.nombre ?? ""),
      titulo: String(out.titulo ?? ""),
      detalle: String(out.detalle ?? ""),
      descripcion: String(out.descripcion ?? ""),
    });
  } catch {
    return NextResponse.json({ error: "No se pudo traducir" }, { status: 502 });
  }
}

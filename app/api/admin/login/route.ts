import { NextResponse } from "next/server";
import { crearSesion } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ password: "" }));
  const password = String(body.password ?? "").trim();
  if (!password || password !== (process.env.ADMIN_PASSWORD ?? "").trim()) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Clave incorrecta" }, { status: 401 });
  }
  await crearSesion();
  return NextResponse.json({ ok: true });
}

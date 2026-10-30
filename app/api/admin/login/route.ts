import { NextResponse } from "next/server";
import { crearSesion } from "@/lib/auth";

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Falta ADMIN_PASSWORD en Vercel" }, { status: 500 });
  }
  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ error: "Falta JWT_SECRET en Vercel" }, { status: 500 });
  }
  const body = await req.json().catch(() => ({ password: "" }));
  const password = String(body.password ?? "").trim();
  if (!password || password !== process.env.ADMIN_PASSWORD.trim()) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Clave incorrecta" }, { status: 401 });
  }
  try {
    await crearSesion();
  } catch (e) {
    return NextResponse.json({ error: "No se pudo crear la sesión" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const p = process.env.ADMIN_PASSWORD;
  return NextResponse.json({
    tieneAdminPassword: !!p,
    largoAdminPassword: p ? p.length : 0,
    tieneJwtSecret: !!process.env.JWT_SECRET,
    tieneDatabaseUrl: !!process.env.DATABASE_URL,
  });
}

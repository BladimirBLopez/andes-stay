import { NextResponse } from "next/server";
import { crearSesion } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX = 5;
const VENTANA_MIN = 15;

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "desconocida").split(",")[0].trim();
  const fallos = await prisma.$queryRaw<{ n: number }[]>`
    SELECT COUNT(*)::int AS n FROM "LoginIntento"
    WHERE "ip" = ${ip} AND "createdAt" > now() - (${VENTANA_MIN} * interval '1 minute')`;
  if ((fallos[0]?.n ?? 0) >= MAX) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos." },
      { status: 429, headers: { "Retry-After": String(VENTANA_MIN * 60) } }
    );
  }
  const body = await req.json().catch(() => ({ password: "" }));
  const password = String(body.password ?? "").trim();
  if (!password || password !== process.env.ADMIN_PASSWORD.trim()) {
    await prisma.$executeRaw`INSERT INTO "LoginIntento" ("ip") VALUES (${ip})`;
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Clave incorrecta" }, { status: 401 });
  }
  await prisma.$executeRaw`DELETE FROM "LoginIntento" WHERE "ip" = ${ip}`;
  await crearSesion();
  return NextResponse.json({ ok: true });
}

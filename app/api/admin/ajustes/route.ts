import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refrescar } from "@/lib/refrescar";

export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}));
  const v = String(body.whatsapp ?? "").replace(/\D/g, "");
  if (v.length < 8 || v.length > 15) {
    return NextResponse.json({ error: "Número inválido" }, { status: 400 });
  }
  try {
    await prisma.$executeRaw`INSERT INTO "Ajuste" ("clave", "valor") VALUES ('whatsapp', ${v}) ON CONFLICT ("clave") DO UPDATE SET "valor" = EXCLUDED."valor", "updatedAt" = now()`;
    return refrescar({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}

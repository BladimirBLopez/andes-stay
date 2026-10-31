import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { refrescar } from "@/lib/refrescar";

const TEXTOS = ["nombreEs", "nombreEn", "tituloEs", "tituloEn", "detalleEs", "detalleEn", "zona", "descripcionEs", "descripcionEn"];
const NUMEROS = ["huespedes", "habitaciones", "camas", "banos", "orden"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, string | number | boolean | null> = {};
  for (const k of TEXTOS) if (typeof body[k] === "string") data[k] = body[k];
  for (const k of NUMEROS) {
    if (body[k] !== undefined && Number.isFinite(Number(body[k]))) data[k] = Math.trunc(Number(body[k]));
  }
  if (typeof body.activo === "boolean") data.activo = body.activo;
  if (body.rating !== undefined) data.rating = body.rating ? String(body.rating) : null;
  try {
    await prisma.apartamento.update({
      where: { id: Number(id) },
      data: data as Prisma.ApartamentoUpdateInput,
    });
    return refrescar({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.apartamento.delete({ where: { id: Number(id) } });
    return refrescar({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo borrar" }, { status: 500 });
  }
}

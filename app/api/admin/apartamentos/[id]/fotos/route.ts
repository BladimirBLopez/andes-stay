import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refrescar } from "@/lib/refrescar";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const apartamentoId = Number((await params).id);
  const b = await req.json().catch(() => ({}));
  if (!b.publicId || typeof b.publicId !== "string") {
    return NextResponse.json({ error: "Falta publicId" }, { status: 400 });
  }
  const max = await prisma.foto.aggregate({ where: { apartamentoId }, _max: { orden: true } });
  await prisma.foto.create({
    data: {
      apartamentoId,
      publicId: b.publicId,
      categoria: typeof b.categoria === "string" ? b.categoria : "sala",
      numero: b.numero ? Number(b.numero) : null,
      orden: (max._max.orden ?? 0) + 1,
    },
  });
  return refrescar({ ok: true });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const apartamentoId = Number((await params).id);
  const { fotoId, dir, categoria, numero } = await req.json().catch(() => ({}));
  if (typeof categoria === "string") {
    const validas = ["sala", "cocina", "comedor", "habitacion", "bano", "exterior", "lavado", "mas_fotos"];
    if (!validas.includes(categoria)) {
      return NextResponse.json({ error: "Categoría inválida" }, { status: 400 });
    }
    const n = numero ? Math.trunc(Number(numero)) : null;
    if (n !== null && (!Number.isFinite(n) || n < 1)) {
      return NextResponse.json({ error: "Número inválido" }, { status: 400 });
    }
    await prisma.foto.updateMany({
      where: { id: Number(fotoId), apartamentoId },
      data: { categoria, numero: n },
    });
    return refrescar({ ok: true });
  }
  const fotos = await prisma.foto.findMany({
    where: { apartamentoId },
    orderBy: [{ orden: "asc" }, { id: "asc" }],
  });
  const i = fotos.findIndex((f) => f.id === Number(fotoId));
  const j = dir === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= fotos.length) return refrescar({ ok: true });
  [fotos[i], fotos[j]] = [fotos[j], fotos[i]];
  await prisma.$transaction(
    fotos.map((f, idx) => prisma.foto.update({ where: { id: f.id }, data: { orden: idx + 1 } }))
  );
  return refrescar({ ok: true });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const apartamentoId = Number((await params).id);
  const { fotoId } = await req.json().catch(() => ({}));
  await prisma.foto.deleteMany({ where: { id: Number(fotoId), apartamentoId } });
  return refrescar({ ok: true });
}

export async function PUT(req: Request, { params }: Ctx) {
  const apartamentoId = Number((await params).id);
  const { ids } = await req.json().catch(() => ({}));
  if (!Array.isArray(ids)) return NextResponse.json({ error: "Falta ids" }, { status: 400 });
  const existentes = await prisma.foto.findMany({ where: { apartamentoId }, select: { id: true } });
  const validos = new Set(existentes.map((f) => f.id));
  const lista = ids.map(Number).filter((id) => validos.has(id));
  await prisma.$transaction(
    lista.map((id, idx) => prisma.foto.update({ where: { id }, data: { orden: idx + 1 } }))
  );
  return refrescar({ ok: true });
}

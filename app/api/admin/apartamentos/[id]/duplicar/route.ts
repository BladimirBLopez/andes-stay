import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refrescar } from "@/lib/refrescar";

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await prisma.apartamento.findUnique({
    where: { id: Number(id) },
    include: { fotos: { orderBy: [{ orden: "asc" }, { id: "asc" }] } },
  });
  if (!o) return NextResponse.json({ error: "No existe" }, { status: 404 });

  const nombre = `${o.nombreEs} (copia)`;
  const base = slugify(nombre) || "apartamento-copia";
  let slug = base;
  for (let n = 2; await prisma.apartamento.findUnique({ where: { slug } }); n++) {
    slug = `${base}-${n}`;
  }
  const max = await prisma.apartamento.aggregate({ _max: { orden: true } });

  try {
    const a = await prisma.apartamento.create({
      data: {
        slug,
        nombreEs: nombre,
        nombreEn: "",
        tituloEs: o.tituloEs,
        tituloEn: "",
        detalleEs: o.detalleEs,
        detalleEn: "",
        zona: o.zona,
        rating: null,
        huespedes: o.huespedes,
        habitaciones: o.habitaciones,
        camas: o.camas,
        banos: o.banos,
        descripcionEs: o.descripcionEs,
        descripcionEn: "",
        activo: false,
        orden: (max._max.orden ?? 0) + 1,
        fotos: {
          create: o.fotos.map((f, i) => ({
            publicId: f.publicId,
            categoria: f.categoria,
            numero: f.numero,
            orden: i + 1,
          })),
        },
      },
    });
    return refrescar({ ok: true, id: a.id });
  } catch {
    return NextResponse.json({ error: "No se pudo duplicar" }, { status: 500 });
  }
}

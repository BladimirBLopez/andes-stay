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

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const nombre = typeof b.nombre === "string" ? b.nombre.trim() : "";
  if (!nombre) return NextResponse.json({ error: "Falta el nombre" }, { status: 400 });

  const base = slugify(nombre) || "apartamento";
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
        tituloEs: nombre,
        activo: false,
        orden: (max._max.orden ?? 0) + 1,
      },
    });
    return refrescar({ ok: true, id: a.id });
  } catch {
    return NextResponse.json({ error: "No se pudo crear" }, { status: 500 });
  }
}

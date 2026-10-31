import { NextResponse } from "next/server";
import { guardarAmenidades } from "@/lib/amenidades";
import { refrescar } from "@/lib/refrescar";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));
  if (!Array.isArray(b.amenidades)) {
    return NextResponse.json({ error: "Falta amenidades" }, { status: 400 });
  }
  try {
    await guardarAmenidades(Number(id), b.amenidades);
    return refrescar({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}

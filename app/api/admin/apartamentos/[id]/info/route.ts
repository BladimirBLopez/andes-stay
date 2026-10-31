import { NextResponse } from "next/server";
import { guardarInfo } from "@/lib/info";
import { refrescar } from "@/lib/refrescar";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  try {
    await guardarInfo(Number(id), b);
    return refrescar({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}

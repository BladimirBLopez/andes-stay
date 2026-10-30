import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormApto from "./Form";

export const dynamic = "force-dynamic";

export default async function EditarApto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.apartamento.findUnique({ where: { id: Number(id) } });
  if (!a) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 max-w-2xl mx-auto">
      <Link href="/admin" className="text-sm underline">← Volver</Link>
      <h1 className="text-xl font-semibold mt-3">{a.nombreEs}</h1>
      <Link href={`/admin/apartamentos/${a.id}/fotos`} className="inline-block text-sm underline mb-5">Administrar fotos →</Link>
      <FormApto
        initial={{
          id: a.id,
          nombreEs: a.nombreEs,
          nombreEn: a.nombreEn,
          tituloEs: a.tituloEs,
          tituloEn: a.tituloEn,
          detalleEs: a.detalleEs,
          detalleEn: a.detalleEn,
          zona: a.zona,
          rating: a.rating ?? "",
          huespedes: a.huespedes,
          habitaciones: a.habitaciones,
          camas: a.camas,
          banos: a.banos,
          descripcionEs: a.descripcionEs,
          descripcionEn: a.descripcionEn,
          activo: a.activo,
          orden: a.orden,
        }}
      />
    </main>
  );
}

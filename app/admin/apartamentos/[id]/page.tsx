import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormApto from "./Form";
import AptoHeader from "./AptoHeader";
import BorrarApto from "./BorrarApto";

export const dynamic = "force-dynamic";

export default async function EditarApto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.apartamento.findUnique({
    where: { id: Number(id) },
    include: { _count: { select: { fotos: true } } },
  });
  if (!a) notFound();

  return (
    <main className="px-5 py-8 max-w-2xl mx-auto">
      <AptoHeader id={a.id} nombre={a.nombreEs} activo={a.activo} fotos={a._count.fotos} />
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
      <div className="mt-2 mb-40">
        <BorrarApto id={a.id} nombre={a.nombreEs} />
      </div>
    </main>
  );
}

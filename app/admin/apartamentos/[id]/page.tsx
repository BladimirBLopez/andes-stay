import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormApto from "./Form";
import AptoHeader from "./AptoHeader";
import BorrarApto from "./BorrarApto";
import AccionesApto from "./AccionesApto";
import AmenidadesApto from "./Amenidades";
import { getAmenidades } from "@/lib/amenidades";
import InfoApto from "./InfoApto";
import Listo from "./Listo";
import { infoVacia } from "@/lib/infoCatalogo";
import { getInfo } from "@/lib/info";

export const dynamic = "force-dynamic";

export default async function EditarApto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.apartamento.findUnique({
    where: { id: Number(id) },
    include: { _count: { select: { fotos: true } } },
  });
  if (!a) notFound();
  const amenidades = await getAmenidades(a.id);
  const info = await getInfo(a.id);
  const items = [
    { ok: a._count.fotos >= 5, label: "5 fotos o más" },
    { ok: a.descripcionEs.trim().length > 0, label: "Descripción" },
    { ok: a.detalleEs.trim().length > 0, label: "Frase corta" },
    { ok: Array.isArray(amenidades) ? amenidades.length > 0 : Boolean(amenidades), label: "Amenidades" },
    { ok: !infoVacia(info), label: "Reglas y cómo llegar" },
  ];

  return (
    <main className="px-5 py-8 max-w-2xl mx-auto">
      <AptoHeader id={a.id} nombre={a.nombreEs} activo={a.activo} fotos={a._count.fotos} />
      <AccionesApto id={a.id} slug={a.slug} nombre={a.nombreEs} activo={a.activo} />
      <Listo items={items} />
      <nav className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-3 mb-2 [scrollbar-width:none]">
        {[["publicacion", "Publicación"], ["informacion", "Información"], ["capacidad", "Capacidad"], ["descripcion", "Descripción"], ["amenidades", "Amenidades"], ["reglas", "Reglas"]].map(([h, t]) => (
          <a key={h} href={`#${h}`} className="shrink-0 text-sm px-4 py-2 rounded-full bg-white border border-noche/10 text-noche/70 shadow-sm">{t}</a>
        ))}
      </nav>
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
      <div className="space-y-5 mt-5">
        <AmenidadesApto id={a.id} inicial={amenidades} />
        <InfoApto id={a.id} inicial={info} />
      </div>
      <div className="mt-8 mb-40">
        <BorrarApto id={a.id} nombre={a.nombreEs} />
      </div>
    </main>
  );
}

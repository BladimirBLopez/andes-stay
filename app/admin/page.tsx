import { prisma } from "@/lib/prisma";
import NuevoApto from "./NuevoApto";
import ListaAptos from "./ListaAptos";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const aptos = await prisma.apartamento.findMany({
    orderBy: [{ orden: "asc" }, { id: "asc" }],
    include: {
      _count: { select: { fotos: true } },
      fotos: { orderBy: [{ orden: "asc" }, { id: "asc" }], take: 1 },
    },
  });
  const totalFotos = aptos.reduce((s, a) => s + a._count.fotos, 0);
  const activos = aptos.filter((a) => a.activo).length;

  const stats: [number, string][] = [
    [aptos.length, "Total"],
    [activos, "Publicados"],
    [aptos.length - activos, "Ocultos"],
    [totalFotos, "Fotos"],
  ];

  return (
    <main className="px-5 pt-6 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-noche/50">Hola, Wilmer</p>
      <h1 className="font-display text-3xl text-noche mb-5">Tus apartamentos</h1>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {stats.map(([n, l]) => (
          <div key={l} className="bg-white rounded-2xl py-3 text-center shadow-sm">
            <p className="font-display text-2xl text-noche leading-none">{n}</p>
            <p className="text-[10px] uppercase tracking-wide text-noche/50 mt-1.5">{l}</p>
          </div>
        ))}
      </div>

      <NuevoApto />

      <ListaAptos
        aptos={aptos.map((a) => ({
          id: a.id,
          slug: a.slug,
          nombreEs: a.nombreEs,
          detalleEs: a.detalleEs,
          descripcionEs: a.descripcionEs,
          zona: a.zona,
          huespedes: a.huespedes,
          habitaciones: a.habitaciones,
          banos: a.banos,
          activo: a.activo,
          nFotos: a._count.fotos,
          portada: a.fotos[0]?.publicId ?? null,
        }))}
      />
    </main>
  );
}

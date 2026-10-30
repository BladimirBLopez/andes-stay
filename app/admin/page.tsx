import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const thumb = (id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_240,h_240,c_fill/${encodeURI(id)}`;

export default async function AdminHome() {
  const aptos = await prisma.apartamento.findMany({
    orderBy: { orden: "asc" },
    include: {
      _count: { select: { fotos: true } },
      fotos: { orderBy: [{ orden: "asc" }, { id: "asc" }], take: 1 },
    },
  });
  const totalFotos = aptos.reduce((s, a) => s + a._count.fotos, 0);
  const activos = aptos.filter((a) => a.activo).length;

  return (
    <main className="px-5 py-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl text-noche">Apartamentos</h1>
      <div className="grid grid-cols-3 gap-3 mt-5 mb-6">
        {[
          [aptos.length, "Total"],
          [activos, "Activos"],
          [totalFotos, "Fotos"],
        ].map(([n, l]) => (
          <div key={l} className="bg-white border border-noche/10 rounded-xl py-3 text-center">
            <p className="font-display text-3xl text-oro leading-none">{n}</p>
            <p className="text-xs text-noche/60 mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {aptos.map((a) => (
          <div key={a.id} className="bg-white border border-noche/10 rounded-2xl p-3 flex gap-3 shadow-sm">
            {a.fotos[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumb(a.fotos[0].publicId)} alt={a.nombreEs} className="w-24 h-24 rounded-xl object-cover bg-noche/5 shrink-0" />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-noche/5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-xl text-noche leading-tight">{a.nombreEs}</h2>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                    a.activo ? "bg-salvia/20 text-salvia" : "bg-noche/10 text-noche/60"
                  }`}
                >
                  {a.activo ? "Activo" : "Oculto"}
                </span>
              </div>
              <p className="text-sm text-noche/60 truncate">{a.detalleEs} · {a.zona}</p>
              <p className="text-xs text-noche/50 mt-1">
                {a.huespedes} huéspedes · {a.habitaciones} hab · {a.banos} baños · {a._count.fotos} fotos
              </p>
              <div className="flex gap-2 mt-2">
                <Link href={`/admin/apartamentos/${a.id}`} className="text-sm bg-noche text-hueso rounded-lg px-4 py-1.5">
                  Editar
                </Link>
                <Link href={`/admin/apartamentos/${a.id}/fotos`} className="text-sm border border-noche/20 text-noche rounded-lg px-4 py-1.5">
                  Fotos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

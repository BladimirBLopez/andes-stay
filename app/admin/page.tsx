import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NuevoApto from "./NuevoApto";
import SwitchPublicado from "./SwitchPublicado";
import { Pencil, Images, ExternalLink, BedDouble, Bath, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const portada = (id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_800,h_450,c_fill,g_auto/${encodeURI(id)}`;

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

      <div className="space-y-5">
        {aptos.map((a) => (
          <article key={a.id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="relative aspect-[16/9] bg-noche/10">
              {a.fotos[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={portada(a.fotos[0].publicId)} alt={a.nombreEs} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-noche/70 via-transparent to-transparent" />
              <span
                className={`absolute top-3 left-3 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur ${
                  a.activo ? "bg-salvia text-white" : "bg-noche/70 text-hueso"
                }`}
              >
                {a.activo ? "● Publicado" : "○ Oculto"}
              </span>
              <span className="absolute top-3 right-3 text-[11px] bg-noche/70 text-hueso px-3 py-1 rounded-full backdrop-blur">
                {a._count.fotos} fotos
              </span>
              <h2 className="absolute bottom-3 left-4 right-4 font-display text-2xl text-hueso leading-tight">{a.nombreEs}</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-noche/60 truncate">{a.detalleEs} · {a.zona}</p>
              <div className="flex gap-4 text-xs text-noche/60 mt-2">
                <span className="flex items-center gap-1"><Users size={13} /> {a.huespedes}</span>
                <span className="flex items-center gap-1"><BedDouble size={13} /> {a.habitaciones}</span>
                <span className="flex items-center gap-1"><Bath size={13} /> {a.banos}</span>
              </div>
              <SwitchPublicado id={a.id} activo={a.activo} />
              <div className="grid grid-cols-3 gap-2 mt-3">
                <Link href={`/admin/apartamentos/${a.id}`} className="flex items-center justify-center gap-1.5 bg-noche text-hueso rounded-xl py-2.5 text-sm font-medium">
                  <Pencil size={14} /> Editar
                </Link>
                <Link href={`/admin/apartamentos/${a.id}/fotos`} className="flex items-center justify-center gap-1.5 bg-oro/15 text-noche rounded-xl py-2.5 text-sm font-medium">
                  <Images size={14} /> Fotos
                </Link>
                <a href={`/apartamentos/${a.slug}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 border border-noche/15 text-noche rounded-xl py-2.5 text-sm font-medium">
                  <ExternalLink size={14} /> Ver
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

"use client";

import { useMemo, useState, type ComponentProps } from "react";
import Link from "next/link";
import SwitchPublicado from "./SwitchPublicado";
import { Pencil, Images, ExternalLink, BedDouble, Bath, Users, Search, X, CheckCircle2, AlertTriangle } from "lucide-react";

const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const portada = (id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_800,h_450,c_fill,g_auto/${encodeURI(id)}`;

type Id = ComponentProps<typeof SwitchPublicado>["id"];
type Apto = {
  id: Id;
  slug: string;
  nombreEs: string;
  detalleEs: string | null;
  descripcionEs: string | null;
  zona: string | null;
  huespedes: number;
  habitaciones: number;
  banos: number;
  activo: boolean;
  nFotos: number;
  portada: string | null;
};

const ORDENES = [
  ["manual", "Mi orden"],
  ["nombre", "A–Z"],
  ["ocultos", "Ocultos primero"],
  ["fotos", "Más fotos"],
] as const;
type Orden = (typeof ORDENES)[number][0];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function faltan(a: Apto): string[] {
  const f: string[] = [];
  if (!a.descripcionEs?.trim()) f.push("descripción");
  if (a.nFotos === 0) f.push("fotos");
  if (!a.detalleEs?.trim()) f.push("frase corta");
  return f;
}

function Completitud({ a }: { a: Apto }) {
  const f = faltan(a);
  const pct = Math.round(((3 - f.length) / 3) * 100);
  const listo = f.length === 0;
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className={`flex items-center gap-1 font-medium ${listo ? "text-salvia" : "text-noche/70"}`}>
          {listo ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} className="text-oro" />}
          {pct}% completo
        </span>
        {!listo && <span className="text-noche/50 truncate ml-2">Falta: {f.join(", ")}</span>}
      </div>
      <div className="h-1.5 rounded-full bg-noche/10 overflow-hidden">
        <div className={`h-full rounded-full ${listo ? "bg-salvia" : "bg-oro"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ListaAptos({ aptos }: { aptos: Apto[] }) {
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<Orden>("manual");
  const incompletos = aptos.filter((a) => faltan(a).length > 0);

  const lista = useMemo(() => {
    const t = norm(q.trim());
    const f = t
      ? aptos.filter((a) => norm(`${a.nombreEs} ${a.detalleEs ?? ""} ${a.zona ?? ""} ${a.slug}`).includes(t))
      : [...aptos];
    if (orden === "nombre") f.sort((a, b) => a.nombreEs.localeCompare(b.nombreEs, "es"));
    if (orden === "ocultos") f.sort((a, b) => Number(a.activo) - Number(b.activo));
    if (orden === "fotos") f.sort((a, b) => b.nFotos - a.nFotos);
    return f;
  }, [aptos, q, orden]);

  return (
    <>
      {incompletos.length > 0 && (
        <div className="bg-oro/10 border border-oro/30 rounded-2xl p-4 mb-4">
          <p className="text-sm font-medium text-noche flex items-center gap-2 mb-2">
            <AlertTriangle size={15} className="text-oro" />
            {incompletos.length} {incompletos.length === 1 ? "apartamento por completar" : "apartamentos por completar"}
          </p>
          <div className="flex flex-wrap gap-2">
            {incompletos.map((a) => (
              <Link
                key={a.id}
                href={`/admin/apartamentos/${a.id}`}
                className="text-xs bg-white rounded-full px-3 py-1.5 shadow-sm text-noche"
              >
                {a.nombreEs} · falta {faltan(a).join(", ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative mb-3">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-noche/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar apartamento..."
          className="w-full bg-white rounded-2xl shadow-sm pl-10 pr-10 py-3 text-base text-noche outline-none focus:ring-2 focus:ring-oro/50"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Borrar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-noche/50">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-3">
        {ORDENES.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setOrden(k)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full ${
              orden === k ? "bg-noche text-hueso" : "bg-white text-noche/70 shadow-sm"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <p className="text-xs text-noche/50 mb-4">
        Mostrando {lista.length} de {aptos.length}
      </p>

      {lista.length === 0 && (
        <p className="text-center text-sm text-noche/50 py-10">Sin resultados para “{q}”.</p>
      )}

      <div className="space-y-5">
        {lista.map((a) => (
          <article key={a.id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="relative aspect-[16/9] bg-noche/10">
              {a.portada && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={portada(a.portada)} alt={a.nombreEs} className="absolute inset-0 w-full h-full object-cover" />
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
                {a.nFotos} fotos
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
              <Completitud a={a} />
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
    </>
  );
}

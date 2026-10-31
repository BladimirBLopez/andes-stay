"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function AptoHeader({
  id,
  nombre,
  activo,
  fotos,
}: {
  id: number;
  nombre: string;
  activo: boolean;
  fotos: number;
}) {
  const pathname = usePathname();
  const enFotos = pathname.endsWith("/fotos");
  const tab = "flex-1 text-center py-2.5 text-sm font-medium rounded-xl transition-colors";

  return (
    <div className="mb-5">
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-noche/60 mb-2">
        <ChevronLeft size={16} /> Apartamentos
      </Link>
      <div className="flex items-start justify-between gap-3 mb-4">
        <h1 className="font-display text-3xl text-noche leading-tight">{nombre}</h1>
        <span
          className={`text-[11px] font-medium px-3 py-1 rounded-full shrink-0 mt-1 ${
            activo ? "bg-salvia/20 text-salvia" : "bg-noche/10 text-noche/60"
          }`}
        >
          {activo ? "● Publicado" : "○ Oculto"}
        </span>
      </div>
      <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm">
        <Link href={`/admin/apartamentos/${id}`} className={`${tab} ${!enFotos ? "bg-noche text-hueso" : "text-noche/60"}`}>
          Datos
        </Link>
        <Link href={`/admin/apartamentos/${id}/fotos`} className={`${tab} ${enFotos ? "bg-noche text-hueso" : "text-noche/60"}`}>
          Fotos · {fotos}
        </Link>
      </div>
    </div>
  );
}

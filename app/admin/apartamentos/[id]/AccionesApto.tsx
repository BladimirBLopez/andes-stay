"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";
import Confirmar from "../../Confirmar";

export default function AccionesApto({
  id,
  slug,
  nombre,
  activo,
}: {
  id: number;
  slug: string;
  nombre: string;
  activo: boolean;
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function duplicar() {
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}/duplicar`, { method: "POST" }).catch(() => null);
    const d = res ? await res.json().catch(() => ({})) : {};
    setCargando(false);
    if (!res || !res.ok) {
      setAbierto(false);
      falla(res, "No se pudo duplicar");
      return;
    }
    toast.success("Copia creada (oculta)");
    router.push(`/admin/apartamentos/${d.id}`);
    router.refresh();
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {activo ? (
          <a
            href={`/apartamentos/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 text-sm font-medium text-noche shadow-sm"
          >
            <ExternalLink size={15} /> Ver cómo queda
          </a>
        ) : (
          <button
            type="button"
            onClick={() => toast("Está oculto: publícalo para verlo en el sitio")}
            className="flex items-center justify-center gap-2 bg-white rounded-xl py-3 text-sm font-medium text-noche/40 shadow-sm"
          >
            <ExternalLink size={15} /> Ver cómo queda
          </button>
        )}
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="flex items-center justify-center gap-2 bg-oro/15 rounded-xl py-3 text-sm font-medium text-noche"
        >
          <Copy size={15} /> Duplicar
        </button>
      </div>
      <Confirmar
        open={abierto}
        onOpenChange={setAbierto}
        titulo="¿Duplicar apartamento?"
        descripcion={`Se crea una copia oculta de "${nombre}" con sus datos y fotos. Después la editas y la publicas.`}
        confirmarTexto="Sí, duplicar"
        cargando={cargando}
        onConfirm={duplicar}
      />
    </>
  );
}

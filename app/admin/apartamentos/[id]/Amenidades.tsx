"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { Seccion, BotonGuardar } from "./ui";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";
import { CATALOGO } from "@/lib/amenidadesCatalogo";

export default function AmenidadesApto({ id, inicial }: { id: number; inicial: string[] }) {
  const router = useRouter();
  const [sel, setSel] = useState<string[]>(inicial);
  const [guardado, setGuardado] = useState<string[]>(inicial);
  const [cargando, setCargando] = useState(false);

  const sucio = [...sel].sort().join(",") !== [...guardado].sort().join(",");

  function alternar(k: string) {
    setSel((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  }

  async function guardar() {
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}/amenidades`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amenidades: sel }),
    }).catch(() => null);
    setCargando(false);
    if (!res || !res.ok) return falla(res, "No se pudieron guardar las amenidades");
    setGuardado(sel);
    toast.success("Amenidades guardadas");
    router.refresh();
  }

  return (
    <Seccion id="amenidades" titulo="Amenidades" sub="Toca para activar o quitar. Se muestran en la página del apartamento." icono={<Sparkles size={18} />} sucio={sucio}>
      <div className="flex flex-wrap gap-2">
        {CATALOGO.map((c) => {
          const on = sel.includes(c.k);
          return (
            <button
              key={c.k}
              type="button"
              onClick={() => alternar(c.k)}
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-full border transition-colors ${
                on ? "bg-noche text-hueso border-noche" : "bg-white text-noche/70 border-noche/20"
              }`}
            >
              {on && <Check size={14} className="text-oro" />}
              {c.es}
            </button>
          );
        })}
      </div>
      <BotonGuardar onClick={guardar} sucio={sucio} cargando={cargando} texto="Guardar amenidades" ok="Amenidades guardadas" />
    </Seccion>
  );
}

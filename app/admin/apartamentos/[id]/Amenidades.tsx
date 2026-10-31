"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
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
    <section className="bg-white border border-noche/10 rounded-2xl p-4 space-y-4 shadow-sm mb-5">
      <h2 className="font-display text-2xl text-noche">Amenidades</h2>
      <p className="text-xs text-noche/50 -mt-2">Toca para activar o quitar. Se muestran en la página del apartamento.</p>
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
      <button
        type="button"
        onClick={guardar}
        disabled={!sucio || cargando}
        className="w-full bg-oro/15 text-noche rounded-xl py-3 text-sm font-medium disabled:opacity-40"
      >
        {cargando ? "Guardando..." : sucio ? "Guardar amenidades" : "Amenidades guardadas"}
      </button>
    </section>
  );
}

"use client";

import { useState } from "react";

type Apto = {
  id: number;
  nombreEs: string; nombreEn: string;
  tituloEs: string; tituloEn: string;
  detalleEs: string; detalleEn: string;
  zona: string; rating: string;
  huespedes: number; habitaciones: number; camas: number; banos: number;
  descripcionEs: string; descripcionEn: string;
  activo: boolean; orden: number;
};

const TEXTOS: [keyof Apto, string, boolean][] = [
  ["nombreEs", "Nombre corto (ES)", false],
  ["nombreEn", "Nombre corto (EN)", false],
  ["tituloEs", "Título largo (ES)", false],
  ["tituloEn", "Título largo (EN)", false],
  ["detalleEs", "Detalle tarjeta (ES)", false],
  ["detalleEn", "Detalle tarjeta (EN)", false],
  ["zona", "Zona", false],
  ["rating", "Rating (ej. 4.5 · 6 reseñas)", false],
  ["descripcionEs", "Descripción (ES) · párrafos separados por línea en blanco", true],
  ["descripcionEn", "Descripción (EN) · párrafos separados por línea en blanco", true],
];

const NUMEROS: [keyof Apto, string][] = [
  ["huespedes", "Huéspedes"],
  ["habitaciones", "Habitaciones"],
  ["camas", "Camas"],
  ["banos", "Baños"],
  ["orden", "Orden"],
];

export default function FormApto({ initial }: { initial: Apto }) {
  const [f, setF] = useState<Apto>(initial);
  const [estado, setEstado] = useState("");
  const [guardando, setGuardando] = useState(false);

  function set<K extends keyof Apto>(k: K, v: Apto[K]) {
    setF((p) => ({ ...p, [k]: v }));
    setEstado("");
  }

  async function guardar() {
    setGuardando(true);
    setEstado("");
    const res = await fetch(`/api/admin/apartamentos/${f.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    setGuardando(false);
    setEstado(res.ok ? "Guardado ✓" : `Error ${res.status}`);
  }

  const campo = "w-full border border-noche/20 rounded-lg px-3 py-2 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro";

  return (
    <div className="space-y-4 pb-24">
      {TEXTOS.map(([k, label, largo]) => (
        <label key={k} className="block">
          <span className="text-sm text-noche/70">{label}</span>
          {largo ? (
            <textarea
              rows={8}
              className={campo}
              value={f[k] as string}
              onChange={(e) => set(k, e.target.value as Apto[typeof k])}
            />
          ) : (
            <input
              className={campo}
              value={f[k] as string}
              onChange={(e) => set(k, e.target.value as Apto[typeof k])}
            />
          )}
        </label>
      ))}

      <div className="grid grid-cols-2 gap-3">
        {NUMEROS.map(([k, label]) => (
          <label key={k} className="block">
            <span className="text-sm text-noche/70">{label}</span>
            <input
              type="number"
              className={campo}
              value={f[k] as number}
              onChange={(e) => set(k, Number(e.target.value) as Apto[typeof k])}
            />
          </label>
        ))}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={f.activo}
          onChange={(e) => set("activo", e.target.checked)}
          className="w-5 h-5"
        />
        <span>Activo (visible en el sitio)</span>
      </label>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-noche/10 p-4 flex items-center justify-between gap-3 max-w-2xl mx-auto">
        <span className="text-sm text-noche/70">{estado}</span>
        <button
          onClick={guardar}
          disabled={guardando}
          className="bg-noche text-hueso rounded-lg px-6 py-3 font-medium disabled:opacity-50"
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}

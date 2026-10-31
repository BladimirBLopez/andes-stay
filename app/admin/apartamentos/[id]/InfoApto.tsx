"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";
import type { Info } from "@/lib/infoCatalogo";

const campo =
  "w-full border border-noche/20 rounded-xl px-3 py-2.5 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro";

function Campo({ label, ayuda, children }: { label: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-noche/80">{label}</span>
      {children}
      {ayuda && <span className="block text-xs text-noche/50 mt-1">{ayuda}</span>}
    </label>
  );
}

export default function InfoApto({ id, inicial }: { id: number; inicial: Info }) {
  const router = useRouter();
  const [f, setF] = useState<Info>(inicial);
  const [guardado, setGuardado] = useState<Info>(inicial);
  const [cargando, setCargando] = useState(false);
  const sucio = JSON.stringify(f) !== JSON.stringify(guardado);

  function set<K extends keyof Info>(k: K, v: Info[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function guardar() {
    if (f.mapa.trim() && !/^https:\/\//i.test(f.mapa.trim())) {
      toast.error("El enlace del mapa debe empezar con https://");
      return;
    }
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}/info`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    }).catch(() => null);
    setCargando(false);
    if (!res || !res.ok) return falla(res, "No se pudo guardar la información");
    setGuardado(f);
    toast.success("Información guardada");
    router.refresh();
  }

  const opciones = (
    <>
      <option value="">No indicar</option>
      <option value="si">Permitido</option>
      <option value="no">No permitido</option>
    </>
  );

  return (
    <section className="bg-white border border-noche/10 rounded-2xl p-4 space-y-4 shadow-sm mb-5">
      <h2 className="font-display text-2xl text-noche">Reglas y cómo llegar</h2>
      <p className="text-xs text-noche/50 -mt-2">Solo se muestra en el sitio lo que llenes.</p>

      <div className="grid grid-cols-2 gap-3">
        <Campo label="Hora de entrada">
          <input type="time" className={campo} value={f.entrada} onChange={(e) => set("entrada", e.target.value)} />
        </Campo>
        <Campo label="Hora de salida">
          <input type="time" className={campo} value={f.salida} onChange={(e) => set("salida", e.target.value)} />
        </Campo>
        <Campo label="Mascotas">
          <select className={campo} value={f.mascotas} onChange={(e) => set("mascotas", e.target.value as Info["mascotas"])}>
            {opciones}
          </select>
        </Campo>
        <Campo label="Fiestas">
          <select className={campo} value={f.fiestas} onChange={(e) => set("fiestas", e.target.value as Info["fiestas"])}>
            {opciones}
          </select>
        </Campo>
      </div>

      <Campo label="Nota adicional" ayuda="Ej. No fumar dentro del apartamento. Silencio después de las 22:00.">
        <textarea rows={3} className={campo} value={f.nota} onChange={(e) => set("nota", e.target.value)} />
      </Campo>

      <Campo label="Dirección o referencia" ayuda="Ej. Calle Rosendo Gutiérrez, cerca de la plaza Avaroa">
        <input className={campo} value={f.direccion} onChange={(e) => set("direccion", e.target.value)} />
      </Campo>

      <Campo label="Enlace de Google Maps" ayuda="Pega el enlace que te da Maps con Compartir. Debe empezar con https://">
        <input
          className={campo}
          inputMode="url"
          value={f.mapa}
          placeholder="https://maps.app.goo.gl/..."
          onChange={(e) => set("mapa", e.target.value)}
        />
      </Campo>

      <button
        type="button"
        onClick={guardar}
        disabled={!sucio || cargando}
        className="w-full bg-oro/15 text-noche rounded-xl py-3 text-sm font-medium disabled:opacity-40"
      >
        {cargando ? "Guardando..." : sucio ? "Guardar información" : "Información guardada"}
      </button>
    </section>
  );
}

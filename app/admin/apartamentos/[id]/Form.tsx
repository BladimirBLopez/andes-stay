"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";

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

const campo =
  "w-full border border-noche/20 rounded-lg px-3 py-2.5 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro";

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-noche/10 rounded-2xl p-4 space-y-4 shadow-sm">
      <h2 className="font-display text-2xl text-noche">{titulo}</h2>
      {children}
    </section>
  );
}

function Campo({ label, ayuda, error, children }: { label: string; ayuda?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-noche/80">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-600 mt-1">{error}</span> : ayuda && <span className="block text-xs text-noche/50 mt-1">{ayuda}</span>}
    </label>
  );
}

export default function FormApto({ initial }: { initial: Apto }) {
  const [f, setF] = useState<Apto>(initial);
  const [estado, setEstado] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState<Apto>(initial);
  const [intento, setIntento] = useState(false);
  const sucio = JSON.stringify(f) !== JSON.stringify(guardado);
  const errores: Partial<Record<keyof Apto, string>> = {};
  if (!f.nombreEs.trim()) errores.nombreEs = "El nombre es obligatorio";
  if (!f.tituloEs.trim()) errores.tituloEs = "El título es obligatorio";
  if (f.huespedes < 1) errores.huespedes = "Mínimo 1";
  if (f.habitaciones < 0) errores.habitaciones = "No puede ser negativo";
  if (f.camas < 0) errores.camas = "No puede ser negativo";
  if (f.banos < 0) errores.banos = "No puede ser negativo";
  const hayErrores = Object.keys(errores).length > 0;
  useEffect(() => {
    if (!sucio) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [sucio]);

  function set<K extends keyof Apto>(k: K, v: Apto[K]) {
    setF((p) => ({ ...p, [k]: v }));
    setEstado("");
  }

  async function guardar() {
    setIntento(true);
    if (hayErrores) {
      toast.error("Revisa los campos en rojo");
      return;
    }
    setGuardando(true);
    setEstado("Guardando...");
    const datos = f;
    const aviso = "";
    const res = await fetch(`/api/admin/apartamentos/${f.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    }).catch(() => null);
    setGuardando(false);
    if (res && res.ok) {
      setF(datos);
      setGuardado(datos);
      toast.success("Cambios guardados");
    } else {
      falla(res, "No se pudo guardar, intenta de nuevo");
    }
  }

  return (
    <div className="space-y-5 pb-44">
      <Seccion titulo="Información">
        <Campo label="Nombre" ayuda="Se muestra en la tarjeta del sitio" error={intento ? errores.nombreEs : undefined}>
          <input className={campo} value={f.nombreEs} onChange={(e) => set("nombreEs", e.target.value)} />
        </Campo>
        <Campo label="Título de la página" ayuda="Título largo, también aparece en Google" error={intento ? errores.tituloEs : undefined}>
          <input className={campo} value={f.tituloEs} onChange={(e) => set("tituloEs", e.target.value)} />
        </Campo>
        <Campo label="Frase corta" ayuda="Debajo del nombre en la tarjeta">
          <input className={campo} value={f.detalleEs} onChange={(e) => set("detalleEs", e.target.value)} />
        </Campo>
        <div className="grid grid-cols-2 gap-3">
          <Campo label="Zona">
            <input className={campo} value={f.zona} onChange={(e) => set("zona", e.target.value)} />
          </Campo>
          <Campo label="Calificación">
            <input className={campo} value={f.rating} placeholder="4.5 · 6 reseñas" onChange={(e) => set("rating", e.target.value)} />
          </Campo>
        </div>
      </Seccion>

      <Seccion titulo="Capacidad">
        <div className="grid grid-cols-2 gap-3">
          {([
            ["huespedes", "Huéspedes"],
            ["habitaciones", "Habitaciones"],
            ["camas", "Camas"],
            ["banos", "Baños"],
          ] as const).map(([k, label]) => (
            <div key={k} className="rounded-xl border border-noche/15 p-3">
              <span className="text-sm font-medium text-noche/80">{label}</span>
              <div className="flex items-center justify-between mt-2">
                <button type="button" aria-label={`Menos ${label}`} onClick={() => set(k, Math.max(k === "huespedes" ? 1 : 0, f[k] - 1))} className="w-11 h-11 rounded-full bg-noche/5 text-xl active:bg-noche/10">−</button>
                <span className="font-display text-3xl text-noche">{f[k]}</span>
                <button type="button" aria-label={`Más ${label}`} onClick={() => set(k, f[k] + 1)} className="w-11 h-11 rounded-full bg-noche text-hueso text-xl">+</button>
              </div>
              {intento && errores[k] && <span className="block text-xs text-red-600 mt-1">{errores[k]}</span>}
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion titulo="Descripción">
        <Campo label="Texto" ayuda={`Deja una línea en blanco entre párrafos · ${f.descripcionEs.length} caracteres`}>
          <textarea
            rows={10}
            className={campo}
            value={f.descripcionEs}
            onChange={(e) => set("descripcionEs", e.target.value)}
          />
        </Campo>
      </Seccion>

      <Seccion titulo="Publicación">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-noche">{f.activo ? "Visible en el sitio" : "Oculto"}</p>
            <p className="text-xs text-noche/50">Si lo ocultas, no aparece en la web</p>
          </div>
          <button
            type="button"
            onClick={() => set("activo", !f.activo)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${f.activo ? "bg-oro" : "bg-noche/20"}`}
            aria-label="Cambiar visibilidad"
          >
            <span className={`block w-6 h-6 bg-white rounded-full transition-transform ${f.activo ? "translate-x-6" : ""}`} />
          </button>
        </div>
        <Campo label="Posición en la lista" ayuda="1 aparece primero">
          <input
            type="number"
            inputMode="numeric"
            className={campo}
            value={f.orden}
            onChange={(e) => set("orden", Number(e.target.value))}
          />
        </Campo>
      </Seccion>


      <div className="fixed inset-x-0 bottom-[calc(3.9rem+env(safe-area-inset-bottom))] z-40 bg-white/95 backdrop-blur border-t border-noche/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <span className="text-sm text-noche/70 flex items-center gap-2">{sucio && <span className="w-2 h-2 rounded-full bg-oro shrink-0" />}{estado || (sucio ? "Cambios sin guardar" : "Todo guardado")}</span>
          <button
            onClick={guardar}
            disabled={guardando}
            className="bg-noche text-hueso rounded-lg px-8 py-3 font-medium disabled:opacity-50"
          >
            {guardando ? "Espera..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

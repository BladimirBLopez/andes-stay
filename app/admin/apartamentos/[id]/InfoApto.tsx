"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";
import type { Info } from "@/lib/infoCatalogo";
import { MapPin } from "lucide-react";
import { campo, Campo, Seccion, BotonGuardar } from "./ui";

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
    <Seccion id="reglas" titulo="Reglas y cómo llegar" sub="Entrada, salida, reglas y dirección. Por ahora solo se guarda aquí; no se muestra en el sitio." icono={<MapPin size={18} />} sucio={sucio}>

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

      <BotonGuardar onClick={guardar} sucio={sucio} cargando={cargando} texto="Guardar información" ok="Información guardada" />
    </Seccion>
  );
}

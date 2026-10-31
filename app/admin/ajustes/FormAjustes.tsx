"use client";

import { useState } from "react";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";

export default function FormAjustes({ inicial }: { inicial: string }) {
  const [num, setNum] = useState(inicial);
  const [guardado, setGuardado] = useState(inicial);
  const [cargando, setCargando] = useState(false);
  const limpio = num.replace(/\D/g, "");
  const error = limpio.length < 8 || limpio.length > 15 ? "Escribe el número con código de país, solo dígitos" : "";
  const cambio = limpio !== guardado;

  async function guardar() {
    if (error) {
      toast.error("Revisa el número");
      return;
    }
    setCargando(true);
    const res = await fetch("/api/admin/ajustes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp: limpio }),
    }).catch(() => null);
    setCargando(false);
    if (!res || !res.ok) {
      falla(res, "No se pudo guardar el número");
      return;
    }
    setNum(limpio);
    setGuardado(limpio);
    toast.success("WhatsApp actualizado");
  }

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <label className="block text-sm font-medium text-noche mb-1">WhatsApp de reservas</label>
      <p className="text-xs text-noche/60 mb-3">
        Es el número al que llegan los mensajes de los huéspedes desde todo el sitio. Con código de país, sin + ni espacios (ej. 59176570041).
      </p>
      <input
        value={num}
        onChange={(e) => setNum(e.target.value)}
        inputMode="numeric"
        className="w-full rounded-xl border border-noche/15 px-4 py-3 text-base text-noche outline-none focus:ring-2 focus:ring-oro/50"
      />
      {error && cambio && <p className="text-xs text-red-600 mt-2">{error}</p>}
      <div className="flex gap-2 mt-4">
        <button
          onClick={guardar}
          disabled={!cambio || !!error || cargando}
          className="flex-1 bg-noche text-hueso rounded-xl py-3 text-sm font-medium disabled:opacity-40"
        >
          {cargando ? "Guardando..." : "Guardar"}
        </button>
        {!error && (
          <a
            href={`https://wa.me/${limpio}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center border border-noche/15 text-noche rounded-xl py-3 text-sm font-medium"
          >
            Probar enlace
          </a>
        )}
      </div>
    </div>
  );
}

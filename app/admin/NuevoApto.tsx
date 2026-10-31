"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function NuevoApto() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function crear() {
    if (!nombre.trim()) return setError("Escribe un nombre");
    setCargando(true);
    setError("");
    const res = await fetch("/api/admin/apartamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    }).catch(() => null);
    const d = res ? await res.json().catch(() => ({})) : {};
    setCargando(false);
    if (!res || !res.ok) return setError(!res ? "Sin conexión. Revisa tu internet" : res.status === 401 ? "Tu sesión venció. Entra de nuevo al login" : d.error ?? "No se pudo crear");
    router.push(`/admin/apartamentos/${d.id}`);
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-oro/60 text-noche rounded-3xl py-4 font-medium mb-5"
      >
        <Plus size={18} /> Nuevo apartamento
      </button>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm mb-5 space-y-3">
      <p className="font-display text-xl text-noche">Nuevo apartamento</p>
      <input
        autoFocus
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre (ej. Garzonier Central)"
        className="w-full border border-noche/20 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-noche/50">Se crea oculto. Completa los datos, sube fotos y luego publícalo.</p>
      <div className="flex gap-2">
        <button
          onClick={() => { setAbierto(false); setError(""); setNombre(""); }}
          className="flex-1 border border-noche/20 rounded-xl py-2.5 text-sm"
        >
          Cancelar
        </button>
        <button
          onClick={crear}
          disabled={cargando}
          className="flex-1 bg-noche text-hueso rounded-xl py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {cargando ? "Creando..." : "Crear"}
        </button>
      </div>
    </div>
  );
}

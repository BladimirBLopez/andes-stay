"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function BorrarApto({ id, nombre }: { id: number; nombre: string }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function borrar() {
    if (!confirm(`¿Borrar "${nombre}" y todas sus fotos de la base? Esto no se puede deshacer.`)) return;
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setCargando(false);
      alert("No se pudo borrar");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={borrar}
      disabled={cargando}
      className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 rounded-xl py-3 text-sm font-medium disabled:opacity-50"
    >
      <Trash2 size={16} /> {cargando ? "Borrando..." : "Borrar apartamento"}
    </button>
  );
}

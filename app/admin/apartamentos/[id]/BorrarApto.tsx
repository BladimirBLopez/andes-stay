"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";
import Confirmar from "../../Confirmar";

export default function BorrarApto({ id, nombre }: { id: number; nombre: string }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function borrar() {
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setCargando(false);
      setAbierto(false);
      falla(res, "No se pudo borrar");
      return;
    }
    toast.success("Apartamento borrado");
    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 rounded-xl py-3 text-sm font-medium"
      >
        <Trash2 size={16} /> Borrar apartamento
      </button>
      <Confirmar
        open={abierto}
        onOpenChange={setAbierto}
        titulo="¿Borrar apartamento?"
        descripcion={`Se borra "${nombre}" y sus fotos de la base. Las imágenes quedan en Cloudinary. No se puede deshacer.`}
        confirmarTexto="Sí, borrar"
        cargando={cargando}
        onConfirm={borrar}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Switch from "@radix-ui/react-switch";
import { toast } from "sonner";
import { falla } from "@/lib/mensajes";

export default function SwitchPublicado({ id, activo }: { id: number; activo: boolean }) {
  const router = useRouter();
  const [on, setOn] = useState(activo);
  const [cargando, setCargando] = useState(false);

  async function cambiar(v: boolean) {
    setOn(v);
    setCargando(true);
    const res = await fetch(`/api/admin/apartamentos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: v }),
    }).catch(() => null);
    setCargando(false);
    if (!res || !res.ok) {
      setOn(!v);
      falla(res, "No se pudo cambiar el estado");
      return;
    }
    toast.success(v ? "Publicado en el sitio" : "Oculto del sitio");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between gap-3 mt-3 py-2.5 px-3 bg-[#f1eee6] rounded-xl">
      <span className="text-sm font-medium text-noche">{on ? "Visible en el sitio" : "Oculto"}</span>
      <Switch.Root
        checked={on}
        disabled={cargando}
        onCheckedChange={cambiar}
        aria-label="Publicar o ocultar"
        className="w-12 h-7 rounded-full bg-noche/20 data-[state=checked]:bg-oro transition-colors disabled:opacity-60"
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow translate-x-1 transition-transform data-[state=checked]:translate-x-6" />
      </Switch.Root>
    </div>
  );
}

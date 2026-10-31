"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Globe, LogOut, Settings, Download } from "lucide-react";
import { toast } from "sonner";

type EventoInstalar = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function BottomNav() {
  const pathname = usePathname();
  const enAjustes = pathname.startsWith("/admin/ajustes");
  const inicio = pathname.startsWith("/admin") && !enAjustes;
  const base = "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium";

  const [evento, setEvento] = useState<EventoInstalar | null>(null);
  const [instalada, setInstalada] = useState(true);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalada(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const antes = (e: Event) => {
      e.preventDefault();
      setEvento(e as EventoInstalar);
    };
    const despues = () => {
      setEvento(null);
      setInstalada(true);
      toast.success("App instalada");
    };
    window.addEventListener("beforeinstallprompt", antes);
    window.addEventListener("appinstalled", despues);
    return () => {
      window.removeEventListener("beforeinstallprompt", antes);
      window.removeEventListener("appinstalled", despues);
    };
  }, []);

  async function instalar() {
    if (evento) {
      await evento.prompt();
      await evento.userChoice;
      setEvento(null);
      return;
    }
    if (ios) {
      toast("En iPhone: toca Compartir y luego “Agregar a pantalla de inicio”", { duration: 7000 });
      return;
    }
    toast("Espera un momento y vuelve a intentar. Si no aparece, usa el menú ⋮ del navegador", { duration: 6000 });
  }

  const mostrarInstalar = !instalada;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-noche border-t border-oro/40 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto flex">
        <Link href="/admin" className={`${base} ${inicio ? "text-oro" : "text-hueso/60"}`}>
          <LayoutGrid size={20} />
          Apartamentos
        </Link>
        <Link href="/admin/ajustes" className={`${base} ${enAjustes ? "text-oro" : "text-hueso/60"}`}>
          <Settings size={20} />
          Ajustes
        </Link>
        <a href="/" target="_blank" rel="noreferrer" className={`${base} text-hueso/60`}>
          <Globe size={20} />
          Ver sitio
        </a>
        {mostrarInstalar && (
          <button type="button" onClick={instalar} className={`${base} text-oro`}>
            <Download size={20} />
            Instalar
          </button>
        )}
        <form action="/api/admin/logout" method="post" className="flex-1 flex">
          <button className={`${base} w-full text-hueso/60`}>
            <LogOut size={20} />
            Salir
          </button>
        </form>
      </div>
    </nav>
  );
}

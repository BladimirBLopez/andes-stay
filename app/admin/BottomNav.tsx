"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Globe, LogOut } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const inicio = pathname.startsWith("/admin");
  const base = "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium";

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-noche border-t border-oro/40 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto flex">
        <Link href="/admin" className={`${base} ${inicio ? "text-oro" : "text-hueso/60"}`}>
          <LayoutGrid size={20} />
          Apartamentos
        </Link>
        <a href="/" target="_blank" rel="noreferrer" className={`${base} text-hueso/60`}>
          <Globe size={20} />
          Ver sitio
        </a>
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

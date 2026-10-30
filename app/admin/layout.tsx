import Link from "next/link";
import Image from "next/image";
import { haySesion } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const logueado = await haySesion();
  if (!logueado) return <>{children}</>;

  return (
    <div className="min-h-screen bg-hueso">
      <header className="sticky top-0 z-50 bg-noche text-hueso border-b-2 border-oro">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/vip-estadias-logo-icon.png" alt="VIP Estadías" width={120} height={40} className="h-8 w-auto" />
            <span className="font-display text-xl tracking-wide leading-none">PANEL</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="text-hueso/80 hover:text-oro">Ver sitio ↗</a>
            <form action="/api/admin/logout" method="post">
              <button className="text-oro hover:text-hueso">Salir</button>
            </form>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

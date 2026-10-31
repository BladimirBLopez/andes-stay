import type { Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { haySesion } from "@/lib/auth";
import BottomNav from "./BottomNav";
import { Toaster } from "sonner";

export const viewport: Viewport = { themeColor: "#121212" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const logueado = await haySesion();
  if (!logueado) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f1eee6] pb-24">
      <header className="sticky top-0 z-40 bg-noche text-hueso">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/vip-estadias-logo-icon.png" alt="VIP Estadías" width={120} height={40} className="h-8 w-auto" />
            <div className="leading-none">
              <span className="font-display text-lg tracking-wide block">VIP ESTADÍAS</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-oro">Panel</span>
            </div>
          </Link>
        </div>
      </header>
      {children}
      <BottomNav />
      <Toaster position="top-center" richColors />
    </div>
  );
}

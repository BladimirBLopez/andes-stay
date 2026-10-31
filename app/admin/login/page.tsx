"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginAdmin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [ver, setVer] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res && res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }
    if (!res) setError("Sin conexión. Revisa tu internet e intenta de nuevo.");
    else if (res.status === 401) setError("Clave incorrecta. Intenta de nuevo.");
    else if (res.status === 429) setError("Demasiados intentos. Espera unos minutos.");
    else setError("No se pudo entrar. Intenta de nuevo en un momento.");
    setCargando(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-[radial-gradient(ellipse_at_top,#2a2410_0%,#121212_60%)]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <Image src="/vip-estadias-logo-icon.png" alt="VIP Estadías" width={160} height={50} className="h-14 w-auto mb-4" priority />
          <h1 className="font-display text-4xl text-hueso tracking-wide">VIP ESTADÍAS</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-oro mt-2">Panel de administración</p>
        </div>

        <form onSubmit={entrar} className="bg-hueso rounded-3xl p-6 shadow-2xl space-y-4">
          <div>
            <label htmlFor="clave" className="text-sm font-medium text-noche/80">Clave de acceso</label>
            <div className="relative mt-1.5">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-noche/40" />
              <input
                id="clave"
                type={ver ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
                autoFocus
                className="w-full border border-noche/20 rounded-xl pl-11 pr-12 py-3 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro"
              />
              <button
                type="button"
                onClick={() => setVer(!ver)}
                aria-label={ver ? "Ocultar clave" : "Mostrar clave"}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-noche/50"
              >
                {ver ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-3 py-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={cargando || !password}
            className="w-full bg-noche text-hueso rounded-xl py-3.5 font-medium disabled:opacity-50"
          >
            {cargando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-hueso/40 mt-6">Acceso solo para el anfitrión</p>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginAdmin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
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
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error ? `${d.error} (${res.status})` : `Error ${res.status}`);
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-noche px-6">
      <form onSubmit={entrar} className="w-full max-w-sm bg-hueso rounded-2xl p-7 shadow-2xl space-y-5 border-t-4 border-oro">
        <div className="flex flex-col items-center gap-2">
          <Image src="/vip-estadias-logo-icon.png" alt="VIP Estadías" width={160} height={50} className="h-12 w-auto" priority />
          <h1 className="font-display text-3xl text-noche">Panel de administración</h1>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Clave de acceso"
          className="w-full border border-noche/20 rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro"
          autoFocus
        />
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={cargando || !password}
          className="w-full bg-noche text-hueso rounded-lg py-3 font-medium hover:bg-noche-light disabled:opacity-50"
        >
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

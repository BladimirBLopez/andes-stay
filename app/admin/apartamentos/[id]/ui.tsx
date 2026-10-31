import type { ReactNode } from "react";

export const campo =
  "w-full mt-1 border border-noche/15 rounded-xl px-3.5 py-3 text-base bg-white placeholder:text-noche/30 focus:outline-none focus:border-oro focus:ring-2 focus:ring-oro/30";

export function Seccion({ id, titulo, sub, icono, sucio, children }: { id?: string; titulo: string; sub?: string; icono?: ReactNode; sucio?: boolean; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-4 bg-white border border-noche/10 rounded-2xl shadow-sm overflow-hidden">
      <header className="flex items-center gap-3 px-4 py-3.5 border-b border-noche/10 bg-hueso/60">
        {icono && <span className="w-9 h-9 rounded-xl bg-noche text-oro flex items-center justify-center shrink-0">{icono}</span>}
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl text-noche leading-tight">{titulo}</h2>
          {sub && <p className="text-xs text-noche/50 mt-0.5">{sub}</p>}
        </div>
        {sucio && <span className="text-[11px] font-medium text-oro bg-oro/15 rounded-full px-2.5 py-1 shrink-0">Sin guardar</span>}
      </header>
      <div className="p-4 space-y-4">{children}</div>
    </section>
  );
}

export function Campo({ label, ayuda, error, children }: { label: string; ayuda?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-noche/80">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-600 mt-1">{error}</span> : ayuda && <span className="block text-xs text-noche/50 mt-1">{ayuda}</span>}
    </label>
  );
}

export function BotonGuardar({ onClick, sucio, cargando, texto, ok }: { onClick: () => void; sucio: boolean; cargando: boolean; texto: string; ok: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!sucio || cargando}
      className={`w-full rounded-xl py-3.5 text-sm font-medium transition-colors ${sucio ? "bg-noche text-hueso" : "bg-noche/5 text-noche/40"}`}
    >
      {cargando ? "Guardando..." : sucio ? texto : ok}
    </button>
  );
}

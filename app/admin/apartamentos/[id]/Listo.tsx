import { Check, Circle } from "lucide-react";

export default function Listo({ items }: { items: { ok: boolean; label: string }[] }) {
  const hechos = items.filter((i) => i.ok).length;
  const total = items.length;
  const completo = hechos === total;
  return (
    <div className="mb-5 bg-white border border-noche/10 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className={`font-medium ${completo ? "text-salvia" : "text-noche"}`}>
          {completo ? "✓ Listo para publicar" : "Listo para publicar"}
        </p>
        <span className="text-sm text-noche/60">{hechos}/{total}</span>
      </div>
      <div className="h-2 rounded-full bg-noche/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${completo ? "bg-salvia" : "bg-oro"}`}
          style={{ width: `${(hechos / total) * 100}%` }}
        />
      </div>
      {!completo && (
        <ul className="mt-3 space-y-1.5">
          {items.map((i) => (
            <li key={i.label} className="flex items-center gap-2 text-sm">
              {i.ok ? <Check size={16} className="text-salvia shrink-0" /> : <Circle size={16} className="text-noche/30 shrink-0" />}
              <span className={i.ok ? "text-noche/50" : "text-noche"}>{i.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

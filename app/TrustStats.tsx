import { Star, Award, Clock } from "lucide-react";

export default function TrustStats() {
  const stats = [
    { icon: Star, valor: "4.69", label: "Calificación" },
    { icon: Award, valor: "160", label: "Reseñas" },
    { icon: Clock, valor: "4 años", label: "Como anfitrión" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 py-8 border-y border-noche/10">
      {stats.map(({ icon: Icon, valor, label }) => (
        <div key={label} className="text-center">
          <Icon size={20} className="mx-auto mb-2 text-terracota" />
          <div className="font-display text-2xl">{valor}</div>
          <div className="text-xs text-noche/60 uppercase tracking-wide">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

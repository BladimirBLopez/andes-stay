"use client";

import { Building2, MapPin, CalendarDays } from "lucide-react";

export default function TrustStats() {
  return (
    <div className="grid grid-cols-3 gap-4 py-8 border-y border-noche/10">
      <div className="text-center">
        <Building2 size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          Deptos Equipados
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Amoblados y listos
        </div>
      </div>
      <div className="text-center">
        <MapPin size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          Sopocachi
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Ubicación céntrica
        </div>
      </div>
      <div className="text-center">
        <CalendarDays size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          Por días o semanas
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Alquiler flexible
        </div>
      </div>
    </div>
  );
}

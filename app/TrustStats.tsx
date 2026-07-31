"use client";

import CountUp from "react-countup";
import { Home, MapPin, Clock } from "lucide-react";

export default function TrustStats() {
  return (
    <div className="grid grid-cols-3 gap-4 py-8 border-y border-noche/10">
      <div className="text-center">
        <Home size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-2xl">
          <CountUp end={4} duration={1.5} />
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Apartamentos disponibles
        </div>
      </div>
      <div className="text-center">
        <MapPin size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-2xl">
          Sopocachi
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Ubicación exclusiva
        </div>
      </div>
      <div className="text-center">
        <Clock size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-2xl">
          <CountUp end={4} duration={1.5} /> años
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          Como anfitrión
        </div>
      </div>
    </div>
  );
}

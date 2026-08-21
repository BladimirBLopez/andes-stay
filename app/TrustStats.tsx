"use client";

import { Building2, MapPin, CalendarDays } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function TrustStats() {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-3 gap-4 py-8 border-y border-noche/10">
      <div className="text-center">
        <Building2 size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          {t("trust_1_titulo")}
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          {t("trust_1_sub")}
        </div>
      </div>
      <div className="text-center">
        <MapPin size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          {t("trust_2_titulo")}
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          {t("trust_2_sub")}
        </div>
      </div>
      <div className="text-center">
        <CalendarDays size={20} className="mx-auto mb-2 text-terracota" />
        <div className="font-display text-lg md:text-xl">
          {t("trust_3_titulo")}
        </div>
        <div className="text-xs text-noche/60 uppercase tracking-wide">
          {t("trust_3_sub")}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

type Props = {
  paragraphs: string[];
  clampLines?: 2 | 3 | 4 | 5 | 6;
};

const CLAMP_CLASSES: Record<number, string> = {
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export default function DescripcionExpandible({ paragraphs, clampLines = 4 }: Props) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const clampClass = CLAMP_CLASSES[clampLines] ?? "line-clamp-4";

  return (
    <div className="max-w-3xl">
      <div className={`relative ${expanded ? "" : clampClass}`}>
        {paragraphs.map((texto, i) => (
          <p key={i} className="text-noche/70 leading-relaxed mb-4 last:mb-0">
            {texto}
          </p>
        ))}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm font-medium text-noche border border-noche/20 rounded-lg px-4 py-2 hover:bg-noche/5 transition-colors"
      >
        {expanded ? t("mostrar_menos") : t("mostrar_mas")}
      </button>
    </div>
  );
}

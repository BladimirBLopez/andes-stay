"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // el usuario canceló, no hacemos nada
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard no disponible, silenciosamente ignoramos
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-noche/70 hover:text-noche border border-noche/20 hover:border-noche/40 rounded-full px-4 py-2 transition-colors"
    >
      {copiado ? <Check size={16} /> : <Share2 size={16} />}
      {copiado ? "¡Enlace copiado!" : "Compartir"}
    </button>
  );
}

"use client";

import { toast } from "sonner";
import { Share2 } from "lucide-react";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
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
      toast.success("Enlace copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-hueso bg-noche/60 hover:bg-noche/80 backdrop-blur-sm rounded-full px-4 py-2 transition-colors shadow-md"
    >
      <Share2 size={16} />
      Compartir
    </button>
  );
}

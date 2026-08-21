"use client";

import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  const { t } = useLanguage();
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
      toast.success(t("enlace_copiado"));
    } catch {
      toast.error(t("enlace_error"));
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-hueso bg-noche/60 hover:bg-noche/80 backdrop-blur-sm rounded-full px-4 py-2 transition-colors shadow-md"
    >
      <Share2 size={16} />
      {t("compartir")}
    </button>
  );
}

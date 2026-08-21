"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const LANGUAGES: { code: "es" | "en"; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LangSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textColor = light ? "text-hueso" : "text-noche";
  const currentLabel = LANGUAGES.find((l) => l.code === lang)?.label ?? lang.toUpperCase();
  const otherLanguages = LANGUAGES.filter((l) => l.code !== lang);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium pb-1 border-b-2 ${open ? "border-terracota" : "border-transparent"} ${textColor}`}
      >
        {currentLabel}
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg overflow-hidden z-50 w-max">
          {otherLanguages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="block w-full px-3 py-1.5 text-xs font-medium text-noche hover:bg-noche/5 text-left"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

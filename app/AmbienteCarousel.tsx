"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

export default function AmbienteCarousel({
  titulo,
  fotos,
  onOpenGallery,
}: {
  titulo: string;
  fotos: string[];
  onOpenGallery: (fotos: string[], index: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (fotos.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">{titulo}</h2>
        <span className="text-xs text-noche/50">
          {selected + 1} / {fotos.length}
        </span>
      </div>

      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-noche/10 group">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {fotos.map((id, i) => (
              <button
                key={id}
                onClick={() => onOpenGallery(fotos, i)}
                className="relative flex-[0_0_100%] h-full cursor-zoom-in"
              >
                <ImageWithSkeleton
                  src={id}
                  alt={`${titulo} - foto ${i + 1}`}
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </button>
            ))}
          </div>
        </div>

        {fotos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                emblaApi?.scrollPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-2"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                emblaApi?.scrollNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-2"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-hueso/90 rounded-full p-2 pointer-events-none">
          <Expand size={16} />
        </div>

        {fotos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {fotos.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === selected ? "w-4 bg-hueso" : "w-1.5 bg-hueso/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

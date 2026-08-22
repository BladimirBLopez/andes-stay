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
  onOpenGallery: (fotos: string[], index: number, titulo?: string) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", slidesToScroll: 1 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (fotos.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">{titulo}</h2>
        <span className="text-xs text-noche/50">
          {fotos.length} {fotos.length === 1 ? "foto" : "fotos"}
        </span>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-3">
            {fotos.map((id, i) => (
              <button
                key={id}
                onClick={() => onOpenGallery(fotos, i, titulo)}
                className="relative flex-[0_0_44%] sm:flex-[0_0_42%] aspect-[4/3] pl-3 cursor-zoom-in"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-noche/10">
                  <ImageWithSkeleton
                    src={id}
                    alt={`${titulo} - foto ${i + 1}`}
                    sizes="(max-width: 768px) 50vw, 350px"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-2 shadow-md z-10"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {canScrollNext && (
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-2 shadow-md z-10"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div className="absolute top-2 right-2 bg-hueso/90 rounded-full p-2 pointer-events-none z-10">
          <Expand size={14} />
        </div>
      </div>
    </div>
  );
}

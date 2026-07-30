"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CardCarousel({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
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

  if (fotos.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-noche/40 text-sm">
        [Foto pendiente]
      </div>
    );
  }

  if (fotos.length === 1) {
    return <ImageWithSkeleton src={fotos[0]} alt={alt} />;
  }

  return (
    <div className="relative w-full h-full group">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {fotos.map((id) => (
            <div key={id} className="relative flex-[0_0_100%] h-full">
              <ImageWithSkeleton src={id} alt={alt} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          emblaApi?.scrollPrev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          emblaApi?.scrollNext();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-hueso/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Siguiente"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {fotos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === selected ? "w-4 bg-hueso" : "w-1.5 bg-hueso/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageWithSkeleton from "./ImageWithSkeleton";

export default function HeroCarousel({
  fotos,
  alt,
  onOpenGallery,
  intervalMs = 5000,
}: {
  fotos: string[];
  alt: string;
  onOpenGallery?: (fotos: string[], index: number) => void;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (fotos.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % fotos.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [fotos.length, intervalMs]);

  if (fotos.length === 0) return null;

  const content = (
    <AnimatePresence mode="sync">
      <motion.div
        key={fotos[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <ImageWithSkeleton
          src={fotos[index]}
          alt={alt}
          sizes="100vw"
          priority={index === 0}
        />
      </motion.div>
    </AnimatePresence>
  );

  if (!onOpenGallery) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <button
      onClick={() => onOpenGallery(fotos, index)}
      className="absolute inset-0 w-full h-full overflow-hidden"
      aria-label="Ver galería completa"
    >
      {content}
    </button>
  );
}

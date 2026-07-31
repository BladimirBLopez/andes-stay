"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ArrowLeft, MessageCircle, Star, Wifi, Home, ChefHat, Users, BedDouble, Bath } from "lucide-react";
import ShareButton from "../../ShareButton";
import Amenidades from "../../Amenidades";
import AmbienteCarousel from "../../AmbienteCarousel";
import Footer from "../../Footer";
import HeroCarousel from "../../HeroCarousel";

const otrosApartamentos = [
  { nombre: "Elegante Apartamento", detalle: "Hermosa vista panorámica · La Paz" },
  { nombre: "Garzonier Moderno", detalle: "Flamante, céntrico · Sopocachi" },
  { nombre: "Apto. VIP de Lujo", detalle: "Penthouse · Sopocachi" },
];

const amenidades = [
  { icon: Wifi, label: "Wifi" },
  { icon: ChefHat, label: "Cocina equipada" },
  { icon: Home, label: "Servicios básicos incluidos" },
];

const WHATSAPP_NUMBER = "59176570041";
const CLOUD_NAME = "dkq95jus0";

const NOMBRE = "Garzonier Premium con Sol y Vista Espectacular";
const MENSAJE_WHATSAPP = `Hola, me interesa reservar el ${NOMBRE}. ¿Está disponible?`;

const categorias = [
  {
    titulo: "Sala",
    fotos: [
      "premium-sala-1",
      "premium-sala-2",
      "premium-sala-3",
      "premium-sala-4",
      "premium-sala-5",
      "premium-sala-6",
      "premium-sala-7",
    ],
  },
  {
    titulo: "Habitación",
    fotos: [
      "premium-hab-1",
      "premium-hab-2",
      "premium-hab-3",
      "premium-hab-4",
      "premium-hab-5",
    ],
  },
  {
    titulo: "Cocina",
    fotos: [
      "premium-cocina-1",
      "premium-cocina-2",
      "premium-cocina-3",
      "premium-cocina-4",
      "premium-cocina-5",
    ],
  },
  {
    titulo: "Baño",
    fotos: ["premium-baño-1", "premium-baño-2"],
  },
  {
    titulo: "Área de lavado",
    fotos: ["premium-lavado-1"],
  },
];

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

export default function GarzonierPremium() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);

  const openGallery = (fotos: string[], index: number) => {
    setActiveGallery(fotos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = activeGallery.map((id) => ({ src: cldUrl(id) }));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    MENSAJE_WHATSAPP
  )}`;

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-noche/10"
      >
        <HeroCarousel
          fotos={categorias[0].fotos}
          alt={NOMBRE}
          onOpenGallery={openGallery}
        />
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 bg-hueso/90 hover:bg-hueso text-noche rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="absolute top-4 right-4">
          <ShareButton
            title={NOMBRE}
            text="Mira este apartamento en VIP Estadías"
          />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-6 bg-white rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pt-2">
        <div className="pt-8 pb-6">
          <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">
            La Paz, Bolivia
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-3">{NOMBRE}</h1>
          <p className="text-noche/70 mb-4">
            Alojamiento entero en La Paz, Bolivia
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-noche/70">
            <span className="flex items-center gap-2"><Users size={16} className="text-terracota" /> 2 huéspedes</span>
            <span className="flex items-center gap-2"><Home size={16} className="text-terracota" /> 1 habitación</span>
            <span className="flex items-center gap-2"><BedDouble size={16} className="text-terracota" /> 1 cama</span>
            <span className="flex items-center gap-2"><Bath size={16} className="text-terracota" /> 1 baño</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={14} fill="currentColor" className="text-oro" />
            Novedad
          </div>
        </div>

        <div className="border-t border-noche/10" />

        <div className="mb-16 max-w-3xl pt-8">
          <p className="text-noche/70 leading-relaxed mb-4">
            Exclusivo Garzonier, ambiente moderno, soleado y confortable que
            ofrece practicidad y bienestar en un espacio funcional.
          </p>
          <p className="text-noche/70 leading-relaxed mb-4">
            El apartamento es nuevo y se encuentra en un estado impecable, el
            edificio es moderno y seguro.
          </p>
          <p className="text-noche/70 leading-relaxed mb-4">
            Su ubicación es estratégica: a una cuadra de la Plaza Avaroa,
            donde encontrará restaurantes con comida nacional e
            internacional, farmacias, pubs y discotecas.
          </p>
          <p className="text-noche/70 leading-relaxed">
            El apartamento se encuentra a pasos de la Embajada de Japón y el
            supermercado Hipermaxi.
          </p>
        </div>

        <Amenidades items={amenidades} />

        {categorias.map((cat) => (
          <AmbienteCarousel
            key={cat.titulo}
            titulo={cat.titulo}
            fotos={cat.fotos}
            onOpenGallery={openGallery}
          />
        ))}

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />

        <div className="pb-16 border-t border-noche/10 pt-16">
          <h2 className="font-display text-2xl mb-6">Otros apartamentos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otrosApartamentos.map((a) => (
              <a
                key={a.nombre}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el ${a.nombre}. ¿Está disponible?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-hueso border border-noche/10 rounded-xl p-5 hover:border-terracota transition-colors"
              >
                <h3 className="font-display text-lg mb-1">{a.nombre}</h3>
                <p className="text-sm text-noche/60">{a.detalle}</p>
              </a>
            ))}
          </div>
          <Link
            href="/#apartamentos"
            className="inline-block mt-6 text-sm text-terracota border-b border-terracota"
          >
            Ver todos los apartamentos
          </Link>
        </div>

      </div>

      <Footer />
      <div className="h-20 bg-noche md:hidden" />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-hueso border-t border-noche/10 px-6 py-4 flex items-center justify-between z-40">
        <div>
          <div className="font-display text-lg">{NOMBRE.split(" ").slice(0, 2).join(" ")}</div>
          <div className="text-xs text-noche/60 flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-oro" />
            Novedad
          </div>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota text-hueso px-6 py-3 rounded-full font-medium"
        >
          Reservar ahora
        </a>
      </div>
    </main>
  );
}

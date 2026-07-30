"use client";

import { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ArrowLeft, MessageCircle, Star, Wifi, Home, ChefHat } from "lucide-react";
import ShareButton from "../../ShareButton";
import TrustStats from "../../TrustStats";
import Amenidades from "../../Amenidades";
import AmbienteCarousel from "../../AmbienteCarousel";
import Footer from "../../Footer";

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
    <main className="pb-28">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-noche/10">
        <button
          onClick={() => openGallery(categorias[0].fotos, 0)}
          className="absolute inset-0 w-full h-full"
        >
          <CldImage
            src={categorias[0].fotos[0]}
            alt={NOMBRE}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </button>
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
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="pt-8 pb-6">
          <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">
            La Paz, Bolivia
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-3">{NOMBRE}</h1>
          <p className="text-noche/70 mb-3">
            Alojamiento entero en La Paz, Bolivia
          </p>
          <p className="text-noche/70 mb-4">
            2 huéspedes · 1 habitación · 1 cama · 1 baño
          </p>
          <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={14} fill="currentColor" className="text-oro" />
            Novedad
          </div>
        </div>

        <TrustStats />
        <p className="text-xs text-noche/40 text-center -mt-4 mb-4">
          Trayectoria de VIP Estadías en Airbnb. Este apartamento es nuevo,
          por eso aún no tiene reseñas propias.
        </p>

        <div className="h-12" />

        <div className="mb-16 max-w-3xl">
          <h2 className="font-display text-2xl mb-4">Descripción</h2>
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

        <div className="mb-16 border-t border-noche/10 pt-16">
          <h2 className="font-display text-2xl mb-6">Otros apartamentos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otrosApartamentos.map((a) => (
              <a
                key={a.nombre}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el ${a.nombre}. ¿Está disponible?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-noche/10 rounded-xl p-5 hover:border-terracota transition-colors"
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

        <div className="hidden md:block text-center py-12 border-t border-noche/10">
          <h2 className="font-display text-2xl mb-4">
            ¿Le interesa este apartamento?
          </h2>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-hueso px-8 py-4 rounded-full font-medium"
          >
            <MessageCircle size={18} />
            Reservar ahora
          </a>
        </div>
      </div>

      <Footer />

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

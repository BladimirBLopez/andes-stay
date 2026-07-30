"use client";

import { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ArrowLeft, MessageCircle, Star, Wifi, Home } from "lucide-react";
import ShareButton from "../../ShareButton";
import TrustStats from "../../TrustStats";
import Amenidades from "../../Amenidades";

const amenidades = [
  { icon: Wifi, label: "Wifi" },
  { icon: Home, label: "Servicios básicos incluidos" },
];

const WHATSAPP_NUMBER = "59176570041";
const CLOUD_NAME = "dkq95jus0";

const NOMBRE = "Garzonier Premium con Sol y Vista Espectacular";
const MENSAJE_WHATSAPP = `Hola, me interesa reservar el ${NOMBRE}. ¿Está disponible?`;

const salaFotos = [
  "premium-sala-1",
  "premium-sala-2",
  "premium-sala-3",
  "premium-sala-4",
  "premium-sala-5",
  "premium-sala-6",
  "premium-sala-7",
];

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

function Ambiente({
  titulo,
  fotos,
  onFotoClick,
}: {
  titulo: string;
  fotos: string[];
  onFotoClick: (index: number) => void;
}) {
  if (fotos.length === 0) return null;
  return (
    <div className="mb-16">
      <h2 className="font-display text-2xl mb-6">{titulo}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fotos.map((id, i) => (
          <button
            key={id}
            onClick={() => onFotoClick(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-noche/10 cursor-zoom-in"
          >
            <CldImage
              src={id}
              alt={`${titulo} - foto ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GarzonierPremium() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = salaFotos.map((id) => ({ src: cldUrl(id) }));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    MENSAJE_WHATSAPP
  )}`;

  return (
    <main className="pb-28">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-noche/10">
        <button
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="absolute inset-0 w-full h-full"
        >
          <CldImage
            src={salaFotos[0]}
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
          Trayectoria de Wilmer como anfitrión en Airbnb. Este apartamento es
          nuevo, por eso aún no tiene reseñas propias.
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

        <Ambiente
          titulo="Sala"
          fotos={salaFotos}
          onFotoClick={(i) => {
            setLightboxIndex(i);
            setLightboxOpen(true);
          }}
        />

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />

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

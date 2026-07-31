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

type OtroApto = { nombre: string; detalle: string; slug: string | null };

const otrosApartamentos: OtroApto[] = [
  { nombre: "Elegante Apartamento", detalle: "Hermosa vista panorámica · La Paz", slug: null },
  { nombre: "Garzonier Moderno", detalle: "Flamante, céntrico · Sopocachi", slug: null },
  { nombre: "Garzonier Premium", detalle: "Con sol y vista espectacular · Sopocachi", slug: "garzonier-premium" },
];

const amenidades = [
  { icon: Wifi, label: "Wifi" },
  { icon: ChefHat, label: "Cocina equipada" },
  { icon: Home, label: "Servicios básicos incluidos" },
];

const WHATSAPP_NUMBER = "59176570041";
const CLOUD_NAME = "dkq95jus0";

const NOMBRE = "Apto. VIP de Lujo en Penthouse - Sopocachi";
const MENSAJE_WHATSAPP = `Hola, me interesa reservar el ${NOMBRE}. ¿Está disponible?`;

const categorias = [
  {
    titulo: "Sala",
    fotos: ["vip-sala-1", "vip-sala-2", "vip-sala-3", "vip-sala-4", "vip-sala-5", "vip-sala-6"],
  },
  {
    titulo: "Cocina",
    fotos: ["vip-cocina-1", "vip-cocina-2", "vip-cocina-3"],
  },
  {
    titulo: "Comedor",
    fotos: ["vip-comedor-1"],
  },
  {
    titulo: "Habitación 1",
    fotos: ["vip-hab1-1", "vip-hab1-2", "vip-hab1-3", "vip-hab1-4"],
  },
  {
    titulo: "Habitación 2",
    fotos: ["vip-hab2-1", "vip-hab2-2"],
  },
  {
    titulo: "Habitación 3",
    fotos: ["vip-hab3-1", "vip-hab3-2"],
  },
  {
    titulo: "Baño 1",
    fotos: ["vip-bano1-1", "vip-bano1-2"],
  },
  {
    titulo: "Baño 2",
    fotos: ["vip-bano2-1"],
  },
  {
    titulo: "Baño 3",
    fotos: ["vip-bano3-1", "vip-bano3-2"],
  },
];

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

export default function VipLujoClient() {
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
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            <span className="flex items-center gap-2"><Users size={16} className="text-terracota" /> 5 huéspedes</span>
            <span className="flex items-center gap-2"><Home size={16} className="text-terracota" /> 3 habitaciones</span>
            <span className="flex items-center gap-2"><BedDouble size={16} className="text-terracota" /> 4 camas</span>
            <span className="flex items-center gap-2"><Bath size={16} className="text-terracota" /> 3 baños</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={14} fill="currentColor" className="text-oro" />
            4.5 · 6 reseñas
          </div>
        </div>

        <div className="border-t border-noche/10" />

        <div className="mb-16 max-w-3xl pt-8">
          <p className="text-noche/70 leading-relaxed mb-4">
            Amplio penthouse de lujo en Sopocachi, con acabados finos, sala
            de estar y comedor independientes, y tres habitaciones para
            alojar cómodamente a grupos familiares o de amigos.
          </p>
          <p className="text-noche/70 leading-relaxed mb-4">
            Cada habitación cuenta con su propio espacio, pensado para que
            cada huésped tenga privacidad durante su estadía.
          </p>
          <p className="text-noche/70 leading-relaxed mb-4">
            Ubicado en Sopocachi, una de las zonas más exclusivas y seguras
            de La Paz, cerca de restaurantes, cafés y servicios.
          </p>
          <p className="text-noche/70 leading-relaxed">
            Anfitrionado por Wilmer, con años de experiencia recibiendo
            huéspedes y coordinando cada detalle de tu estadía.
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
            {otrosApartamentos.map((a) =>
              a.slug ? (
                <Link
                  key={a.nombre}
                  href={`/apartamentos/${a.slug}`}
                  className="block bg-hueso border border-noche/10 rounded-xl p-5 hover:border-terracota transition-colors"
                >
                  <h3 className="font-display text-lg mb-1">{a.nombre}</h3>
                  <p className="text-sm text-noche/60">{a.detalle}</p>
                </Link>
              ) : (
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
              )
            )}
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
          <div className="font-display text-lg">Apto. VIP de Lujo</div>
          <div className="text-xs text-noche/60 flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-oro" />
            4.5 · 6 reseñas
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Share from "yet-another-react-lightbox/plugins/share";
import { ArrowLeft, MessageCircle, Star, Wifi, Home, ChefHat, Users, BedDouble, Bath } from "lucide-react";
import ShareButton from "../../ShareButton";
import DescripcionExpandible from "../../DescripcionExpandible";
import Amenidades from "../../Amenidades";
import AmbienteCarousel from "../../AmbienteCarousel";
import Footer from "../../Footer";
import HeroCarousel from "../../HeroCarousel";
import ImageWithSkeleton from "../../ImageWithSkeleton";

type OtroApto = { nombre: string; detalle: string; slug: string | null; foto: string | null };

const otrosApartamentos: OtroApto[] = [
  { nombre: "Garzonier Moderno", detalle: "Flamante, céntrico · Sopocachi", slug: null, foto: null },
  { nombre: "Apto. VIP de Lujo", detalle: "Penthouse de lujo · Sopocachi", slug: "vip-de-lujo", foto: "vip-sala-1" },
  { nombre: "Garzonier Premium", detalle: "Con sol y vista espectacular · Sopocachi", slug: "garzonier-premium", foto: "premium-sala-1" },
];

const amenidades = [
  { icon: Wifi, label: "Wifi" },
  { icon: ChefHat, label: "Cocina equipada" },
  { icon: Home, label: "Servicios básicos incluidos" },
];

const WHATSAPP_NUMBER = "59176570041";
const CLOUD_NAME = "dkq95jus0";

const NOMBRE = "Elegante Apartamento con Vista Panorámica - Sopocachi";
const PAGINA_URL = "https://andes-stay-o6fy.vercel.app/apartamentos/elegante-apartamento";
const MENSAJE_WHATSAPP = `Hola, me interesa reservar el ${NOMBRE}. ¿Está disponible?

${PAGINA_URL}`;

const categorias = [
  {
    titulo: "Sala",
    fotos: ["elegante-sala-1", "elegante-sala-2", "elegante-sala-3", "elegante-sala-4", "elegante-sala-5"],
  },
  {
    titulo: "Cocina",
    fotos: ["elegante-cocina-1", "elegante-cocina-2", "elegante-cocina-3", "elegante-cocina-4"],
  },
  {
    titulo: "Comedor",
    fotos: ["elegante-comedor-1", "elegante-comedor-2", "elegante-comedor-3"],
  },
  {
    titulo: "Habitación 1",
    fotos: ["elegante-hab1-1", "elegante-hab1-2"],
  },
  {
    titulo: "Habitación 2",
    fotos: ["elegante-hab2-1", "elegante-hab2-2"],
  },
  {
    titulo: "Baño 1",
    fotos: ["elegante-bano1-1", "elegante-bano1-2", "elegante-bano1-3"],
  },
  {
    titulo: "Baño 2",
    fotos: ["elegante-bano2-1", "elegante-bano2-2", "elegante-bano2-3"],
  },
  {
    titulo: "Exterior",
    fotos: ["elegante-exterior-1", "elegante-exterior-2", "elegante-exterior-3", "elegante-exterior-4", "elegante-exterior-5", "elegante-exterior-6", "elegante-exterior-7", "elegante-exterior-8"],
  },
];

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

export default function EleganteApartamentoClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  const [activeTitulo, setActiveTitulo] = useState("");

  const openGallery = (fotos: string[], index: number, titulo?: string) => {
    setActiveGallery(fotos);
    setLightboxIndex(index);
    setActiveTitulo(titulo ?? "");
    setLightboxOpen(true);
  };

  const slides = activeGallery.map((id) => ({ src: cldUrl(id), description: activeTitulo }));
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
          onOpenGallery={(fotos, index) => openGallery(fotos, index, categorias[0].titulo)}
        />
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 bg-noche/60 hover:bg-noche/80 backdrop-blur-sm text-hueso rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-md"
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
            <span className="flex items-center gap-2"><Users size={16} className="text-terracota" /> 3 huéspedes</span>
            <span className="flex items-center gap-2"><Home size={16} className="text-terracota" /> 2 habitaciones</span>
            <span className="flex items-center gap-2"><BedDouble size={16} className="text-terracota" /> 3 camas</span>
            <span className="flex items-center gap-2"><Bath size={16} className="text-terracota" /> 2 baños</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={14} fill="currentColor" className="text-oro" />
            4.67 · 3 reseñas
          </div>
        </div>

        <div className="border-t border-noche/10" />

        <div className="mb-16 pt-8">
          <DescripcionExpandible
            paragraphs={[
              "Elegante apartamento con hermosa vista panorámica en Sopocachi, con dos habitaciones y ambientes amplios pensados para una estadía cómoda en La Paz.",
              "Cuenta con sala y comedor independientes, cocina equipada y grandes ventanales con vista a la ciudad.",
              "Ubicado en Sopocachi, una de las zonas más exclusivas y seguras de La Paz, cerca de restaurantes, cafés y servicios.",
              "Anfitrionado por Wilmer, con años de experiencia recibiendo huéspedes y coordinando cada detalle de tu estadía.",
            ]}
          />
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
          plugins={[Captions, Counter, Share]}
          captions={{ descriptionTextAlign: "start" }}
          counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        />

        <div className="pb-16 border-t border-noche/10 pt-16">
          <h2 className="font-display text-2xl mb-6">Otros apartamentos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otrosApartamentos.map((a) => {
              const cardContent = (
                <>
                  <div className="relative aspect-[4/3] bg-noche/10">
                    {a.foto ? (
                      <ImageWithSkeleton src={a.foto} alt={a.nombre} sizes="(max-width: 640px) 100vw, 300px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-noche/30 text-xs">
                        Foto pendiente
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg mb-1">{a.nombre}</h3>
                    <p className="text-sm text-noche/60">{a.detalle}</p>
                  </div>
                </>
              );
              return a.slug ? (
                <Link
                  key={a.nombre}
                  href={`/apartamentos/${a.slug}`}
                  className="block bg-hueso border border-noche/10 rounded-xl overflow-hidden hover:border-terracota transition-colors"
                >
                  {cardContent}
                </Link>
              ) : (
                <a
                  key={a.nombre}
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el ${a.nombre}. ¿Está disponible?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-hueso border border-noche/10 rounded-xl overflow-hidden hover:border-terracota transition-colors"
                >
                  {cardContent}
                </a>
              );
            })}
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

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex fixed bottom-8 right-8 z-40 items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium shadow-xl"
      >
        Reservar ahora
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-hueso border-t border-noche/10 px-6 py-4 flex items-center justify-between z-40">
        <div>
          <div className="font-display text-lg">Elegante Apartamento</div>
          <div className="text-xs text-noche/60 flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-oro" />
            4.67 · 3 reseñas
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

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
import LangSwitcher from "../../LangSwitcher";
import { useLanguage } from "../../LanguageContext";

type OtroApto = { nombre: string; detalle: { es: string; en: string }; slug: string | null; foto: string | null };

const otrosApartamentos: OtroApto[] = [
  { nombre: "Elegante Apartamento", detalle: { es: "Hermosa vista panorámica · La Paz", en: "Beautiful panoramic view · La Paz" }, slug: "elegante-apartamento", foto: "elegante-sala-1" },
  { nombre: "Garzonier Moderno", detalle: { es: "Flamante, céntrico · Sopocachi", en: "Brand new, central · Sopocachi" }, slug: "garzonier-moderno", foto: "moderno-sala-1" },
  { nombre: "Apto. VIP de Lujo", detalle: { es: "Penthouse · Sopocachi", en: "Penthouse · Sopocachi" }, slug: "vip-de-lujo", foto: "vip-sala-1" },
];

const WHATSAPP_NUMBER = "59176570041";
const CLOUD_NAME = "dkq95jus0";

const NOMBRE = { es: "Garzonier Premium con Sol y Vista Espectacular", en: "Premium Studio with Sun and Spectacular View" };
const SHORT_NOMBRE = { es: "Garzonier Premium", en: "Premium Studio" };
const PAGINA_URL = "https://vipestadias.online/apartamentos/garzonier-premium";

const STATS = {
  es: { huespedes: "2 huéspedes", habitaciones: "1 habitación", camas: "1 cama", banos: "1 baño" },
  en: { huespedes: "2 guests", habitaciones: "1 bedroom", camas: "1 bed", banos: "1 bathroom" },
};

const DESCRIPCION = {
  es: [
    "Exclusivo Garzonier, ambiente moderno, soleado y confortable que ofrece practicidad y bienestar en un espacio funcional.",
    "El apartamento es nuevo y se encuentra en un estado impecable, el edificio es moderno y seguro.",
    "Su ubicación es estratégica: a una cuadra de la Plaza Avaroa, donde encontrará restaurantes con comida nacional e internacional, farmacias, pubs y discotecas.",
    "El apartamento se encuentra a pasos de la Embajada de Japón y el supermercado Hipermaxi.",
  ],
  en: [
    "Exclusive studio apartment, modern, sunny, and comfortable, offering practicality and well-being in a functional space.",
    "The apartment is brand new and in impeccable condition, in a modern and secure building.",
    "Its location is strategic: just one block from Plaza Avaroa, where you'll find restaurants with national and international food, pharmacies, pubs, and nightclubs.",
    "The apartment is just steps from the Japanese Embassy and the Hipermaxi supermarket.",
  ],
};

type CategoriaKey = "cat_sala" | "cat_cocina" | "cat_comedor" | "cat_habitacion" | "cat_bano" | "cat_exterior" | "cat_lavado" | "cat_mas_fotos";
type Categoria = { tituloKey: CategoriaKey; numero?: number; fotos: string[] };

const categorias: Categoria[] = [
  {
    tituloKey: "cat_sala",
    fotos: ["premium-sala-1", "premium-sala-2", "premium-sala-3", "premium-sala-4", "premium-sala-5", "premium-sala-6", "premium-sala-7"],
  },
  {
    tituloKey: "cat_habitacion",
    fotos: ["premium-hab-1", "premium-hab-2", "premium-hab-3", "premium-hab-4", "premium-hab-5"],
  },
  {
    tituloKey: "cat_cocina",
    fotos: ["premium-cocina-1", "premium-cocina-2", "premium-cocina-3", "premium-cocina-4", "premium-cocina-5"],
  },
  {
    tituloKey: "cat_bano",
    fotos: ["premium-baño-1", "premium-baño-2"],
  },
  {
    tituloKey: "cat_lavado",
    fotos: ["premium-lavado-1"],
  },
];

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${encodeURIComponent(publicId)}`;
}

export default function GarzonierPremium() {
  const { t, lang } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  const [activeTitulo, setActiveTitulo] = useState("");

  const nombre = NOMBRE[lang];
  const stats = STATS[lang];
  const mensajeWhatsapp = `Hola, me interesa reservar el ${nombre}. ¿Está disponible?\n\n${PAGINA_URL}`;

  const amenidades = [
    { icon: Wifi, label: t("amenidad_wifi") },
    { icon: ChefHat, label: t("amenidad_cocina") },
    { icon: Home, label: t("amenidad_servicios") },
  ];

  const categoriasTraducidas = categorias.map((cat) => ({
    titulo: cat.numero ? `${t(cat.tituloKey)} ${cat.numero}` : t(cat.tituloKey),
    fotos: cat.fotos,
  }));

  const openGallery = (fotos: string[], index: number, titulo?: string) => {
    setActiveGallery(fotos);
    setLightboxIndex(index);
    setActiveTitulo(titulo ?? "");
    setLightboxOpen(true);
  };

  const slides = activeGallery.map((id) => ({ src: cldUrl(id), description: activeTitulo }));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    mensajeWhatsapp
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
          fotos={categoriasTraducidas[0].fotos}
          alt={nombre}
          onOpenGallery={(fotos, index) => openGallery(fotos, index, categoriasTraducidas[0].titulo)}
        />
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 bg-noche/60 hover:bg-noche/80 backdrop-blur-sm text-hueso rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-md"
        >
          <ArrowLeft size={16} />
          {t("volver")}
        </Link>
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <div className="bg-noche/60 backdrop-blur-sm rounded-full px-3 py-1.5">
            <LangSwitcher light />
          </div>
          <ShareButton
            title={nombre}
            text={t("compartir_texto")}
          />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-6 bg-white rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pt-2">
        <div className="pt-8 pb-6">
          <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">
            La Paz, Bolivia
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-3">{nombre}</h1>
          <p className="text-noche/70 mb-4">
            {t("alojamiento_entero")}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-noche/70">
            <span className="flex items-center gap-2"><Users size={16} className="text-terracota" /> {stats.huespedes}</span>
            <span className="flex items-center gap-2"><Home size={16} className="text-terracota" /> {stats.habitaciones}</span>
            <span className="flex items-center gap-2"><BedDouble size={16} className="text-terracota" /> {stats.camas}</span>
            <span className="flex items-center gap-2"><Bath size={16} className="text-terracota" /> {stats.banos}</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
            <Star size={14} fill="currentColor" className="text-oro" />
            {t("novedad")}
          </div>
        </div>

        <div className="border-t border-noche/10" />

        <div className="mb-16 pt-8">
          <DescripcionExpandible paragraphs={DESCRIPCION[lang]} />
        </div>

        <Amenidades items={amenidades} />

        {categoriasTraducidas.map((cat) => (
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
          <span className="font-script text-4xl text-terracota block mb-1">{t("descubre")}</span>
          <h2 className="font-display text-2xl mb-6">{t("otros_apartamentos_titulo")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otrosApartamentos.map((a) => {
              const cardContent = (
                <>
                  <div className="relative aspect-[4/3] bg-noche/10">
                    {a.foto ? (
                      <ImageWithSkeleton src={a.foto} alt={a.nombre} sizes="(max-width: 640px) 100vw, 300px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-noche/30 text-xs">
                        {t("foto_pendiente")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-noche/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg text-hueso mb-1">{a.nombre}</h3>
                      <p className="text-sm text-hueso/70 mb-3">{a.detalle[lang]}</p>
                      <span className="inline-flex items-center gap-1 bg-oro text-noche text-xs font-medium px-3 py-1.5 rounded-full">
                        {t("ver_apartamento")}
                      </span>
                    </div>
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
            {t("ver_todos_apartamentos")}
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
        {t("reservar_ahora")}
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-hueso border-t border-noche/10 px-6 py-4 flex items-center justify-between z-40">
        <div>
          <div className="font-display text-lg">{SHORT_NOMBRE[lang]}</div>
          <div className="text-xs text-noche/60 flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-oro" />
            {t("novedad")}
          </div>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota text-hueso px-6 py-3 rounded-full font-medium"
        >
          {t("reservar_ahora")}
        </a>
      </div>
    </main>
  );
}

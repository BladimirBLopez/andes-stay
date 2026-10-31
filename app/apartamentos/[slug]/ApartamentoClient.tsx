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
import { ArrowLeft, Star, Home, Users, BedDouble, Bath } from "lucide-react";
import { CATALOGO } from "../../../lib/amenidadesCatalogo";
import { ICONOS } from "../../amenidadesIconos";
import ShareButton from "../../ShareButton";
import DescripcionExpandible from "../../DescripcionExpandible";
import Amenidades from "../../Amenidades";
import AmbienteCarousel from "../../AmbienteCarousel";
import Footer from "../../Footer";
import HeroCarousel from "../../HeroCarousel";
import ImageWithSkeleton from "../../ImageWithSkeleton";
import LangSwitcher from "../../LangSwitcher";
import { useLanguage } from "../../LanguageContext";
import type { Apto, Otro } from "../../../lib/apartamentos";

import { useWhatsapp } from "@/app/AjustesContext";
const CLOUD_NAME = "dkq95jus0";
const ORDEN = ["sala", "cocina", "comedor", "habitacion", "bano", "exterior", "lavado", "mas_fotos"];

type CategoriaKey =
  | "cat_sala" | "cat_cocina" | "cat_comedor" | "cat_habitacion"
  | "cat_bano" | "cat_exterior" | "cat_lavado" | "cat_mas_fotos";

function cldUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

function agrupar(fotos: Apto["fotos"]) {
  const mapa = new Map<string, { cat: string; numero: number | null; fotos: string[] }>();
  for (const f of fotos) {
    const k = `${f.categoria}|${f.numero ?? ""}`;
    if (!mapa.has(k)) mapa.set(k, { cat: f.categoria, numero: f.numero, fotos: [] });
    mapa.get(k)!.fotos.push(f.publicId);
  }
  return [...mapa.values()].sort((a, b) => {
    const ia = ORDEN.indexOf(a.cat);
    const ib = ORDEN.indexOf(b.cat);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || (a.numero ?? 0) - (b.numero ?? 0);
  });
}

const plural = (n: number, s: string, p: string) => `${n} ${n === 1 ? s : p}`;

export default function ApartamentoClient({ apto, otros, amenidades: amenidadesSel }: { apto: Apto; otros: Otro[]; amenidades: string[] }) {
  const { t, lang } = useLanguage();
  const WHATSAPP_NUMBER = useWhatsapp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  const [activeTitulo, setActiveTitulo] = useState("");

  const pick = (es: string, en: string) => (lang === "en" && en.trim() ? en : es);

  const nombre = pick(apto.tituloEs || apto.nombreEs, apto.tituloEn || apto.nombreEn);
  const nombreCorto = pick(apto.nombreEs, apto.nombreEn);
  const paginaUrl = `https://vipestadias.online/apartamentos/${apto.slug}`;
  const mensajeWhatsapp = `Hola, me interesa reservar el ${nombre}. ¿Está disponible?\n\n${paginaUrl}`;
  const rating = apto.rating ? apto.rating.replace(/reseñas?/i, t("resenas")) : null;

  const stats =
    lang === "es"
      ? {
          huespedes: plural(apto.huespedes, "huésped", "huéspedes"),
          habitaciones: plural(apto.habitaciones, "habitación", "habitaciones"),
          camas: plural(apto.camas, "cama", "camas"),
          banos: plural(apto.banos, "baño", "baños"),
        }
      : {
          huespedes: plural(apto.huespedes, "guest", "guests"),
          habitaciones: plural(apto.habitaciones, "bedroom", "bedrooms"),
          camas: plural(apto.camas, "bed", "beds"),
          banos: plural(apto.banos, "bathroom", "bathrooms"),
        };

  const parrafos = pick(apto.descripcionEs, apto.descripcionEn)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const amenidades = CATALOGO.filter((c) => amenidadesSel.includes(c.k)).map((c) => ({
    icon: ICONOS[c.k] ?? Home,
    label: lang === "en" ? c.en : c.es,
  }));

  const categoriasTraducidas = agrupar(apto.fotos).map((g) => {
    const base = t(`cat_${g.cat}` as CategoriaKey);
    return { titulo: g.numero ? `${base} ${g.numero}` : base, fotos: g.fotos };
  });
  const heroFotos = categoriasTraducidas[0]?.fotos ?? [];
  const heroTitulo = categoriasTraducidas[0]?.titulo ?? "";

  const openGallery = (fotos: string[], index: number, titulo?: string) => {
    setActiveGallery(fotos);
    setLightboxIndex(index);
    setActiveTitulo(titulo ?? "");
    setLightboxOpen(true);
  };

  const slides = activeGallery.map((id) => ({ src: cldUrl(id), description: activeTitulo }));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsapp)}`;

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[4/3] md:aspect-[16/7] bg-noche/10"
      >
        {heroFotos.length > 0 && (
          <HeroCarousel
            fotos={heroFotos}
            alt={nombre}
            onOpenGallery={(fotos, index) => openGallery(fotos, index, heroTitulo)}
          />
        )}
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
          <ShareButton title={nombre} text={t("compartir_texto")} />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-6 bg-white rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pt-2">
        <div className="pt-8 pb-6">
          <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">La Paz, Bolivia</p>
          <h1 className="font-display text-3xl md:text-5xl mb-3">{nombre}</h1>
          <p className="text-noche/70 mb-4">{t("alojamiento_entero")}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-noche/70">
            <span className="flex items-center gap-2"><Users size={16} className="text-terracota" /> {stats.huespedes}</span>
            <span className="flex items-center gap-2"><Home size={16} className="text-terracota" /> {stats.habitaciones}</span>
            <span className="flex items-center gap-2"><BedDouble size={16} className="text-terracota" /> {stats.camas}</span>
            <span className="flex items-center gap-2"><Bath size={16} className="text-terracota" /> {stats.banos}</span>
          </div>
          {rating && (
            <div className="inline-flex items-center gap-1 bg-oro/15 text-noche px-3 py-1.5 rounded-full text-sm font-medium">
              <Star size={14} fill="currentColor" className="text-oro" />
              {rating}
            </div>
          )}
        </div>

        <div className="border-t border-noche/10" />

        <div className="mb-16 pt-8">
          <DescripcionExpandible paragraphs={parrafos} />
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

        {otros.length > 0 && (
          <div className="pb-16 border-t border-noche/10 pt-16">
            <span className="font-script text-4xl text-terracota block mb-1">{t("descubre")}</span>
            <h2 className="font-display text-2xl mb-6">{t("otros_apartamentos_titulo")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otros.map((a) => (
                <Link
                  key={a.slug}
                  href={`/apartamentos/${a.slug}`}
                  className="block bg-hueso border border-noche/10 rounded-xl overflow-hidden hover:border-terracota transition-colors"
                >
                  <div className="relative aspect-[4/3] bg-noche/10">
                    {a.foto ? (
                      <ImageWithSkeleton src={a.foto} alt={pick(a.nombreEs, a.nombreEn)} sizes="(max-width: 640px) 100vw, 300px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-noche/30 text-xs">
                        {t("foto_pendiente")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-noche/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg text-hueso mb-1">{pick(a.nombreEs, a.nombreEn)}</h3>
                      <p className="text-sm text-hueso/70 mb-3">{pick(a.detalleEs, a.detalleEn)}</p>
                      <span className="inline-flex items-center gap-1 bg-oro text-noche text-xs font-medium px-3 py-1.5 rounded-full">
                        {t("ver_apartamento")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/#apartamentos" className="inline-block mt-6 text-sm text-terracota border-b border-terracota">
              {t("ver_todos_apartamentos")}
            </Link>
          </div>
        )}
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
          <div className="font-display text-lg">{nombreCorto}</div>
          {rating && (
            <div className="text-xs text-noche/60 flex items-center gap-1">
              <Star size={12} fill="currentColor" className="text-oro" />
              {rating}
            </div>
          )}
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

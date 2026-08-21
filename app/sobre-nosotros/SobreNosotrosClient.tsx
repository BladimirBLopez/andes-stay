"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Star, Target, Eye, Quote } from "lucide-react";
import Footer from "../Footer";
import ImageWithSkeleton from "../ImageWithSkeleton";
import LangSwitcher from "../LangSwitcher";
import { useLanguage } from "../LanguageContext";

const WHATSAPP_NUMBER = "59176570041";

const testimonios = [
  { nombre: "Gustavo", ciudad: "Santa Cruz de la Sierra", texto: "Cómodo Dpto" },
  { nombre: "Cesar Andrés", ciudad: "La Paz", texto: "Totalmente recomendable." },
  { nombre: "Daniel", ciudad: "Huésped Airbnb", texto: "Excelente host y buen lugar" },
];

export default function SobreNosotrosClient() {
  const { t, lang } = useLanguage();
  const whatsappMsg =
    lang === "es"
      ? "Hola, quisiera reservar un apartamento en La Paz"
      : "Hi, I'd like to book an apartment in La Paz";

  return (
    <main>
      <div className="relative w-full aspect-[4/3] md:aspect-[16/6] bg-noche/10">
        <ImageWithSkeleton
          src="elegante-exterior-1"
          alt="VIP Estadías - Sopocachi, La Paz"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-noche/20 to-noche/10" />
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 bg-noche/60 hover:bg-noche/80 backdrop-blur-sm text-hueso rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-md"
        >
          <ArrowLeft size={16} />
          {t("volver")}
        </Link>
        <div className="absolute top-4 right-4 bg-noche/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <LangSwitcher light />
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-3xl mx-auto w-full">
          <span className="font-script text-4xl text-oro block mb-1">VIP Estadías</span>
          <h1 className="font-display text-3xl md:text-5xl text-hueso">{t("sobre_titulo")}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="bg-hueso border-l-4 border-terracota rounded-r-2xl p-6 shadow-sm">
            <div className="w-11 h-11 bg-terracota/10 rounded-lg flex items-center justify-center mb-4">
              <Target size={20} className="text-terracota" />
            </div>
            <h2 className="font-display text-xl mb-3">{t("sobre_mision_titulo")}</h2>
            <p className="text-noche/70 leading-relaxed">
              {t("sobre_mision_texto")}
            </p>
          </div>
          <div className="bg-hueso border-l-4 border-terracota rounded-r-2xl p-6 shadow-sm">
            <div className="w-11 h-11 bg-terracota/10 rounded-lg flex items-center justify-center mb-4">
              <Eye size={20} className="text-terracota" />
            </div>
            <h2 className="font-display text-xl mb-3">{t("sobre_vision_titulo")}</h2>
            <p className="text-noche/70 leading-relaxed">
              {t("sobre_vision_texto")}
            </p>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="font-script text-4xl text-terracota block mb-1">{t("sobre_testimonios_eyebrow")}</span>
          <h2 className="font-display text-2xl">{t("sobre_testimonios_titulo")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonios.map((r) => (
            <div
              key={r.nombre}
              className="relative bg-hueso border border-noche/10 rounded-2xl p-6 hover:border-terracota hover:shadow-md transition-all"
            >
              <Quote size={32} className="text-oro/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-oro mb-3">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-noche/80 mb-4 relative z-10">&ldquo;{r.texto}&rdquo;</p>
              <p className="text-sm text-noche/50">{r.nombre} · {r.ciudad}</p>
            </div>
          ))}
        </div>

        <div className="text-center py-12 border-t border-noche/10">
          <p className="text-noche/60 mb-6">
            {t("sobre_cta_texto")}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
          >
            <MessageCircle size={18} />
            {t("contacto_boton")}
          </a>
        </div>
      </div>

      <Footer />

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[1002] bg-[#25D366] hover:bg-[#20bd5a] transition-colors text-white rounded-full p-4 shadow-lg"
        aria-label="Escribir por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.25.7-1.24 1.28-2.03 1.45-.55.11-1.26.2-3.66-.79-3.07-1.27-5.05-4.38-5.2-4.58-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.56c.28-.31.62-.39.82-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.85 2.08.93 2.23.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.54-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.35.08.13.08.72-.17 1.42Z" />
        </svg>
      </a>
    </main>
  );
}

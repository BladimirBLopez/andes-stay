"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import HeroCarousel from "./HeroCarousel";
import dynamic from "next/dynamic";

const MapaSopocachi = dynamic(() => import("./MapaSopocachi"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-noche/10 animate-pulse" />,
});
import CardCarousel from "./CardCarousel";
import Footer from "./Footer";
import { MessageCircle, Star, MapPin, Menu, X, ChevronDown, Wifi, ShieldCheck, Clock, Users, Flame, Tv, Camera, Droplet } from "lucide-react";
import { FacebookIcon, WhatsappIcon } from "./SocialIcons";
import { useLanguage } from "./LanguageContext";

const WHATSAPP_NUMBER = "59176570041";

const apartamentos = [
  { id: 1, nombre: "Elegante Apartamento", detalle: "Hermosa vista panorámica", zona: "La Paz", rating: "4.67 · 3 reseñas", fotos: [], slug: null },
  { id: 2, nombre: "Garzonier Moderno", detalle: "Flamante, céntrico", zona: "Sopocachi, La Paz", rating: "5.0 · 3 reseñas", fotos: [], slug: null },
  { id: 3, nombre: "Garzonier Premium", detalle: "Con sol y vista espectacular", zona: "La Paz", rating: "Novedad", fotos: ["premium-sala-1", "premium-sala-2", "premium-sala-3"], slug: "garzonier-premium" },
  { id: 4, nombre: "Apto. VIP de Lujo", detalle: "Penthouse", zona: "Sopocachi, La Paz", rating: "4.5 · 6 reseñas", fotos: ["vip-sala-1", "vip-sala-2", "vip-sala-3"], slug: "vip-de-lujo" },
];

const faqData = {
  es: [
    { q: "¿Cómo reservo un apartamento?", a: "Escríbenos por WhatsApp indicando el apartamento de tu interés y las fechas. Te confirmamos disponibilidad al instante." },
    { q: "¿A qué hora es el check-in y check-out?", a: "Check-in a partir de las 2:00 pm y check-out antes de las 11:00 am. El horario exacto se confirma al reservar." },
    { q: "¿Los apartamentos incluyen wifi?", a: "Sí, todos nuestros apartamentos cuentan con wifi de alta velocidad." },
    { q: "¿Dónde están ubicados los apartamentos?", a: "Los 4 apartamentos se encuentran en Sopocachi, una zona residencial y exclusiva de La Paz." },
    { q: "¿Cómo se coordina el pago?", a: "El método de pago se coordina directamente por WhatsApp al confirmar tu reserva." },
  ],
  en: [
    { q: "How do I book an apartment?", a: "Message us on WhatsApp with the apartment you're interested in and your dates. We'll confirm availability right away." },
    { q: "What time is check-in and check-out?", a: "Check-in from 2:00 pm and check-out before 11:00 am. Exact times are confirmed at booking." },
    { q: "Do the apartments include wifi?", a: "Yes, all our apartments have high-speed wifi." },
    { q: "Where are the apartments located?", a: "All 4 apartments are located in Sopocachi, an exclusive residential area of La Paz." },
    { q: "How is payment arranged?", a: "Payment method is arranged directly via WhatsApp when confirming your booking." },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Lista de idiomas disponibles. Para sumar un idioma nuevo: agregar aquí
// { code: "pt", label: "PT" } y crear las traducciones correspondientes
// en translations.ts. El dropdown se arma solo a partir de esta lista.
const LANGUAGES: { code: "es" | "en"; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

function LangSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const textColor = light ? "text-hueso" : "text-noche";
  const currentLabel = LANGUAGES.find((l) => l.code === lang)?.label ?? lang.toUpperCase();
  const otherLanguages = LANGUAGES.filter((l) => l.code !== lang);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium pb-1 border-b-2 ${open ? "border-terracota" : "border-transparent"} ${textColor}`}
      >
        {currentLabel}
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg overflow-hidden z-50 w-max">
          {otherLanguages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="block w-full px-3 py-1.5 text-xs font-medium text-noche hover:bg-noche/5 text-left"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const whatsappMsg =
    lang === "es"
      ? "Hola, quisiera reservar un apartamento en La Paz"
      : "Hi, I'd like to book an apartment in La Paz";

  return (
    <main>
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1001] bg-white backdrop-blur-sm border-b border-noche/10 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="px-6 py-3 max-w-5xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Image src="/vip-estadias-logo-icon.png" alt="VIP Estadías" width={40} height={26} className="h-8 w-auto" priority />
            <span className="font-display text-2xl text-noche">VIP Estadías</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-noche/80">
            <a href="#apartamentos" className="hover:text-terracota transition-colors">{t("nav_apartamentos")}</a>
            <Link href="/sobre-nosotros" className="hover:text-terracota transition-colors">{t("nav_nosotros")}</Link>
            <a href="#ubicacion" className="hover:text-terracota transition-colors">{t("nav_ubicacion")}</a>
            <a href="#faq" className="hover:text-terracota transition-colors">{t("nav_preguntas")}</a>
            <LangSwitcher />
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <LangSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-noche"
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[1005] bg-hueso flex flex-col items-center justify-center gap-8 px-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-noche"
            aria-label="Cerrar menú"
          >
            <X size={30} />
          </button>

          <span className="font-script text-6xl text-terracota mb-4">Menú</span>

          <a
            href="#apartamentos"
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl text-noche hover:text-terracota transition-colors"
          >
            {t("nav_apartamentos")}
          </a>
          <Link
            href="/sobre-nosotros"
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl text-noche hover:text-terracota transition-colors"
          >
            {t("nav_nosotros")}
          </Link>
          <a
            href="#ubicacion"
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl text-noche hover:text-terracota transition-colors"
          >
            {t("nav_ubicacion")}
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl text-noche hover:text-terracota transition-colors"
          >
            {t("nav_preguntas")}
          </a>

          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://www.facebook.com/share/1BR7wMazM7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon size={30} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon size={30} />
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[90svh] flex items-end text-hueso overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <HeroCarousel
            fotos={["premium-sala-6", "premium-sala-1", "premium-sala-3", "vip-sala-1", "vip-sala-3", "vip-sala-5"]}
            alt="VIP Estadías La Paz"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/80 to-noche/50" />
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut" }}
          variants={fadeUp}
          className="relative z-10 max-w-5xl mx-auto px-6 pb-16 pt-32"
        >
          <p className="uppercase tracking-[0.2em] text-sm text-terracota-light mb-4 flex items-center gap-2">
            <MapPin size={14} /> La Paz, Bolivia
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-4">
            {t("hero_titulo")}
          </h1>
          <p className="text-terracota-light text-lg md:text-xl mb-6">
            {t("hero_slogan")}
          </p>
          <p className="text-lg md:text-xl max-w-xl text-hueso/80 mb-4">
            {t("hero_desc")}
          </p>
          <a
            href="#apartamentos"
            className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
          >
            {t("hero_boton")}
          </a>
        </motion.div>
      </section>

      <div className="textil-divider" />

      {/* SERVICIOS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="bg-white py-24"
      >
        <div className="max-w-5xl mx-auto px-6">
          <span className="font-script text-5xl text-terracota block mb-1">{t("servicio_eyebrow")}</span>
          <h2 className="font-display text-2xl md:text-3xl mb-4 text-noche">
            {t("servicio_titulo")}
          </h2>
          <p className="text-lg text-noche/70 max-w-2xl mb-12">
            {t("servicio_sub")}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: MapPin, titulo: t("servicio_1_titulo") },
              { icon: Wifi, titulo: t("servicio_2_titulo") },
              { icon: MessageCircle, titulo: t("servicio_3_titulo") },
              { icon: ShieldCheck, titulo: t("servicio_4_titulo") },
              { icon: Clock, titulo: t("servicio_5_titulo") },
              { icon: Users, titulo: t("servicio_6_titulo") },
              { icon: Flame, titulo: t("servicio_7_titulo") },
              { icon: Tv, titulo: t("servicio_8_titulo") },
              { icon: Camera, titulo: t("servicio_9_titulo") },
              { icon: Droplet, titulo: t("servicio_10_titulo") },
            ].map((item, i) => (
              <motion.div
                key={item.titulo}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 border border-terracota/40 rounded-lg flex items-center justify-center mb-2">
                  <item.icon size={20} className="text-terracota" />
                </div>
                <span className="text-[11px] uppercase tracking-wide text-noche/70 leading-tight">{item.titulo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* APARTAMENTOS */}
      <section id="apartamentos" className="bg-hueso py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <span className="font-script text-5xl text-terracota block mb-1">{t("apartamentos_eyebrow")}</span>
            <h2 className="font-display text-2xl md:text-3xl mb-2">{t("apartamentos_titulo")}</h2>
            <p className="text-noche/60 mb-12">{t("apartamentos_sub")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {apartamentos.map((apto, i) => (
              <motion.div
                key={apto.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={fadeUp}
              >
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  glareEnable={false}
                  className="bg-hueso rounded-2xl overflow-hidden border border-noche/10 card-hover"
                >
                  <div className="aspect-[4/3] bg-noche/10 relative overflow-hidden">
                    <CardCarousel fotos={apto.fotos} alt={apto.nombre} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg mb-1">{apto.nombre}</h3>
                    <p className="text-sm text-noche/60 mb-1 flex items-center gap-1">
                      <MapPin size={12} /> {apto.detalle} · {apto.zona}
                    </p>
                    <p className="text-xs text-terracota flex items-center gap-1 mb-4">
                      <Star size={12} className="text-oro" fill="currentColor" /> {apto.rating}
                    </p>
                    <div className="flex gap-3">
                      {apto.slug && (
                        <Link
                          href={`/apartamentos/${apto.slug}`}
                          className="flex-1 text-center border border-noche/20 hover:border-terracota transition-colors text-noche text-sm font-medium rounded-full py-2"
                        >
                          {t("ver_detalles")}
                        </Link>
                      )}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa reservar el ${apto.nombre}. ¿Está disponible?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-terracota hover:bg-terracota-light transition-colors text-noche text-sm font-medium rounded-full py-2"
                      >
                        {t("reservar")}
                      </a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <motion.section
        id="ubicacion"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
        <span className="font-script text-5xl text-terracota block mb-1">{t("ubicacion_eyebrow")}</span>
        <h2 className="font-display text-2xl md:text-3xl mb-2">{t("ubicacion_titulo")}</h2>
        <p className="text-noche/60 mb-8">
          {t("ubicacion_sub")}
        </p>
        <div className="rounded-2xl overflow-hidden border border-noche/10 aspect-[16/9]">
          <MapaSopocachi />
        </div>
        <p className="text-sm text-noche/50 mt-3">
          {t("ubicacion_nota")}
        </p>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="bg-hueso py-20"
      >
        <div className="max-w-3xl mx-auto px-6">
        <span className="font-script text-5xl text-terracota block mb-1">{t("faq_eyebrow")}</span>
        <h2 className="font-display text-2xl md:text-3xl mb-10">{t("faq_titulo")}</h2>
        <div className="space-y-4">
          {faqData[lang].map((item) => (
            <details
              key={item.q}
              className="group border border-noche/10 rounded-xl px-5 py-4 bg-hueso"
            >
              <summary className="cursor-pointer font-medium flex items-center justify-between list-none">
                {item.q}
                <span className="text-terracota text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-noche/70 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
        </div>
      </motion.section>

      {/* CONTACTO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="font-display text-2xl md:text-3xl mb-4">
          {t("contacto_titulo")}
        </h2>
        <p className="text-noche/70 max-w-xl mx-auto mb-8">
          {t("contacto_sub")}
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
      </motion.section>

      <Footer />

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-[1002] flex items-center gap-2">
        {showGreeting && (
          <>
            <button
              onClick={() => setShowGreeting(false)}
              aria-label="Cerrar"
              className="w-7 h-7 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors text-gray-600 flex items-center justify-center shadow shrink-0"
            >
              <X size={14} />
            </button>
            <div className="bg-white rounded-xl shadow-xl px-4 py-2.5 max-w-[210px]">
              <p className="text-sm text-gray-700 leading-snug">¡Hola! ¿Le puedo ayudar en algo?</p>
            </div>
          </>
        )}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20bd5a] transition-colors text-white rounded-full p-4 shadow-lg shrink-0"
          aria-label="Escribir por WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.89L4 20l4.24-1.11a7.93 7.93 0 0 0 3.8.97h.003a7.94 7.94 0 0 0 7.93-7.94 7.86 7.86 0 0 0-2.37-5.6zM12.05 18.4a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.66.67-2.44-.16-.25a6.6 6.6 0 1 1 12.28-3.46 6.6 6.6 0 0 1-6.69 6.55zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.14-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.97-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.32.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.39-.32-.34-.44-.34h-.38c-.13 0-.34.05-.52.25-.18.2-.68.66-.68 1.6 0 .94.7 1.86.8 1.99.1.13 1.38 2.1 3.34 2.95.47.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.85.11-.93-.05-.08-.18-.13-.38-.23z" />
          </svg>
        </a>
      </div>
    </main>
  );
}

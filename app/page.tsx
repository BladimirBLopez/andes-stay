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
import { MessageCircle, Star, MapPin, Menu, X, ChevronDown, Wifi, ShieldCheck, Clock, Users } from "lucide-react";
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

function LangSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const textColor = light ? "text-hueso" : "text-noche";
  const otherLang = lang === "es" ? "en" : "es";
  const otherLabel = lang === "es" ? "EN" : "ES";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium ${textColor}`}
      >
        {lang.toUpperCase()}
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-hueso rounded-lg shadow-lg overflow-hidden z-50 min-w-[3rem]">
          <button
            onClick={() => {
              setLang(otherLang);
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-noche hover:bg-noche/5 text-left"
          >
            {otherLabel}
          </button>
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        className={`fixed top-0 left-0 right-0 z-[1001] bg-hueso/95 backdrop-blur-sm border-b border-noche/10 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="px-6 py-5 max-w-5xl mx-auto flex items-center justify-between">
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
              href="https://www.facebook.com/share/1ERTfyCjX2/"
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

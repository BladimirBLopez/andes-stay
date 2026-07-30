"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Tilt from "react-parallax-tilt";
import dynamic from "next/dynamic";

const MapaSopocachi = dynamic(() => import("./MapaSopocachi"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-noche/10 animate-pulse" />,
});
import CardCarousel from "./CardCarousel";
import { MessageCircle, Star, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "59176570041";

const apartamentos = [
  { id: 1, nombre: "Elegante Apartamento", detalle: "Hermosa vista panorámica", zona: "La Paz", rating: "4.67 · 3 reseñas", fotos: [], slug: null },
  { id: 2, nombre: "Garzonier Moderno", detalle: "Flamante, céntrico", zona: "Sopocachi, La Paz", rating: "5.0 · 3 reseñas", fotos: [], slug: null },
  { id: 3, nombre: "Garzonier Premium", detalle: "Con sol y vista espectacular", zona: "La Paz", rating: "Novedad", fotos: ["premium-sala-1", "premium-sala-2", "premium-sala-3"], slug: "garzonier-premium" },
  { id: 4, nombre: "Apto. VIP de Lujo", detalle: "Penthouse", zona: "Sopocachi, La Paz", rating: "4.5 · 6 reseñas", fotos: [], slug: null },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main>
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5 max-w-5xl mx-auto">
        <span className="font-display text-2xl text-hueso">VIP Estadías</span>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[90svh] flex items-end text-hueso overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <CldImage
            src="premium-sala-6"
            alt="VIP Estadías La Paz"
            fill
            priority
            className="object-cover"
            sizes="100vw"
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
            VIP Estadías
          </h1>
          <p className="text-terracota-light text-lg md:text-xl mb-6">
            Alojamientos que te hacen sentir en casa.
          </p>
          <p className="text-lg md:text-xl max-w-xl text-hueso/80 mb-4">
            Apartamentos amoblados y equipados en las mejores zonas de La
            Paz. Ubicación exclusiva, wifi de alta velocidad y todo lo que
            necesita para su estadía temporal.
          </p>
          <div className="flex items-center gap-2 text-terracota-light mb-8">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-hueso/90">4.69 · 160 reseñas · 4 años de anfitrión</span>
          </div>
          <a
            href="#apartamentos"
            className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
          >
            Reservar ahora
          </a>
        </motion.div>
      </section>

      <div className="textil-divider" />

      {/* SERVICIO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 py-20"
      >
        <h2 className="font-display text-3xl md:text-4xl mb-6">
          Por qué elegirnos
        </h2>
        <p className="text-lg text-noche/70 max-w-2xl mb-12">
          Con 4 años de experiencia, más de 160 reseñas y una calificación de
          4.69★, ofrecemos apartamentos confort en las zonas más exclusivas
          de La Paz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { titulo: "Ubicación exclusiva", texto: "Cerca de embajadas, malls, restaurantes y transporte público." },
            { titulo: "Todo equipado", texto: "Wifi de alta velocidad, cocina completa y servicios básicos incluidos." },
            { titulo: "Atención personal", texto: "Reserva y coordinación directa, sin intermediarios." },
          ].map((item, i) => (
            <motion.div
              key={item.titulo}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              variants={fadeUp}
            >
              <h3 className="font-display text-xl mb-2 text-terracota">{item.titulo}</h3>
              <p className="text-noche/70">{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* APARTAMENTOS */}
      <section id="apartamentos" className="bg-noche/5 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-2">Nuestros apartamentos</h2>
            <p className="text-noche/60 mb-12">4 opciones en las mejores zonas de La Paz</p>
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
                {(() => {
                  const CardContent = (
                    <>
                      <div className="aspect-[4/3] bg-noche/10 relative overflow-hidden">
                        <CardCarousel fotos={apto.fotos} alt={apto.nombre} />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg mb-1">{apto.nombre}</h3>
                        <p className="text-sm text-noche/60 mb-1 flex items-center gap-1">
                          <MapPin size={12} /> {apto.detalle} · {apto.zona}
                        </p>
                        <p className="text-xs text-terracota flex items-center gap-1">
                          <Star size={12} className="text-oro" fill="currentColor" /> {apto.rating}
                        </p>
                      </div>
                    </>
                  );
                  return apto.slug ? (
                    <Link href={`/apartamentos/${apto.slug}`} className="block">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  );
                })()}
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 py-20"
      >
        <h2 className="font-display text-3xl md:text-4xl mb-12">Sobre nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h3 className="font-display text-xl mb-3 text-terracota">Misión</h3>
            <p className="text-noche/70 leading-relaxed">
              Ofrecer alojamientos temporales confortables y seguros en las
              mejores zonas de La Paz, brindando a cada huésped una
              experiencia de atención personalizada, cercana y confiable.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-3 text-terracota">Visión</h3>
            <p className="text-noche/70 leading-relaxed">
              Ser la opción de referencia en alojamiento temporal en La Paz,
              reconocidos por la calidad de nuestros espacios y el trato
              cercano con cada huésped.
            </p>
          </div>
        </div>

        <h3 className="font-display text-2xl mb-6">Lo que dicen nuestros huéspedes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { nombre: "Gustavo", ciudad: "Santa Cruz de la Sierra", texto: "Cómodo Dpto" },
            { nombre: "Cesar Andrés", ciudad: "La Paz", texto: "Totalmente recomendable." },
            { nombre: "Daniel", ciudad: "Huésped Airbnb", texto: "Excelente host y buen lugar" },
          ].map((r) => (
            <div key={r.nombre} className="bg-hueso border border-noche/10 rounded-2xl p-6">
              <div className="flex items-center gap-1 text-oro mb-3">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-noche/80 mb-4">&ldquo;{r.texto}&rdquo;</p>
              <p className="text-sm text-noche/50">{r.nombre} · {r.ciudad}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* UBICACIÓN */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 py-20"
      >
        <h2 className="font-display text-3xl md:text-4xl mb-2">Nuestra ubicación</h2>
        <p className="text-noche/60 mb-8">
          Los 4 apartamentos se encuentran en Sopocachi, una zona residencial
          y exclusiva de La Paz.
        </p>
        <div className="rounded-2xl overflow-hidden border border-noche/10 aspect-[16/9]">
          <MapaSopocachi />
        </div>
        <p className="text-sm text-noche/50 mt-3">
          La ubicación exacta de cada apartamento se comparte al confirmar la reserva.
        </p>
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
        <h2 className="font-display text-3xl md:text-4xl mb-4">
          ¿Listo para su próxima estadía en La Paz?
        </h2>
        <p className="text-noche/70 max-w-xl mx-auto mb-8">
          Escríbanos directamente y le ayudamos a encontrar el apartamento
          ideal para su viaje.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera reservar un apartamento en La Paz")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
        >
          <MessageCircle size={18} />
          Reservar por WhatsApp
        </a>
      </motion.section>

      <footer className="text-center py-8 text-sm text-noche/50">
        VIP Estadías · La Paz, Bolivia
      </footer>
    </main>
  );
}

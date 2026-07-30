import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";

const WHATSAPP_NUMBER = "59176570041";

export const metadata: Metadata = {
  title: "Sobre Nosotros | VIP Estadías",
  description:
    "Conoce la misión, visión y reseñas de VIP Estadías, alojamiento temporal en apartamentos amoblados en Sopocachi, La Paz.",
};

export default function SobreNosotros() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-noche/60 hover:text-noche mb-8"
      >
        <ArrowLeft size={18} />
        Volver
      </Link>

      <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">
        VIP Estadías
      </p>
      <h1 className="font-display text-4xl md:text-5xl mb-10">Sobre nosotros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="font-display text-xl mb-3 text-terracota">Misión</h2>
          <p className="text-noche/70 leading-relaxed">
            Brindar servicios de alojamiento temporal en apartamentos
            amoblados y totalmente equipados, ofreciendo comodidad,
            seguridad, limpieza y atención personalizada que superen las
            expectativas de nuestros huéspedes. Nos comprometemos a
            proporcionar una experiencia de hospedaje confiable y de
            calidad, contribuyendo al bienestar de viajeros nacionales e
            internacionales mediante un servicio eficiente, cálido y
            profesional.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl mb-3 text-terracota">Visión</h2>
          <p className="text-noche/70 leading-relaxed">
            Ser la empresa líder en alojamiento temporal de alta calidad en
            La Paz, reconocida por la excelencia en el servicio, la
            confianza, la innovación y el confort que ofrecemos a nuestros
            huéspedes, expandiendo nuestra presencia con apartamentos
            cuidadosamente seleccionados y convirtiéndonos en la primera
            opción para viajeros nacionales e internacionales.
          </p>
        </div>
      </div>

      <h2 className="font-display text-2xl mb-6">Lo que dicen nuestros huéspedes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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

      <div className="text-center py-12 border-t border-noche/10">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera reservar un apartamento en La Paz")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
        >
          <MessageCircle size={18} />
          Reservar por WhatsApp
        </a>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera reservar un apartamento en La Paz")}`}
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

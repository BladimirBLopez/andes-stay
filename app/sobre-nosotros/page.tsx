import Link from "next/link";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";

const WHATSAPP_NUMBER = "59176570041";

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
    </main>
  );
}

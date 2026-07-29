const WHATSAPP_NUMBER = "59176570041";

const apartamentos = [
  { id: 1, nombre: "Elegante Apartamento", detalle: "Hermosa vista panorámica", zona: "La Paz", rating: "4.67 · 3 reseñas" },
  { id: 2, nombre: "Garzonier Moderno", detalle: "Flamante, céntrico", zona: "Sopocachi, La Paz", rating: "5.0 · 3 reseñas" },
  { id: 3, nombre: "Garzonier Premium", detalle: "Con sol y vista espectacular", zona: "La Paz", rating: "Nuevo" },
  { id: 4, nombre: "Apto. VIP de Lujo", detalle: "Penthouse", zona: "Sopocachi, La Paz", rating: "4.5 · 6 reseñas" },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90svh] flex items-end bg-noche text-hueso overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/80 to-noche/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 pt-32">
          <p className="uppercase tracking-[0.2em] text-sm text-terracota-light mb-4">
            La Paz, Bolivia
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
            Su apartamento,
            <br />
            administrado sin que
            <br />
            usted mueva un dedo.
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-hueso/80 mb-8">
            Gestión completa de su propiedad en modalidad Airbnb: huéspedes,
            limpieza, mantenimiento y ocupación. Usted recibe los resultados,
            yo me encargo del resto.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terracota hover:bg-terracota-light transition-colors text-hueso px-8 py-4 rounded-full font-medium"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      <div className="textil-divider" />

      {/* SERVICIO */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl mb-6">
          Administración integral, de principio a fin
        </h2>
        <p className="text-lg text-noche/70 max-w-2xl mb-4">
          Con 4 años de experiencia como anfitrión, más de 160 reseñas y una
          calificación de 4.69★, Wilmer administra apartamentos confort
          destacados por su localización y equipamiento.
        </p>
        <p className="text-lg text-noche/70 max-w-2xl mb-12">
          Puntualidad, gentileza, atención y hospitalidad son la base de cada
          propiedad que gestiona.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { titulo: "Gestión de huéspedes", texto: "Reservas, check-in, check-out y atención 24/7." },
            { titulo: "Mantenimiento", texto: "Limpieza profesional entre estadías y reparaciones." },
            { titulo: "Máxima ocupación", texto: "Optimización de precios y disponibilidad." },
          ].map((item) => (
            <div key={item.titulo}>
              <h3 className="font-display text-xl mb-2 text-terracota">{item.titulo}</h3>
              <p className="text-noche/70">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APARTAMENTOS */}
      <section className="bg-noche/5 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-2">Propiedades administradas</h2>
          <p className="text-noche/60 mb-12">4 apartamentos actualmente en gestión</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {apartamentos.map((apto) => (
              <div key={apto.id} className="bg-hueso rounded-2xl overflow-hidden border border-noche/10">
                <div className="aspect-[4/3] bg-noche/10 flex items-center justify-center text-noche/40 text-sm">
                  [Foto pendiente]
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-1">{apto.nombre}</h3>
                  <p className="text-sm text-noche/60 mb-1">{apto.detalle} · {apto.zona}</p>
                  <p className="text-xs text-terracota">★ {apto.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">
          ¿Tiene un apartamento y quiere que lo administremos?
        </h2>
        <p className="text-noche/70 max-w-xl mx-auto mb-8">
          Escríbame directamente y le cuento cómo funciona.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-terracota hover:bg-terracota-light transition-colors text-hueso px-8 py-4 rounded-full font-medium"
        >
          Contactar por WhatsApp
        </a>
      </section>

      <footer className="text-center py-8 text-sm text-noche/50">
        Andes Stay · La Paz, Bolivia
      </footer>
    </main>
  );
}

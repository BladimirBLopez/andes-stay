import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "59176570041";

export default function NotFound() {
  return (
    <main className="min-h-[80svh] flex flex-col items-center justify-center text-center px-6 bg-noche text-hueso">
      <p className="uppercase tracking-[0.2em] text-sm text-terracota-light mb-4">
        Error 404
      </p>
      <h1 className="font-display text-4xl md:text-6xl mb-6">
        Esta página no existe
      </h1>
      <p className="text-hueso/70 max-w-md mb-10">
        Puede que el enlace esté roto o la página haya sido movida. Volvamos
        a un lugar conocido.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
        >
          <Home size={18} />
          Volver al inicio
        </Link>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-hueso/30 hover:border-hueso/60 transition-colors text-hueso px-8 py-4 rounded-full font-medium"
        >
          <MessageCircle size={18} />
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}

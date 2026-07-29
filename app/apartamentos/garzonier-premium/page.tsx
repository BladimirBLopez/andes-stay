"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { ArrowLeft, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "59176570041";

const salaFotos = [
  "premium-sala-1",
  "premium-sala-2",
  "premium-sala-3",
  "premium-sala-4",
  "premium-sala-5",
  "premium-sala-6",
  "premium-sala-7",
];

function Ambiente({
  titulo,
  subtitulo,
  fotos,
}: {
  titulo: string;
  subtitulo?: string;
  fotos: string[];
}) {
  if (fotos.length === 0) return null;
  return (
    <div className="mb-16">
      <h2 className="font-display text-2xl mb-1">{titulo}</h2>
      {subtitulo && <p className="text-noche/60 mb-6">{subtitulo}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fotos.map((id) => (
          <div
            key={id}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-noche/10"
          >
            <CldImage
              src={id}
              alt={titulo}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GarzonierPremium() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-noche/60 hover:text-noche mb-8"
      >
        <ArrowLeft size={18} />
        Volver
      </Link>

      <p className="uppercase tracking-[0.2em] text-sm text-terracota mb-2">
        La Paz, Bolivia
      </p>
      <h1 className="font-display text-4xl md:text-5xl mb-3">
        Garzonier Premium con Sol y Vista Espectacular
      </h1>
      <p className="text-noche/70 mb-10">
        2 huéspedes · 1 habitación · 1 cama · 1 baño
      </p>

      <Ambiente titulo="Sala" fotos={salaFotos} />

      <div className="text-center py-12 border-t border-noche/10">
        <h2 className="font-display text-2xl mb-4">
          ¿Le interesa este apartamento?
        </h2>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-hueso px-8 py-4 rounded-full font-medium"
        >
          <MessageCircle size={18} />
          Consultar por WhatsApp
        </a>
      </div>
    </main>
  );
}

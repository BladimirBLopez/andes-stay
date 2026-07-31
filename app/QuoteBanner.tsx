"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const WHATSAPP_NUMBER = "59176570041";

export default function QuoteBanner() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const whatsappMsg =
    lang === "es"
      ? "Hola, quisiera reservar un apartamento en La Paz"
      : "Hi, I'd like to book an apartment in La Paz";

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[420px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <CldImage
          src="premium-sala-4"
          alt="VIP Estad\u00edas"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-noche/70" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="font-script text-4xl text-terracota-light mb-3">
          {t("quote_eyebrow")}
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-hueso max-w-2xl mb-8">
          {t("quote_titulo")}
        </h2>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-light transition-colors text-noche px-8 py-4 rounded-full font-medium"
        >
          <MessageCircle size={18} />
          {t("quote_boton")}
        </a>
      </div>
    </section>
  );
}

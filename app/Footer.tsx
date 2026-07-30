import Link from "next/link";
import { Mail } from "lucide-react";
import { WhatsappIcon, FacebookIcon, TiktokIcon, ThreadsIcon } from "./SocialIcons";

const WHATSAPP_NUMBER = "59176570041";

export default function Footer() {
  return (
    <footer className="bg-noche text-hueso/70 py-14 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-2xl text-hueso block mb-2">VIP Estadías</span>
          <p className="text-sm">Alojamientos que te hacen sentir en casa.</p>
        </div>
        <div>
          <h3 className="text-hueso text-sm uppercase tracking-wide mb-4">Navegación</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/#apartamentos" className="hover:text-terracota-light transition-colors">Apartamentos</Link>
            <Link href="/sobre-nosotros" className="hover:text-terracota-light transition-colors">Nosotros</Link>
            <Link href="/#ubicacion" className="hover:text-terracota-light transition-colors">Ubicación</Link>
            <Link href="/#faq" className="hover:text-terracota-light transition-colors">Preguntas</Link>
          </div>
        </div>
        <div>
          <h3 className="text-hueso text-sm uppercase tracking-wide mb-4">Contacto</h3>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracota-light transition-colors flex items-center gap-2"
            >
              <WhatsappIcon size={18} /> WhatsApp
            </a>
            <a
              href="https://www.facebook.com/share/1BR7wMazM7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracota-light transition-colors flex items-center gap-2"
            >
              <FacebookIcon size={18} /> Facebook
            </a>
            <a
              href="https://www.tiktok.com/@wilmer.pantoja?_r=1&_t=ZS-98TOWGgyOWX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracota-light transition-colors flex items-center gap-2"
            >
              <TiktokIcon size={18} /> TikTok
            </a>
            <a
              href="https://www.threads.com/@wilmer_pantoja"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracota-light transition-colors flex items-center gap-2"
            >
              <ThreadsIcon size={18} /> Threads
            </a>
            <a
              href="mailto:wilmerpantoja@gmail.com"
              className="hover:text-terracota-light transition-colors flex items-center gap-2"
            >
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto border-t border-hueso/10 mt-10 pt-6 text-xs text-hueso/40">
        © {new Date().getFullYear()} VIP Estadías · La Paz, Bolivia
      </div>
    </footer>
  );
}

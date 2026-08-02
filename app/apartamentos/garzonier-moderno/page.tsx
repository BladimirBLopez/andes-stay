import type { Metadata } from "next";
import GarzonierModernoClient from "./GarzonierModernoClient";

const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/moderno-sala-1";

export const metadata: Metadata = {
  title: "Flamante y Moderno Garzonier céntrico - Sopocachi | VIP Estadías",
  description:
    "Garzonier moderno y confortable en Sopocachi, La Paz. Ideal para 2 huéspedes, ubicación céntrica. Reserva por WhatsApp.",
  openGraph: {
    title: "Flamante y Moderno Garzonier céntrico - Sopocachi | VIP Estadías",
    description:
      "Garzonier moderno y confortable en Sopocachi, La Paz. Ideal para 2 huéspedes, ubicación céntrica.",
    url: "https://vipestadias.online/apartamentos/garzonier-moderno",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <GarzonierModernoClient />;
}

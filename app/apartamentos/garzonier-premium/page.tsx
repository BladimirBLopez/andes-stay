import type { Metadata } from "next";
import GarzonierPremiumClient from "./GarzonierPremiumClient";

const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/premium-sala-1";

export const metadata: Metadata = {
  title: "Garzonier Premium con Sol y Vista Espectacular | VIP Estadías",
  description:
    "Apartamento de 1 habitación en Sopocachi, La Paz. Moderno, soleado y confortable, a una cuadra de Plaza Avaroa. Reserva por WhatsApp.",
  openGraph: {
    title: "Garzonier Premium con Sol y Vista Espectacular | VIP Estadías",
    description:
      "Apartamento de 1 habitación en Sopocachi, La Paz. Moderno, soleado y confortable, a una cuadra de Plaza Avaroa.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <GarzonierPremiumClient />;
}

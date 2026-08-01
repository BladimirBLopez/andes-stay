import type { Metadata } from "next";
import EleganteApartamentoClient from "./EleganteApartamentoClient";

const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/elegante-sala-1";

export const metadata: Metadata = {
  title: "Elegante Apartamento con Vista Panorámica - Sopocachi | VIP Estadías",
  description:
    "Apartamento con 2 habitaciones y 3 camas en Sopocachi, La Paz. Vista panorámica, cocina equipada y ubicación estratégica. Reserva por WhatsApp.",
  openGraph: {
    title: "Elegante Apartamento con Vista Panorámica - Sopocachi | VIP Estadías",
    description:
      "Apartamento con 2 habitaciones y 3 camas en Sopocachi, La Paz. Vista panorámica, cocina equipada y ubicación estratégica.",
    url: "https://andes-stay-o6fy.vercel.app/apartamentos/elegante-apartamento",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <EleganteApartamentoClient />;
}

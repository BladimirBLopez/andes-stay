import type { Metadata } from "next";
import GarzonierPanoramicoClient from "./GarzonierPanoramicoClient";

const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/panoramico-salon1";

export const metadata: Metadata = {
  title: "Moderno Garzonier con Magnífica Vista Panorámica | VIP Estadías",
  description:
    "Garzonier moderno y amplio con espectacular vista panorámica en La Paz. Piso alto, soleado y equipado. Reserva por WhatsApp.",
  openGraph: {
    title: "Moderno Garzonier con Magnífica Vista Panorámica | VIP Estadías",
    description:
      "Garzonier moderno y amplio con espectacular vista panorámica en La Paz. Piso alto, soleado y equipado.",
    url: "https://vipestadias.online/apartamentos/garzonier-panoramico",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <GarzonierPanoramicoClient />;
}

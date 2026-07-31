import type { Metadata } from "next";
import VipLujoClient from "./VipLujoClient";

const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/vip-sala-1";

export const metadata: Metadata = {
  title: "Apto. VIP de Lujo en Penthouse - Sopocachi | VIP Estadías",
  description:
    "Penthouse de lujo con 3 habitaciones y 3 baños en Sopocachi, La Paz. Ideal para grupos y familias. Reserva por WhatsApp.",
  openGraph: {
    title: "Apto. VIP de Lujo en Penthouse - Sopocachi | VIP Estadías",
    description:
      "Penthouse de lujo con 3 habitaciones y 3 baños en Sopocachi, La Paz. Ideal para grupos y familias.",
    url: "https://andes-stay-o6fy.vercel.app/apartamentos/vip-de-lujo",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <VipLujoClient />;
}

import type { Metadata } from "next";
import VipLujoClient from "./VipLujoClient";

export const metadata: Metadata = {
  title: "Apto. VIP de Lujo en Penthouse - Sopocachi | VIP Estadías",
  description:
    "Penthouse de lujo con 3 habitaciones y 3 baños en Sopocachi, La Paz. Ideal para grupos y familias. Reserva por WhatsApp.",
};

export default function Page() {
  return <VipLujoClient />;
}

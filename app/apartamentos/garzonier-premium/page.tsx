import type { Metadata } from "next";
import GarzonierPremiumClient from "./GarzonierPremiumClient";

export const metadata: Metadata = {
  title: "Garzonier Premium con Sol y Vista Espectacular | VIP Estadías",
  description:
    "Apartamento de 1 habitación en Sopocachi, La Paz. Moderno, soleado y confortable, a una cuadra de Plaza Avaroa. Reserva por WhatsApp.",
};

export default function Page() {
  return <GarzonierPremiumClient />;
}

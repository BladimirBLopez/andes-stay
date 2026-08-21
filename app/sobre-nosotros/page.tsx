import type { Metadata } from "next";
import SobreNosotrosClient from "./SobreNosotrosClient";

export const metadata: Metadata = {
  title: "Sobre Nosotros | VIP Estadías",
  description:
    "Conoce la misión, visión y reseñas de VIP Estadías, alojamiento temporal en apartamentos amoblados en Sopocachi, La Paz.",
};

export default function Page() {
  return <SobreNosotrosClient />;
}

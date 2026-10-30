import HomeClient, { type HomeApto } from "./HomeClient";
import { getApartamentos } from "../lib/apartamentos";

export const revalidate = 60;

const RESPALDO: HomeApto[] = [
  { id: 1, nombre: "Elegante Apartamento", nombreEn: "", detalle: "Hermosa vista panorámica", detalleEn: "", zona: "La Paz", rating: "4.67 · 3 reseñas", fotos: ["elegante-sala-1", "elegante-sala-2", "elegante-sala-3"], slug: "elegante-apartamento" },
  { id: 2, nombre: "Garzonier Moderno", nombreEn: "", detalle: "Flamante, céntrico", detalleEn: "", zona: "Sopocachi, La Paz", rating: "5.0 · 3 reseñas", fotos: ["moderno-sala-1", "moderno-sala-2", "moderno-sala-3"], slug: "garzonier-moderno" },
  { id: 3, nombre: "Garzonier Premium", nombreEn: "", detalle: "Con sol y vista espectacular", detalleEn: "", zona: "La Paz", rating: null, fotos: ["premium-sala-1", "premium-sala-2", "premium-sala-3"], slug: "garzonier-premium" },
  { id: 4, nombre: "Apto. VIP de Lujo", nombreEn: "", detalle: "Penthouse", detalleEn: "", zona: "Sopocachi, La Paz", rating: "4.5 · 6 reseñas", fotos: ["vip-sala-1", "vip-sala-2", "vip-sala-3"], slug: "vip-de-lujo" },
  { id: 5, nombre: "Garzonier Panorámico", nombreEn: "", detalle: "Vista panorámica espectacular", detalleEn: "", zona: "La Paz", rating: null, fotos: ["panoramico-salon3", "panoramico-salon1", "panoramico-salon2"], slug: "garzonier-panoramico" },
];

async function cargar(): Promise<HomeApto[]> {
  try {
    const lista = await getApartamentos();
    if (lista.length === 0) return RESPALDO;
    return lista.map((a) => {
      const sala = a.fotos.filter((f) => f.categoria === "sala");
      const base = sala.length ? sala : a.fotos;
      return {
        id: a.id,
        nombre: a.nombreEs,
        nombreEn: a.nombreEn,
        detalle: a.detalleEs,
        detalleEn: a.detalleEn,
        zona: a.zona,
        rating: a.rating,
        fotos: base.slice(0, 3).map((f) => f.publicId),
        slug: a.slug,
      };
    });
  } catch {
    return RESPALDO;
  }
}

export default async function Page() {
  const apartamentos = await cargar();
  return <HomeClient apartamentos={apartamentos} />;
}

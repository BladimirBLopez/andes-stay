export const CATALOGO = [
  { k: "wifi", es: "Wifi", en: "Wifi" },
  { k: "tv", es: "TV Android", en: "Android TV" },
  { k: "gas", es: "Gas domiciliario", en: "Piped gas" },
  { k: "cocina", es: "Cocina equipada", en: "Fully equipped kitchen" },
  { k: "servicios", es: "Servicios básicos incluidos", en: "Basic utilities included" },
  { k: "lavadora", es: "Lavadora", en: "Washing machine" },
  { k: "calefaccion", es: "Calefacción", en: "Heating" },
  { k: "ascensor", es: "Ascensor", en: "Elevator" },
  { k: "terraza", es: "Terraza", en: "Terrace" },
  { k: "vista", es: "Vista panorámica", en: "Panoramic view" },
  { k: "estacionamiento", es: "Estacionamiento", en: "Parking" },
  { k: "seguridad", es: "Seguridad 24h", en: "24h security" },
] as const;

export const AMENIDADES_BASE = ["wifi", "cocina", "servicios"];

export function limpiar(keys: unknown): string[] {
  const lista = Array.isArray(keys) ? keys.map(String) : [];
  return CATALOGO.map((c) => c.k as string).filter((k) => lista.includes(k));
}

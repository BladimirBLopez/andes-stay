export type Opcion = "" | "si" | "no";

export type Info = {
  entrada: string;
  salida: string;
  mascotas: Opcion;
  fiestas: Opcion;
  nota: string;
  direccion: string;
  mapa: string;
};

export const INFO_VACIA: Info = {
  entrada: "",
  salida: "",
  mascotas: "",
  fiestas: "",
  nota: "",
  direccion: "",
  mapa: "",
};

const hora = (v: unknown) => (typeof v === "string" && /^\d{1,2}:\d{2}$/.test(v.trim()) ? v.trim() : "");
const opcion = (v: unknown): Opcion => (v === "si" || v === "no" ? v : "");
const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function limpiarInfo(x: unknown): Info {
  const o = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
  const mapa = texto(o.mapa, 500);
  return {
    entrada: hora(o.entrada),
    salida: hora(o.salida),
    mascotas: opcion(o.mascotas),
    fiestas: opcion(o.fiestas),
    nota: texto(o.nota, 600),
    direccion: texto(o.direccion, 200),
    mapa: /^https:\/\//i.test(mapa) ? mapa : "",
  };
}

export function infoVacia(i: Info) {
  return !(i.entrada || i.salida || i.mascotas || i.fiestas || i.nota || i.direccion || i.mapa);
}

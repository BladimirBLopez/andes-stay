import { prisma } from "./prisma";
import { INFO_VACIA, limpiarInfo, type Info } from "./infoCatalogo";

function leer(reglas: string | null, llegar: string | null): Info {
  const a = (s: string | null) => {
    try {
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  };
  return limpiarInfo({ ...a(reglas), ...a(llegar) });
}

type Fila = { reglas: string; llegar: string };

export async function getInfo(id: number): Promise<Info> {
  try {
    const r = await prisma.$queryRaw<Fila[]>`SELECT "reglas", "llegar" FROM "Apartamento" WHERE "id" = ${id} LIMIT 1`;
    return r[0] ? leer(r[0].reglas, r[0].llegar) : INFO_VACIA;
  } catch {
    return INFO_VACIA;
  }
}

export async function getInfoPorSlug(slug: string): Promise<Info> {
  try {
    const r = await prisma.$queryRaw<Fila[]>`SELECT "reglas", "llegar" FROM "Apartamento" WHERE "slug" = ${slug} LIMIT 1`;
    return r[0] ? leer(r[0].reglas, r[0].llegar) : INFO_VACIA;
  } catch {
    return INFO_VACIA;
  }
}

export async function guardarInfo(id: number, datos: unknown) {
  const i = limpiarInfo(datos);
  const reglas = JSON.stringify({
    entrada: i.entrada,
    salida: i.salida,
    mascotas: i.mascotas,
    fiestas: i.fiestas,
    nota: i.nota,
  });
  const llegar = JSON.stringify({ direccion: i.direccion, mapa: i.mapa });
  await prisma.$executeRaw`UPDATE "Apartamento" SET "reglas" = ${reglas}, "llegar" = ${llegar} WHERE "id" = ${id}`;
}

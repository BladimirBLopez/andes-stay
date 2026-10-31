import { prisma } from "./prisma";
import { AMENIDADES_BASE, limpiar } from "./amenidadesCatalogo";

function leer(v: string | null | undefined): string[] {
  return limpiar((v ?? "").split(","));
}

export async function getAmenidades(id: number): Promise<string[]> {
  try {
    const r = await prisma.$queryRaw<{ amenidades: string }[]>`SELECT "amenidades" FROM "Apartamento" WHERE "id" = ${id} LIMIT 1`;
    return r[0] ? leer(r[0].amenidades) : AMENIDADES_BASE;
  } catch {
    return AMENIDADES_BASE;
  }
}

export async function getAmenidadesPorSlug(slug: string): Promise<string[]> {
  try {
    const r = await prisma.$queryRaw<{ amenidades: string }[]>`SELECT "amenidades" FROM "Apartamento" WHERE "slug" = ${slug} LIMIT 1`;
    return r[0] ? leer(r[0].amenidades) : AMENIDADES_BASE;
  } catch {
    return AMENIDADES_BASE;
  }
}

export async function guardarAmenidades(id: number, keys: string[]) {
  const valor = limpiar(keys).join(",");
  await prisma.$executeRaw`UPDATE "Apartamento" SET "amenidades" = ${valor} WHERE "id" = ${id}`;
}

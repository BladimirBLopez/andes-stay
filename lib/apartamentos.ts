import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

const asc: Prisma.SortOrder = "asc";

const SELECT = Prisma.validator<Prisma.ApartamentoSelect>()({
  id: true,
  slug: true,
  nombreEs: true,
  nombreEn: true,
  tituloEs: true,
  tituloEn: true,
  detalleEs: true,
  detalleEn: true,
  zona: true,
  rating: true,
  huespedes: true,
  habitaciones: true,
  camas: true,
  banos: true,
  descripcionEs: true,
  descripcionEn: true,
  fotos: {
    orderBy: [{ orden: asc }, { id: asc }],
    select: { publicId: true, categoria: true, numero: true },
  },
});

export type Apto = Prisma.ApartamentoGetPayload<{ select: typeof SELECT }>;

export type Otro = {
  slug: string;
  nombreEs: string;
  nombreEn: string;
  detalleEs: string;
  detalleEn: string;
  foto: string | null;
};

export async function getApartamentos(): Promise<Apto[]> {
  return prisma.apartamento.findMany({
    where: { activo: true },
    orderBy: [{ orden: asc }, { id: asc }],
    select: SELECT,
  });
}

export async function getApartamento(slug: string): Promise<Apto | null> {
  return prisma.apartamento.findFirst({
    where: { slug, activo: true },
    select: SELECT,
  });
}

export async function getOtros(slug: string): Promise<Otro[]> {
  const todos = await getApartamentos();
  return todos
    .filter((a) => a.slug !== slug)
    .slice(0, 3)
    .map((a) => ({
      slug: a.slug,
      nombreEs: a.nombreEs,
      nombreEn: a.nombreEn,
      detalleEs: `${a.detalleEs} · ${a.zona}`,
      detalleEn: `${a.detalleEn || a.detalleEs} · ${a.zona}`,
      foto: a.fotos[0]?.publicId ?? null,
    }));
}

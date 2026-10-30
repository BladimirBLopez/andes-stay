import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

const BASE = "https://vipestadias.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fijas: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/sobre-nosotros`, changeFrequency: "monthly", priority: 0.5 },
  ];
  try {
    const aptos = await prisma.apartamento.findMany({
      where: { activo: true },
      select: { slug: true, updatedAt: true },
      orderBy: [{ orden: "asc" }, { id: "asc" }],
    });
    return [
      ...fijas,
      ...aptos.map((a) => ({
        url: `${BASE}/apartamentos/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    return fijas;
  }
}

import { prisma } from "./prisma";

export const WHATSAPP_RESPALDO = "59176570041";

export async function getWhatsapp(): Promise<string> {
  try {
    const r = await prisma.$queryRaw<{ valor: string }[]>`SELECT "valor" FROM "Ajuste" WHERE "clave" = 'whatsapp' LIMIT 1`;
    const v = (r[0]?.valor ?? "").replace(/\D/g, "");
    return v.length >= 8 ? v : WHATSAPP_RESPALDO;
  } catch {
    return WHATSAPP_RESPALDO;
  }
}

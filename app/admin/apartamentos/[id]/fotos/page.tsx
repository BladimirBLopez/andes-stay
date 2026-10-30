import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Fotos from "./Fotos";

export const dynamic = "force-dynamic";

export default async function FotosApto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.apartamento.findUnique({
    where: { id: Number(id) },
    include: { fotos: { orderBy: [{ orden: "asc" }, { id: "asc" }] } },
  });
  if (!a) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 max-w-2xl mx-auto">
      <Link href={`/admin/apartamentos/${a.id}`} className="text-sm underline">← Volver</Link>
      <h1 className="text-xl font-semibold mt-3 mb-1">Fotos · {a.nombreEs}</h1>
      <p className="text-sm text-gray-600 mb-5">{a.fotos.length} fotos</p>
      <Fotos
        apartamentoId={a.id}
        cloud={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""}
        fotos={a.fotos.map((f) => ({
          id: f.id,
          publicId: f.publicId,
          categoria: f.categoria,
          numero: f.numero,
        }))}
      />
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Fotos from "./Fotos";
import AptoHeader from "../AptoHeader";

export const dynamic = "force-dynamic";

export default async function FotosApto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.apartamento.findUnique({
    where: { id: Number(id) },
    include: { fotos: { orderBy: [{ orden: "asc" }, { id: "asc" }] } },
  });
  if (!a) notFound();

  return (
    <main className="px-5 py-8 max-w-2xl mx-auto">
      <AptoHeader id={a.id} nombre={a.nombreEs} activo={a.activo} fotos={a.fotos.length} />
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

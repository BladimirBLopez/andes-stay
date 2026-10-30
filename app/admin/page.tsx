import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const aptos = await prisma.apartamento.findMany({
    orderBy: { orden: "asc" },
    include: { _count: { select: { fotos: true } } },
  });

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Panel VIP Estadías</h1>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm underline">Salir</button>
        </form>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {aptos.length} apartamentos · {aptos.reduce((s, a) => s + a._count.fotos, 0)} fotos
      </p>

      <div className="space-y-3">
        {aptos.map((a) => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{a.nombreEs}</h2>
                <p className="text-sm text-gray-600">{a.detalleEs} · {a.zona}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {a.huespedes} huéspedes · {a.habitaciones} hab · {a.banos} baños · {a._count.fotos} fotos
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  a.activo ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
              >
                {a.activo ? "Activo" : "Oculto"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

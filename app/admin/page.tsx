import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const total = await prisma.apartamento.count();
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Panel VIP Estadías</h1>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm underline">Salir</button>
        </form>
      </div>
      <p className="text-gray-700">Conexión a Neon OK. Apartamentos cargados: {total}</p>
    </main>
  );
}

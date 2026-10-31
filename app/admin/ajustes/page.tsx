import { getWhatsapp } from "@/lib/ajustes";
import FormAjustes from "./FormAjustes";

export const dynamic = "force-dynamic";

export default async function Ajustes() {
  const whatsapp = await getWhatsapp();
  return (
    <main className="px-5 pt-6 pb-32 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-noche/50">Panel</p>
      <h1 className="font-display text-3xl text-noche mb-5">Ajustes del sitio</h1>
      <FormAjustes inicial={whatsapp} />
    </main>
  );
}

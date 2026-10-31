import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApartamento, getOtros } from "../../../lib/apartamentos";
import { getAmenidadesPorSlug } from "../../../lib/amenidades";
import ApartamentoClient from "./ApartamentoClient";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getApartamento(slug);
  if (!a) return { title: "VIP Estadías" };
  const titulo = `${a.tituloEs || a.nombreEs} | VIP Estadías`;
  const primera = a.descripcionEs.split(/\n\s*\n/)[0] || "";
  const descripcion = (primera || `${a.nombreEs} en ${a.zona}. Reserva por WhatsApp.`).slice(0, 160);
  const sala = a.fotos.find((f) => f.categoria === "sala") ?? a.fotos[0];
  const og = sala
    ? `https://res.cloudinary.com/dkq95jus0/image/upload/w_1200,h_630,c_fill,g_auto/${sala.publicId}`
    : undefined;
  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: `https://vipestadias.online/apartamentos/${a.slug}`,
      type: "website",
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const apto = await getApartamento(slug);
  if (!apto) notFound();
  const otros = await getOtros(slug);
  const amenidades = await getAmenidadesPorSlug(slug);
  return <ApartamentoClient apto={apto} otros={otros} amenidades={amenidades} />;
}

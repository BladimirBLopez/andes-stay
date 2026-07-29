import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Andes Stay | Administración de apartamentos Airbnb en La Paz",
  description:
    "Administro su apartamento en modalidad Airbnb: gestión de huéspedes, mantenimiento y máxima ocupación, sin que usted tenga que estar presente.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        {children}
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}

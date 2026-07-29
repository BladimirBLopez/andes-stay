import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
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
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        {children}
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}

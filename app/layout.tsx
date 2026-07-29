import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VIP Estadías | Alojamientos que te hacen sentir en casa",
  description:
    "Apartamentos amoblados y equipados en La Paz para tu estadía temporal. Ubicaciones exclusivas, wifi de alta velocidad y todo lo que necesitas para sentirte como en casa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${manrope.variable} antialiased`}>
        {children}
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}

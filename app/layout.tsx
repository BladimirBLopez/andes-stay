import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Alex_Brush } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { LanguageProvider } from "./LanguageContext";
import SmoothScroll from "./SmoothScroll";

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

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vipestadias.online"),
  title: "VIP Estadías | Departamentos Amoblados en Alquiler en La Paz",
  description:
    "Departamentos amoblados en alquiler en Sopocachi, La Paz, Bolivia. Wifi de alta velocidad, TV Android, gas domiciliario y atención directa por WhatsApp.",
  openGraph: {
    type: "website",
    url: "https://vipestadias.online",
    title: "VIP Estadías | Departamentos Amoblados en Alquiler en La Paz",
    description:
      "Departamentos amoblados en alquiler en Sopocachi, La Paz, Bolivia. Wifi de alta velocidad, TV Android, gas domiciliario y atención directa por WhatsApp.",
    images: [
      {
        url: "https://res.cloudinary.com/dkq95jus0/image/upload/f_auto,q_auto/og-home-1",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${manrope.variable} ${alexBrush.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "VIP Estadías",
              description:
                "Departamentos amoblados en alquiler en Sopocachi, La Paz, Bolivia. Wifi de alta velocidad, TV Android, gas domiciliario y atención directa por WhatsApp.",
              url: "https://vipestadias.online",
              image: "https://res.cloudinary.com/dkq95jus0/image/upload/premium-sala-1",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sopocachi, La Paz",
                addressCountry: "BO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -16.5075,
                longitude: -68.1256,
              },
              telephone: "+59176570041",
              sameAs: [
                "https://www.facebook.com/share/1BR7wMazM7/",
                "https://www.tiktok.com/@wilmer.pantoja",
                "https://www.threads.com/@wilmer_pantoja",
              ],
            }),
          }}
        />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  );
}

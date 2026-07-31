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
  metadataBase: new URL("https://andes-stay-o6fy.vercel.app"),
  title: "VIP Estadías | Alojamientos que te hacen sentir en casa",
  description:
    "Apartamentos amoblados y equipados en La Paz para tu estadía temporal. Ubicaciones exclusivas, wifi de alta velocidad y todo lo que necesitas para sentirte como en casa.",
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
                "Apartamentos amoblados y equipados en Sopocachi, La Paz, Bolivia, para estadías temporales.",
              url: "https://andes-stay-o6fy.vercel.app",
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

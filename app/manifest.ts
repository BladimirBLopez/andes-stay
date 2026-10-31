import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIP Estadías · Panel",
    short_name: "VIP Panel",
    description: "Panel de administración de VIP Estadías",
    start_url: "/admin",
    scope: "/admin",
    display: "standalone",
    orientation: "portrait",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [
      { src: "/api/pwa-icon?s=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/api/pwa-icon?s=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/api/pwa-icon?s=512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation } from "lucide-react";

const homeIconSvg = `
  <div style="
    background: #121212;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    border: 2px solid #c9a227;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  </div>
`;

const icon = L.divIcon({
  html: homeIconSvg,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const SOPOCACHI: [number, number] = [-16.5075, -68.1256];

const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SOPOCACHI[0]},${SOPOCACHI[1]}&travelmode=driving`;

export default function MapaSopocachi() {
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full h-full"
      aria-label="Ver cómo llegar en Google Maps"
    >
      <div className="absolute inset-0 z-[1000]" />
      <MapContainer
        center={SOPOCACHI}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={SOPOCACHI} icon={icon}>
          <Popup>VIP Estadías — Sopocachi, La Paz</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute bottom-3 right-3 z-[1000] bg-noche text-hueso text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <Navigation size={14} className="text-oro" />
        Cómo llegar
      </div>
    </a>
  );
}

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

export default function MapaSopocachi() {
  return (
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
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={SOPOCACHI} icon={icon}>
        <Popup>VIP Estadías — Sopocachi, La Paz</Popup>
      </Marker>
    </MapContainer>
  );
}

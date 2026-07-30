import pathlib

path = pathlib.Path("app/MapaSopocachi.tsx")
content = path.read_text()

old_imports = '''"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";'''

new_imports = '''"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation } from "lucide-react";'''

count1 = content.count(old_imports)
print(f"found_imports: {count1}")
assert count1 == 1, f"Esperaba 1, encontre {count1}"
content = content.replace(old_imports, new_imports)

old_return = '''export default function MapaSopocachi() {
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
}'''

new_return = '''const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SOPOCACHI[0]},${SOPOCACHI[1]}&travelmode=driving`;

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
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
}'''

count2 = content.count(old_return)
print(f"found_return: {count2}")
assert count2 == 1, f"Esperaba 1, encontre {count2}"
content = content.replace(old_return, new_return)

path.write_text(content)
print("OK")

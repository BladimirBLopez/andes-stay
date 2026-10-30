"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Foto = { id: number; publicId: string; categoria: string; numero: number | null };

const CATS = ["sala", "cocina", "comedor", "habitacion", "bano", "exterior", "lavado", "mas_fotos"];

const thumb = (cloud: string, id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_400,h_300,c_fill/${encodeURI(id)}`;

export default function Fotos({
  apartamentoId,
  cloud,
  fotos,
}: {
  apartamentoId: number;
  cloud: string;
  fotos: Foto[];
}) {
  const router = useRouter();
  const [cat, setCat] = useState("sala");
  const [num, setNum] = useState("");
  const [msg, setMsg] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const api = `/api/admin/apartamentos/${apartamentoId}/fotos`;

  async function subir(files: FileList | null) {
    if (!files || !files.length) return;
    setSubiendo(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      setMsg(`Subiendo ${ok + 1} de ${files.length}...`);
      const s = await fetch("/api/admin/cloudinary-sign", { method: "POST" })
        .then((r) => r.json())
        .catch(() => ({}));
      if (!s.signature) { setMsg("No se pudo firmar la subida"); break; }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", s.apiKey);
      fd.append("timestamp", String(s.timestamp));
      fd.append("signature", s.signature);
      fd.append("folder", s.folder);
      const up = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      if (!up.ok) { setMsg("Cloudinary rechazó la foto (¿pesa más de 10 MB?)"); break; }
      const j = await up.json();
      const reg = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: j.public_id, categoria: cat, numero: num ? Number(num) : null }),
      });
      if (!reg.ok) { setMsg("No se pudo guardar la foto en la base"); break; }
      ok++;
    }
    setSubiendo(false);
    setMsg(ok ? `${ok} foto(s) subida(s) ✓` : msg);
    router.refresh();
  }

  async function accion(method: "PATCH" | "DELETE", body: object) {
    const res = await fetch(api, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) setMsg(`Error ${res.status}`);
    router.refresh();
  }

  const campo = "border border-gray-300 rounded-lg px-3 py-2 text-base bg-white";

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium">Subir fotos nuevas</p>
        <div className="flex gap-2">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${campo} flex-1`}>
            {CATS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="N°"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className={`${campo} w-20`}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={subiendo}
          onChange={(e) => subir(e.target.files)}
          className="block w-full text-sm"
        />
        {msg && <p className="text-sm text-gray-700">{msg}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fotos.map((f, i) => (
          <div key={f.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(cloud, f.publicId)} alt={f.publicId} loading="lazy" className="w-full h-32 object-cover bg-gray-100" />
            <div className="p-2 space-y-2">
              <p className="text-xs text-gray-600 truncate">
                {f.categoria}{f.numero ? ` ${f.numero}` : ""} · {f.publicId}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button
                    disabled={i === 0}
                    onClick={() => accion("PATCH", { fotoId: f.id, dir: "up" })}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-30"
                  >↑</button>
                  <button
                    disabled={i === fotos.length - 1}
                    onClick={() => accion("PATCH", { fotoId: f.id, dir: "down" })}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-30"
                  >↓</button>
                </div>
                <button
                  onClick={() => confirm("¿Quitar esta foto del apartamento?") && accion("DELETE", { fotoId: f.id })}
                  className="px-3 py-1 text-red-600 border border-red-200 rounded"
                >Quitar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { falla } from "@/lib/mensajes";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import Confirmar from "../../../Confirmar";

type Foto = { id: number; publicId: string; categoria: string; numero: number | null };

const CATS: [string, string][] = [
  ["sala", "Sala"],
  ["cocina", "Cocina"],
  ["comedor", "Comedor"],
  ["habitacion", "Habitación"],
  ["bano", "Baño"],
  ["exterior", "Exterior"],
  ["lavado", "Área de lavado"],
  ["mas_fotos", "Más fotos"],
];
const nombreCat = (c: string) => CATS.find(([k]) => k === c)?.[1] ?? c;

const thumb = (cloud: string, id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_400,h_300,c_fill/${encodeURI(id)}`;

function Item({
  f,
  pos,
  cloud,
  onDelete,
}: {
  f: Foto;
  pos: number;
  cloud: string;
  onDelete: (f: Foto) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: f.id });
  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`
      : undefined,
    transition,
    zIndex: isDragging ? 30 : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-sm ${isDragging ? "ring-2 ring-oro shadow-xl opacity-90" : ""}`}
    >
      <div className="relative aspect-[4/3] bg-noche/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(cloud, f.publicId)} alt={f.publicId} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute top-2 left-2 min-w-6 h-6 px-1.5 rounded-full bg-noche/75 text-hueso text-xs font-medium flex items-center justify-center">
          {pos}
        </span>
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Arrastrar para ordenar"
          className="absolute top-1.5 right-1.5 w-10 h-10 rounded-full bg-noche/75 text-hueso flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-xs font-medium text-noche/70 truncate">
          {nombreCat(f.categoria)}
          {f.numero ? ` ${f.numero}` : ""}
        </span>
        <button
          type="button"
          onClick={() => onDelete(f)}
          aria-label="Quitar foto"
          className="w-8 h-8 rounded-full text-red-600 bg-red-50 flex items-center justify-center shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

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
  const [items, setItems] = useState<Foto[]>(fotos);
  const [cat, setCat] = useState("sala");
  const [num, setNum] = useState("");
  const [msg, setMsg] = useState("");
  const [porQuitar, setPorQuitar] = useState<Foto | null>(null);
  const [quitando, setQuitando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const api = `/api/admin/apartamentos/${apartamentoId}/fotos`;

  useEffect(() => {
    setItems(fotos);
  }, [fotos]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  async function alSoltar(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const de = items.findIndex((f) => f.id === active.id);
    const a = items.findIndex((f) => f.id === over.id);
    if (de < 0 || a < 0) return;
    const nuevo = arrayMove(items, de, a);
    setItems(nuevo);
    setMsg("Guardando orden...");
    const res = await fetch(api, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: nuevo.map((f) => f.id) }),
    }).catch(() => null);
    if (res && res.ok) {
      setMsg("");
      toast.success("Orden guardado");
    } else {
      setMsg("");
      falla(res, "No se pudo guardar el orden");
      setItems(fotos);
    }
    router.refresh();
  }

  async function quitar(f: Foto) {
    setQuitando(true);
    const antes = items;
    setItems(items.filter((x) => x.id !== f.id));
    const res = await fetch(api, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fotoId: f.id }),
    }).catch(() => null);
    if (!res || !res.ok) {
      falla(res, "No se pudo quitar la foto");
      setItems(antes);
    } else {
      toast.success("Foto quitada");
    }
    setQuitando(false);
    setPorQuitar(null);
    router.refresh();
  }

  async function subir(files: FileList | null) {
    if (!files || !files.length) return;
    setSubiendo(true);
    let ok = 0;
    let error = "";
    for (const file of Array.from(files)) {
      setMsg(`Subiendo ${ok + 1} de ${files.length}...`);
      const s = await fetch("/api/admin/cloudinary-sign", { method: "POST" })
        .then((r) => r.json())
        .catch(() => ({}));
      if (!s.signature) { error = "No se pudo firmar la subida (revisa tu internet o entra de nuevo al login)"; break; }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", s.apiKey);
      fd.append("timestamp", String(s.timestamp));
      fd.append("signature", s.signature);
      fd.append("folder", s.folder);
      const up = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      }).catch(() => null);
      if (!up || !up.ok) { error = "Cloudinary rechazó la foto (¿pesa más de 10 MB?)"; break; }
      const j = await up.json();
      const reg = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: j.public_id, categoria: cat, numero: num ? Number(num) : null }),
      }).catch(() => null);
      if (!reg || !reg.ok) { error = reg ? "No se pudo guardar la foto en la base" : "Sin conexión al guardar la foto"; break; }
      ok++;
    }
    setSubiendo(false);
    setMsg(error ? `${error}${ok ? ` (${ok} subidas antes)` : ""}` : `${ok} foto(s) subida(s) ✓`);
    router.refresh();
  }

  const campo =
    "border border-noche/20 rounded-xl px-3 py-2.5 text-base bg-white focus:outline-none focus:border-oro focus:ring-1 focus:ring-oro";

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl p-4 space-y-3 shadow-sm">
        <p className="font-display text-xl text-noche">Subir fotos nuevas</p>
        <div className="flex gap-2">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${campo} flex-1`}>
            {CATS.map(([k, label]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
          <input
            type="number"
            inputMode="numeric"
            placeholder="N°"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className={`${campo} w-20`}
          />
        </div>
        <label
          className={`flex items-center justify-center gap-2 rounded-xl py-3 font-medium ${
            subiendo ? "bg-noche/30 text-hueso" : "bg-noche text-hueso"
          }`}
        >
          <ImagePlus size={18} />
          {subiendo ? "Subiendo..." : "Elegir fotos"}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={subiendo}
            onChange={(e) => {
              subir(e.target.files);
              e.target.value = "";
            }}
            className="hidden"
          />
        </label>
        <p className="text-xs text-noche/50">N° sirve para habitaciones y baños (ej. Habitación 2).</p>
        {msg && <p className="text-sm text-noche/70">{msg}</p>}
      </div>

      <p className="text-xs text-noche/50 px-1">Mantén y arrastra el botón ⋮⋮ de cada foto para ordenar.</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={alSoltar}>
        <SortableContext items={items.map((f) => f.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-3">
            {items.map((f, i) => (
              <Item key={f.id} f={f} pos={i + 1} cloud={cloud} onDelete={setPorQuitar} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Confirmar
        open={porQuitar !== null}
        onOpenChange={(v) => !v && setPorQuitar(null)}
        titulo="¿Quitar esta foto?"
        descripcion="Se quita del apartamento. La imagen queda guardada en Cloudinary."
        confirmarTexto="Sí, quitar"
        cargando={quitando}
        onConfirm={() => porQuitar && quitar(porQuitar)}
      />
    </div>
  );
}

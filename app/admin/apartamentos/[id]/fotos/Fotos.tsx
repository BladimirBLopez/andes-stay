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
import { GripVertical, Trash2, ImagePlus, Star, FolderInput } from "lucide-react";
import { toast } from "sonner";
import Confirmar from "../../../Confirmar";

type Foto = { id: number; publicId: string; categoria: string; numero: number | null };
type Grupo = { key: string; cat: string; numero: number | null; fotos: Foto[] };

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
const ORDEN = CATS.map(([k]) => k);
const nombreCat = (c: string) => CATS.find(([k]) => k === c)?.[1] ?? c;
const clave = (f: Foto) => `${f.categoria}|${f.numero ?? ""}`;
const tituloGrupo = (g: Grupo) => (g.numero ? `${nombreCat(g.cat)} ${g.numero}` : nombreCat(g.cat));

function agrupar(items: Foto[]): Grupo[] {
  const mapa = new Map<string, Grupo>();
  for (const f of items) {
    const k = clave(f);
    if (!mapa.has(k)) mapa.set(k, { key: k, cat: f.categoria, numero: f.numero, fotos: [] });
    mapa.get(k)!.fotos.push(f);
  }
  return [...mapa.values()].sort((a, b) => {
    const ia = ORDEN.indexOf(a.cat);
    const ib = ORDEN.indexOf(b.cat);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || (a.numero ?? 0) - (b.numero ?? 0);
  });
}

const thumb = (cloud: string, id: string) =>
  `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_400,h_300,c_fill/${encodeURI(id)}`;

function Item({
  f,
  pos,
  cloud,
  principal,
  portada,
  onDelete,
  onPrincipal,
  onMover,
}: {
  f: Foto;
  pos: number;
  cloud: string;
  principal: boolean;
  portada: boolean;
  onDelete: (f: Foto) => void;
  onPrincipal: (f: Foto) => void;
  onMover: (f: Foto) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: f.id });
  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`
      : undefined,
    transition,
    zIndex: isDragging ? 30 : undefined,
  };
  const btn = "w-9 h-9 rounded-full flex items-center justify-center shrink-0";
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
        {principal && (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-oro text-noche text-[11px] font-semibold px-2 py-0.5 rounded-full">
            <Star size={11} fill="currentColor" /> {portada ? "Portada" : "Principal"}
          </span>
        )}
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
      <div className="flex items-center justify-between gap-1 px-2 py-2">
        <div className="flex gap-1">
          <button
            type="button"
            disabled={principal}
            onClick={() => onPrincipal(f)}
            aria-label={portada ? "Es la portada" : "Hacer principal"}
            className={`${btn} ${principal ? "bg-oro/20 text-oro" : "bg-[#f1eee6] text-noche/70"}`}
          >
            <Star size={16} fill={principal ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={() => onMover(f)}
            aria-label="Cambiar de categoría"
            className={`${btn} bg-[#f1eee6] text-noche/70`}
          >
            <FolderInput size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onDelete(f)}
          aria-label="Quitar foto"
          className={`${btn} text-red-600 bg-red-50`}
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
  const [moviendo, setMoviendo] = useState<Foto | null>(null);
  const [catNueva, setCatNueva] = useState("sala");
  const [numNuevo, setNumNuevo] = useState("");
  const [guardandoMov, setGuardandoMov] = useState(false);
  const api = `/api/admin/apartamentos/${apartamentoId}/fotos`;

  useEffect(() => {
    setItems(fotos);
  }, [fotos]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const grupos = agrupar(items);

  async function guardarOrden(nuevo: Foto[]) {
    const antes = items;
    setItems(nuevo);
    const res = await fetch(api, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: nuevo.map((f) => f.id) }),
    }).catch(() => null);
    if (res && res.ok) {
      toast.success("Orden guardado");
    } else {
      falla(res, "No se pudo guardar el orden");
      setItems(antes);
    }
    router.refresh();
  }

  async function alSoltar(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const a = items.find((f) => f.id === active.id);
    const b = items.find((f) => f.id === over.id);
    if (!a || !b) return;
    if (clave(a) !== clave(b)) {
      toast.error("Solo puedes ordenar dentro del mismo grupo. Para cambiar de categoría usa el botón de carpeta");
      return;
    }
    const gs = agrupar(items);
    const g = gs.find((x) => x.key === clave(a));
    if (!g) return;
    const de = g.fotos.findIndex((f) => f.id === a.id);
    const al = g.fotos.findIndex((f) => f.id === b.id);
    if (de < 0 || al < 0) return;
    g.fotos = arrayMove(g.fotos, de, al);
    await guardarOrden(gs.flatMap((x) => x.fotos));
  }

  async function hacerPrincipal(f: Foto) {
    const gs = agrupar(items);
    const g = gs.find((x) => x.key === clave(f));
    if (!g) return;
    g.fotos = [f, ...g.fotos.filter((x) => x.id !== f.id)];
    await guardarOrden(gs.flatMap((x) => x.fotos));
  }

  function abrirMover(f: Foto) {
    setMoviendo(f);
    setCatNueva(f.categoria);
    setNumNuevo(f.numero ? String(f.numero) : "");
  }

  async function confirmarMover() {
    if (!moviendo) return;
    const numero = numNuevo ? Number(numNuevo) : null;
    setGuardandoMov(true);
    const res = await fetch(api, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fotoId: moviendo.id, categoria: catNueva, numero }),
    }).catch(() => null);
    setGuardandoMov(false);
    if (!res || !res.ok) {
      falla(res, "No se pudo cambiar la categoría");
      return;
    }
    setItems(items.map((x) => (x.id === moviendo.id ? { ...x, categoria: catNueva, numero } : x)));
    setMoviendo(null);
    toast.success("Categoría cambiada");
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

      <div className="bg-oro/10 rounded-2xl px-4 py-3 text-xs text-noche/70 space-y-1">
        <p>⋮⋮ arrastra para ordenar dentro del grupo.</p>
        <p>★ hace principal a la foto: la primera de Sala es la portada del sitio.</p>
        <p>📁 cambia la foto de categoría sin borrarla.</p>
      </div>

      {items.length === 0 && (
        <p className="text-center text-sm text-noche/50 py-10">Todavía no hay fotos. Sube la primera arriba.</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={alSoltar}>
        {grupos.map((g, gi) => (
          <section key={g.key} className="space-y-2">
            <div className="flex items-baseline justify-between px-1">
              <h2 className="font-display text-xl text-noche">{tituloGrupo(g)}</h2>
              <span className="text-xs text-noche/50">
                {g.fotos.length} {g.fotos.length === 1 ? "foto" : "fotos"}
              </span>
            </div>
            <SortableContext items={g.fotos.map((f) => f.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-3">
                {g.fotos.map((f, i) => (
                  <Item
                    key={f.id}
                    f={f}
                    pos={i + 1}
                    cloud={cloud}
                    principal={i === 0}
                    portada={gi === 0 && i === 0}
                    onDelete={setPorQuitar}
                    onPrincipal={hacerPrincipal}
                    onMover={abrirMover}
                  />
                ))}
              </div>
            </SortableContext>
          </section>
        ))}
      </DndContext>

      {moviendo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noche/60 backdrop-blur-sm p-5"
          onClick={() => setMoviendo(null)}
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 space-y-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-2xl text-noche">Cambiar de categoría</p>
            <div className="flex gap-2">
              <select value={catNueva} onChange={(e) => setCatNueva(e.target.value)} className={`${campo} flex-1`}>
                {CATS.map(([k, label]) => (
                  <option key={k} value={k}>{label}</option>
                ))}
              </select>
              <input
                type="number"
                inputMode="numeric"
                placeholder="N°"
                value={numNuevo}
                onChange={(e) => setNumNuevo(e.target.value)}
                className={`${campo} w-20`}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setMoviendo(null)}
                className="flex-1 border border-noche/20 rounded-xl py-3 text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarMover}
                disabled={guardandoMov}
                className="flex-1 bg-noche text-hueso rounded-xl py-3 text-sm font-medium disabled:opacity-50"
              >
                {guardandoMov ? "Guardando..." : "Mover"}
              </button>
            </div>
          </div>
        </div>
      )}

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

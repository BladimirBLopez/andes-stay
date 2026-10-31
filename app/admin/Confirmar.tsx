"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Confirmar({
  open,
  onOpenChange,
  titulo,
  descripcion,
  confirmarTexto = "Confirmar",
  cargando = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  titulo: string;
  descripcion: string;
  confirmarTexto?: string;
  cargando?: boolean;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[100] bg-noche/60 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed z-[101] left-1/2 top-1/2 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-5 shadow-2xl">
          <AlertDialog.Title className="font-display text-2xl text-noche mb-2">{titulo}</AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-noche/70 mb-5">{descripcion}</AlertDialog.Description>
          <div className="flex gap-2">
            <AlertDialog.Cancel className="flex-1 border border-noche/20 rounded-xl py-3 text-sm font-medium">
              Cancelar
            </AlertDialog.Cancel>
            <AlertDialog.Action
              disabled={cargando}
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              className="flex-1 bg-red-600 text-white rounded-xl py-3 text-sm font-medium disabled:opacity-50"
            >
              {cargando ? "Espera..." : confirmarTexto}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

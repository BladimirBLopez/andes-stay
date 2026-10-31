import { toast } from "sonner";

export function falla(res: Response | null, mensaje: string) {
  if (!res) {
    toast.error("Sin conexión. Revisa tu internet e intenta de nuevo");
    return;
  }
  if (res.status === 401) {
    toast.error("Tu sesión venció. Te llevo al login");
    setTimeout(() => {
      window.location.href = "/admin/login";
    }, 1500);
    return;
  }
  toast.error(mensaje);
}

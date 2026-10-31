import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export function refrescar(data: Record<string, unknown>) {
  try {
    revalidatePath("/", "layout");
  } catch {}
  return NextResponse.json(data);
}

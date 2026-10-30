import { NextResponse } from "next/server";
import { cerrarSesion } from "@/lib/auth";

export async function POST(req: Request) {
  await cerrarSesion();
  return NextResponse.redirect(new URL("/admin/login", req.url), 303);
}

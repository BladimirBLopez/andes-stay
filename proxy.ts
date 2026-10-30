import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const libre = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (libre) return NextResponse.next();

  const t = req.cookies.get("vip_admin")?.value;
  try {
    if (!t) throw new Error();
    await jwtVerify(t, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

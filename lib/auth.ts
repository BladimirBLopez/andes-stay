import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "vip_admin";
const key = () => new TextEncoder().encode(process.env.JWT_SECRET!);

export async function crearSesion() {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function cerrarSesion() {
  (await cookies()).delete(COOKIE);
}

export async function haySesion() {
  const t = (await cookies()).get(COOKIE)?.value;
  if (!t) return false;
  try {
    await jwtVerify(t, key());
    return true;
  } catch {
    return false;
  }
}

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST() {
  const secret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!secret || !apiKey || !cloudName) {
    return NextResponse.json({ error: "Faltan llaves de Cloudinary" }, { status: 500 });
  }
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "vipestadias";
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, secret);
  return NextResponse.json({ signature, timestamp, folder, apiKey, cloudName });
}

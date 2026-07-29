# Andes Stay (nombre de prueba)

Sitio informativo para administración de apartamentos Airbnb en La Paz.

## Stack
Next.js 15 (App Router) + Tailwind v4 (sin config file, tokens en `app/globals.css` vía `@theme`) + `next/font` para Fraunces + Inter.

## Estructura
- `app/layout.tsx` — fuentes + metadata SEO
- `app/page.tsx` — hero, servicio, grid de apartamentos, contacto
- `app/globals.css` — paleta y tokens de diseño

## Pendiente (reemplazar antes de entregar)
- [ ] Número de WhatsApp real (`WHATSAPP_NUMBER` en `app/page.tsx`)
- [ ] Nombre real del negocio (actualmente "Andes Stay")
- [ ] Fotos reales de los 4 apartamentos (subir a Cloudinary, usar `next/image`)
- [ ] Descripciones completas de cada anuncio (sacadas de Airbnb del cliente)
- [ ] Dominio propio + conectar en Vercel
- [ ] Mapa/ubicación (sección contacto, opcional)
- [ ] Favicon/logo

## Deploy
Push a GitHub → conectar repo en Vercel → deploy automático. Sin build local necesario, validar por logs de Vercel.

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old = '''    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787341634/Dise%C3%B1o_sin_t%C3%ADtulo_5_umz5ov.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787361649/Dise%C3%B1o_sin_t%C3%ADtulo_4_ayqhdq.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_2.png",
  },'''

c = content.count(old)
print("Ocurrencias encontradas:", c)
assert c == 1, f"Se esperaba 1, se encontraron {c}"

new = '''    fotoMujerDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787341634/Dise%C3%B1o_sin_t%C3%ADtulo_5_umz5ov.png",
    fotoMujerFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787361649/Dise%C3%B1o_sin_t%C3%ADtulo_4_ayqhdq.png",
    fotoHombreDentro: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoHombreFuera: "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png",
    fotoMujerSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png",
    fotoHombreSeccion2: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png",
  },'''

content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Listo: fotos de la seccion Femenino/Masculino actualizadas para Sport.")

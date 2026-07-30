import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old_ubicacion = '''        variants={fadeUp}
        className="bg-hueso py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
        <span className="font-script text-4xl text-terracota block mb-1">{t("ubicacion_eyebrow")}</span>'''

new_ubicacion = '''        variants={fadeUp}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
        <span className="font-script text-4xl text-terracota block mb-1">{t("ubicacion_eyebrow")}</span>'''

count1 = content.count(old_ubicacion)
print(f"found_ubicacion: {count1}")
assert count1 == 1, f"Esperaba 1, encontr\u00e9 {count1}"
content = content.replace(old_ubicacion, new_ubicacion)

old_faq = '''        variants={fadeUp}
        className="bg-white py-20"
      >
        <div className="max-w-3xl mx-auto px-6">'''

new_faq = '''        variants={fadeUp}
        className="bg-hueso py-20"
      >
        <div className="max-w-3xl mx-auto px-6">'''

count2 = content.count(old_faq)
print(f"found_faq: {count2}")
assert count2 == 1, f"Esperaba 1, encontr\u00e9 {count2}"
content = content.replace(old_faq, new_faq)

path.write_text(content)
print("OK")

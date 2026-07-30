import pathlib

path = pathlib.Path("app/layout.tsx")
content = path.read_text()

old_import = '''import type { Metadata } from "next";'''
new_import = '''import type { Metadata, Viewport } from "next";'''

count1 = content.count(old_import)
print(f"found_import: {count1}")
assert count1 == 1, f"Esperaba 1, encontre {count1}"
content = content.replace(old_import, new_import)

old_metadata_end = '''    "Apartamentos amoblados y equipados en La Paz para tu estad\u00eda temporal. Ubicaciones exclusivas, wifi de alta velocidad y todo lo que necesitas para sentirte como en casa.",
};'''

new_metadata_end = '''    "Apartamentos amoblados y equipados en La Paz para tu estad\u00eda temporal. Ubicaciones exclusivas, wifi de alta velocidad y todo lo que necesitas para sentirte como en casa.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};'''

count2 = content.count(old_metadata_end)
print(f"found_metadata: {count2}")
assert count2 == 1, f"Esperaba 1, encontre {count2}"
content = content.replace(old_metadata_end, new_metadata_end)

path.write_text(content)
print("OK")

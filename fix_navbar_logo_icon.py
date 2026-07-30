import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old_import = '''import Link from "next/link";'''
new_import = '''import Link from "next/link";
import Image from "next/image";'''

count1 = content.count(old_import)
print(f"found_import: {count1}")
assert count1 == 1, f"Esperaba 1, encontre {count1}"
content = content.replace(old_import, new_import)

old_logo = '''          <span className="font-display text-2xl text-noche">VIP Estad\u00edas</span>'''
new_logo = '''          <span className="flex items-center gap-2">
            <Image src="/vip-estadias-logo-icon.png" alt="VIP Estad\u00edas" width={40} height={26} className="h-8 w-auto" priority />
            <span className="font-display text-2xl text-noche">VIP Estad\u00edas</span>
          </span>'''

count2 = content.count(old_logo)
print(f"found_logo: {count2}")
assert count2 == 1, f"Esperaba 1, encontre {count2}"
content = content.replace(old_logo, new_logo)

path.write_text(content)
print("OK")

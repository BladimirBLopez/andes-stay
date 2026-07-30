import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old = '''font-display text-4xl md:text-5xl'''
new = '''font-display text-2xl md:text-3xl'''

count = content.count(old)
print(f"found: {count}")
assert count == 5, f"Esperaba 5, encontre {count}"

content = content.replace(old, new)
path.write_text(content)
print("OK")

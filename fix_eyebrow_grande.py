import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old = '''font-script text-4xl text-terracota'''
new = '''font-script text-5xl text-terracota'''

count = content.count(old)
print(f"found: {count}")
assert count == 4, f"Esperaba 4, encontre {count}"

content = content.replace(old, new)
path.write_text(content)
print("OK")

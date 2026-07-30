import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old1 = '''bg-hueso/95 backdrop-blur-sm border-b border-noche/10'''
new1 = '''bg-white backdrop-blur-sm border-b border-noche/10'''

count1 = content.count(old1)
print(f"found_bg: {count1}")
assert count1 == 1, f"Esperaba 1, encontre {count1}"
content = content.replace(old1, new1)

old2 = '''<div className="px-6 py-5 max-w-5xl mx-auto flex items-center justify-between">'''
new2 = '''<div className="px-6 py-3 max-w-5xl mx-auto flex items-center justify-between">'''

count2 = content.count(old2)
print(f"found_padding: {count2}")
assert count2 == 1, f"Esperaba 1, encontre {count2}"
content = content.replace(old2, new2)

path.write_text(content)
print("OK")

import pathlib

path = pathlib.Path("app/MapaSopocachi.tsx")
content = path.read_text()

old = '''        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />'''

new = '''        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />'''

count = content.count(old)
print(f"found: {count}")
assert count == 1, f"Esperaba 1, encontre {count}"

content = content.replace(old, new)
path.write_text(content)
print("OK")

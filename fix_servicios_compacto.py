import pathlib

path = pathlib.Path("app/page.tsx")
content = path.read_text()

old = '''          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, titulo: t("servicio_1_titulo"), texto: t("servicio_1_texto") },
              { icon: Wifi, titulo: t("servicio_2_titulo"), texto: t("servicio_2_texto") },
              { icon: MessageCircle, titulo: t("servicio_3_titulo"), texto: t("servicio_3_texto") },
              { icon: ShieldCheck, titulo: t("servicio_4_titulo"), texto: t("servicio_4_texto") },
              { icon: Clock, titulo: t("servicio_5_titulo"), texto: t("servicio_5_texto") },
              { icon: Users, titulo: t("servicio_6_titulo"), texto: t("servicio_6_texto") },
            ].map((item, i) => (
              <motion.div
                key={item.titulo}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                variants={fadeUp}
                className="bg-hueso border border-noche/10 rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-terracota/10 flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-terracota" />
                </div>
                <h3 className="font-display text-xl mb-2 text-noche">{item.titulo}</h3>
                <p className="text-noche/60">{item.texto}</p>
              </motion.div>
            ))}
          </div>'''

new = '''          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: MapPin, titulo: t("servicio_1_titulo") },
              { icon: Wifi, titulo: t("servicio_2_titulo") },
              { icon: MessageCircle, titulo: t("servicio_3_titulo") },
              { icon: ShieldCheck, titulo: t("servicio_4_titulo") },
              { icon: Clock, titulo: t("servicio_5_titulo") },
              { icon: Users, titulo: t("servicio_6_titulo") },
            ].map((item, i) => (
              <motion.div
                key={item.titulo}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 border border-terracota/40 rounded-lg flex items-center justify-center mb-2">
                  <item.icon size={20} className="text-terracota" />
                </div>
                <span className="text-[11px] uppercase tracking-wide text-noche/70 leading-tight">{item.titulo}</span>
              </motion.div>
            ))}
          </div>'''

count = content.count(old)
print(f"found: {count}")
assert count == 1, f"Esperaba 1, encontre {count}"

content = content.replace(old, new)
path.write_text(content)
print("OK")

"use client";

import { createContext, useContext } from "react";

const Ctx = createContext("59176570041");

export function AjustesProvider({ whatsapp, children }: { whatsapp: string; children: React.ReactNode }) {
  return <Ctx.Provider value={whatsapp}>{children}</Ctx.Provider>;
}

export function useWhatsapp() {
  return useContext(Ctx);
}

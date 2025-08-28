"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getTranslation, type Translations } from "@/lib/translations"

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  const t = (key: keyof Translations): string => {
    return getTranslation(key, language)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

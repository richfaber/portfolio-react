import i18next from '@/i18n'
import { createContext, useContext, useState } from 'react'

export type I18nContextType = {
  locale: string,
  setLocale: (lang:string) => void
  t: (key: string, options?: object) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }) {

  const [locale, setLocaleState] = useState(
    () => localStorage.getItem('locale') ?? 'ko'
  )

  async function setLocale(lang) {

    localStorage.setItem('locale', lang)
    await i18next.changeLanguage(lang)

    setLocaleState(lang)

  }

  return (

    <I18nContext.Provider value={{ locale, setLocale, t: (key, options?) => i18next.t(key, { lng: locale, ...options }) }}>
      { children }
    </I18nContext.Provider>

  )
}

export function useI18n() {

  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n 는 반드시 I18nProvider 안에서 사용 되어야 함.')

  return context
}
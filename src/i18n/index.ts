import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANG, detectLang, langFromPath } from './languages'
import { resources } from './resources'

// The URL decides the language; only the bare "/" falls back to the saved/browser choice.
const initial = langFromPath(window.location.pathname) ?? detectLang()

void i18n.use(initReactI18next).init({
  resources,
  lng: initial,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: ['en', 'fr', 'uk'],
  defaultNS: 'common',
  ns: ['common', 'home', 'meta'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n

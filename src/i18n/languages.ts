/** Language codes used in URLs and <html lang>; `label` is what the switcher shows. */
export const LANGUAGES = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uk', label: 'UA', name: 'Українська' },
] as const

export type Lang = (typeof LANGUAGES)[number]['code']

/** Used for visitors with no saved choice and no matching browser language. */
export const DEFAULT_LANG: Lang = 'fr'

const STORAGE_KEY = 'lang'

export function isLang(value: string | undefined): value is Lang {
  return LANGUAGES.some((l) => l.code === value)
}

export function readStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return isLang(v ?? undefined) ? (v as Lang) : null
  } catch {
    return null
  }
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* storage can be unavailable (private mode); the URL still carries the language */
  }
}

/** Saved choice → browser language (en/fr/uk) → default. */
export function detectLang(): Lang {
  const stored = readStoredLang()
  if (stored) return stored
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }
  return DEFAULT_LANG
}

/** Language from the first URL segment, if it is a supported one. */
export function langFromPath(pathname: string): Lang | null {
  const first = pathname.split('/')[1]
  return isLang(first) ? first : null
}

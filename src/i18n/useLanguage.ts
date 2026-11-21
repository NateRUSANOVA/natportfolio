import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isLang, storeLang, type Lang } from './languages'

/** Current language plus a switcher that keeps the visitor on the same page. */
export function useLanguage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()
  const current = (isLang(i18n.language) ? i18n.language : 'fr') as Lang

  const change = (lang: Lang) => {
    storeLang(lang)
    const rest = pathname.replace(/^\/[^/]+/, '')
    navigate(`/${lang}${rest}${search}${hash}`)
  }

  /** Builds a link inside the current language, e.g. localePath('/works/'). */
  const localePath = (path: string) => `/${current}${path.startsWith('/') ? path : `/${path}`}`

  return { current, change, localePath }
}

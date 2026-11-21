import { useLayoutEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, detectLang, isLang, storeLang, type Lang } from './languages'

function setMeta(selector: string, create: () => HTMLElement, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

/** Keeps <html lang>, title, description and hreflang in step with the URL language. */
function LangEffects({ lang }: { lang: Lang }) {
  const { t, i18n } = useTranslation('meta')

  useLayoutEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang)
    storeLang(lang)
    document.documentElement.lang = lang
  }, [lang, i18n])

  useLayoutEffect(() => {
    document.title = t('home.title', { lng: lang })
    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      { content: t('home.description', { lng: lang }) },
    )
  }, [lang, t])

  useLayoutEffect(() => {
    const rest = window.location.pathname.replace(/^\/[^/]+/, '')
    document.head.querySelectorAll('link[data-i18n]').forEach((n) => n.remove())
    const add = (rel: string, href: string, hreflang?: string) => {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (hreflang) link.hreflang = hreflang
      link.dataset.i18n = ''
      document.head.appendChild(link)
    }
    for (const l of LANGUAGES) add('alternate', `${window.location.origin}/${l.code}${rest}`, l.code)
    add('canonical', `${window.location.origin}/${lang}${rest}`)
  }, [lang])

  return <Outlet />
}

export default function LangLayout() {
  const { lang } = useParams()
  return isLang(lang) ? <LangEffects lang={lang} /> : <Navigate to={`/${detectLang()}`} replace />
}

/** "/" → saved or browser language, else the default. */
export function RootRedirect() {
  return <Navigate to={`/${detectLang()}`} replace />
}

import { Trans, useTranslation } from 'react-i18next'
import NavArrow from './NavArrow'
import { useLanguage } from '../i18n/useLanguage'
import { LANGUAGES } from '../i18n/languages'
import bg from '../assets/portfolio-bg.png'
import portrait from '../assets/panel-texture.png'
import ContactLinks from './ContactLinks'
import HairLines from './HairLines'

// Link targets stay anchors until the Works / About / Contact pages exist.
const NAV = [
  { href: '#work', key: 'work' },
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
] as const

/**
 * Mobile first screen: one vertical flow (no overlapping layers), so nothing collides while
 * scrolling. Order follows the hierarchy: who → field → philosophy → where to look.
 */
export default function HeroMobile() {
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation('common')
  const { current, change } = useLanguage()

  return (
    <section className="hm" aria-label={tc('aria.section')}>
      <div className="hm__bg" aria-hidden>
        <img src={bg} alt="" />
      </div>

      <div className="hm__inner">
        <div role="group" aria-label={tc('aria.language')} className="hm__langs">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              aria-label={l.name}
              aria-pressed={current === l.code}
              onClick={() => change(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <header className="hm__header">
          <h1>{t('greeting')}</h1>
          <p>{t('open')}</p>
        </header>

        <div className="hm__photo">
          <div className="hm__art" aria-hidden>
            <div className="hm__portraitbox">
              <div
                className="hm__portrait"
                style={{ '--panel-img': `url(${portrait})` } as React.CSSProperties}
              />
              <div className="hm__hair">
                <HairLines />
              </div>
            </div>
          </div>
          <h2 className="hm__portfolio" aria-label={tc('aria.portfolio')}>
            <span>{t('portfolio')}</span>
          </h2>
        </div>

        <div className="hm__circle hm__circle--role">
          <div className="hm__block">
            <p className="hm__role-title">
              <Trans t={t} i18nKey="role.title" components={{ strong: <strong /> }} />
            </p>
            <p className="hm__role-sub">
              <Trans t={t} i18nKey="role.sub" components={{ br: <br /> }} />
            </p>
          </div>
        </div>

        <div className="hm__tagline">
          <span className="hm__tagline-rule" aria-hidden />
          <p className="hm__tag-lead">
            <Trans t={t} i18nKey="tagline.leadMobile" components={{ b: <b />, br: <br /> }} />
          </p>
          <em>{t('tagline.accent')}</em>
        </div>

        <nav className="hm__nav" aria-label={tc('aria.nav')}>
          {NAV.map((item, i) => (
            <a key={item.key} href={item.href}>
              <NavArrow primary={i === 0} />
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <ContactLinks className="hm__contacts" />
      </div>
    </section>
  )
}

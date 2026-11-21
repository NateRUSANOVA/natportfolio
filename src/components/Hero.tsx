import { Trans, useTranslation } from 'react-i18next'
import { useLanguage } from '../i18n/useLanguage'
import { LANGUAGES, type Lang } from '../i18n/languages'
import bg from '../assets/portfolio-bg.png'
import panelTexture from '../assets/panel-texture.png'
import ellipse1 from '../assets/ellipse-1.svg'
import ellipse3 from '../assets/ellipse-3.svg'
import langUnderline from '../assets/lang-underline.svg'
import ContactLinks from './ContactLinks'
import NavArrow from './NavArrow'
import HairLines from './HairLines'

// Link targets stay anchors until the Works / About / Contact pages exist.
const NAV = [
  { href: '#work', key: 'work', top: 218 },
  { href: '#about', key: 'about', top: 273 },
  { href: '#contact', key: 'contact', top: 328 },
] as const

// Visible labels (FR / ENG / UKR) come from LANGUAGES; only the placement lives here.
const LANG_POS: Record<Lang, { left: number; top: number; spacing: number; underline: number }> = {
  fr: { left: 1232, top: 962, spacing: 4.4, underline: 40 },
  en: { left: 1306, top: 962, spacing: 2.6, underline: 42 },
  uk: { left: 1378, top: 962, spacing: 2.6, underline: 46 },
}

export default function Hero() {
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation('common')
  const { current, change } = useLanguage()

  return (
    <section className="hero" aria-label={tc('aria.section')}>
      <div className="hero__bg" aria-hidden>
        <img src={bg} alt="" />
      </div>

      <img
        className="abs"
        src={ellipse1}
        alt=""
        aria-hidden
        style={{ left: 683, top: 382, width: 411.3, height: 408.7 }}
      />

      <div
        className="hero__panel"
        aria-hidden
        style={{ '--panel-img': `url(${panelTexture})` } as React.CSSProperties}
      >
        <div className="hero__panel-img" />
      </div>

      {/* delicate strokes that follow real strands — scale and rotate with the photo */}
      <div className="hero__hair" aria-hidden>
        <HairLines />
      </div>

      <img
        className="abs"
        src={ellipse3}
        alt=""
        aria-hidden
        style={{ left: 155, top: 735, width: 702.5, height: 666.9 }}
      />

      <div className="abs hero__role" style={{ left: 290, top: 851 }}>
        <p className="hero__role-title">
          <Trans t={t} i18nKey="role.title" components={{ strong: <strong /> }} />
        </p>
        <p className="hero__role-sub">
          <Trans t={t} i18nKey="role.sub" components={{ br: <br /> }} />
        </p>
      </div>

      <h2 className="hero__portfolio" aria-label={tc('aria.portfolio')}>
        <span>{t('portfolio')}</span>
      </h2>

      <p className="abs hero__tagline" style={{ left: 741, top: 504 }}>
        <span className="hero__tagline-lead">
          <Trans t={t} i18nKey="tagline.lead" components={{ b: <b />, br: <br /> }} />
        </span>
        <em>{t('tagline.accent')}</em>
      </p>

      <h1 className="abs hero__title" style={{ right: 40, top: 40, textAlign: 'right' }}>
        {t('greeting')}
      </h1>
      <p className="abs hero__open" style={{ right: 40, top: 115, textAlign: 'right' }}>
        {t('open')}
      </p>

      <svg className="abs hero__line" width="1440" height="1024" aria-hidden>
        <defs>
          <linearGradient id="line-fade" gradientUnits="userSpaceOnUse" x1="0" y1="187" x2="0" y2="921">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.62" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <line x1="1155" y1="187" x2="1155" y2="921" />
      </svg>

      <nav aria-label={tc('aria.nav')}>
        {NAV.map((item, i) => (
          <a
            key={item.key}
            href={item.href}
            className={`abs hero__nav-item${i === 0 ? ' hero__nav-item--primary' : ''}`}
            style={{ left: 1138, top: item.top - 9, width: 262, height: 44 }}
          >
            <NavArrow primary={i === 0} />
            <span className="hero__nav-label" style={{ left: 58, top: 9 }}>
              {t(`nav.${item.key}`)}
            </span>
          </a>
        ))}
      </nav>

      <ContactLinks className="abs hero__contacts" />

      <div role="group" aria-label={tc('aria.language')}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-label={l.name}
            className="abs hero__lang"
            aria-pressed={current === l.code}
            onClick={() => change(l.code)}
            style={{
              left: LANG_POS[l.code].left,
              top: LANG_POS[l.code].top,
              letterSpacing: LANG_POS[l.code].spacing,
            }}
          >
            {l.label}
          </button>
        ))}
        <span
          className="abs hero__lang-underline"
          aria-hidden
          style={{
            left: LANG_POS[current].left,
            top: 1000,
            width: LANG_POS[current].underline,
            height: 4,
            maskImage: `url(${langUnderline})`,
            WebkitMaskImage: `url(${langUnderline})`,
          }}
        />
      </div>
    </section>
  )
}

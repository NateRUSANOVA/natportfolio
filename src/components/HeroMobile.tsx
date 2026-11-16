import { useState } from 'react'
import bg from '../assets/portfolio-bg.png'
import portrait from '../assets/panel-texture.png'
import ContactLinks from './ContactLinks'
import HairLines from './HairLines'

const NAV = [
  { href: '#work', label: 'Explore My Work' },
  { href: '#about', label: 'About me' },
  { href: '#contact', label: 'Get in Touch' },
]

const LANGS = ['FR', 'ENG', 'UKR']

/**
 * Mobile first screen: one vertical flow (no overlapping layers), so nothing collides while
 * scrolling. Order follows the hierarchy: who → field → philosophy → where to look.
 */
export default function HeroMobile() {
  const [lang, setLang] = useState('ENG')

  return (
    <section className="hm" aria-label="Introduction">
      <div className="hm__bg" aria-hidden>
        <img src={bg} alt="" />
      </div>

      <div className="hm__inner">
        <div role="group" aria-label="Language" className="hm__langs">
          {LANGS.map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code}
            </button>
          ))}
        </div>

        <header className="hm__header">
          <h1>Hello, I am Nataliia</h1>
          <p>Open to full-time roles &amp; freelance projects</p>
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
          <h2 className="hm__portfolio" aria-label="Portfolio">
            <span>PORTFOLIO</span>
          </h2>
        </div>

        <div className="hm__circle hm__circle--role">
          <div className="hm__block">
            <p className="hm__role-title">
              <strong>UX/UI</strong> &amp;
            </p>
            <p className="hm__role-sub">
              Visual Communication
              <br />
              Designer
            </p>
          </div>
        </div>

        <div className="hm__tagline">
          <span className="hm__tagline-rule" aria-hidden />
          <p className="hm__tag-lead">
            Bringing <b>beauty</b>
            <br />
            and <b>purpose</b>
            <br />
            together through
          </p>
          <em>simplicity</em>
        </div>

        <nav className="hm__nav" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.label} href={item.href}>
              <span className="hm__dot" aria-hidden />
              {item.label}
            </a>
          ))}
        </nav>

        <ContactLinks className="hm__contacts" />
      </div>
    </section>
  )
}

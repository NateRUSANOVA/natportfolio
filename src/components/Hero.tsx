import { useState } from 'react'
import bg from '../assets/portfolio-bg.png'
import panelTexture from '../assets/panel-texture.png'
import ellipse1 from '../assets/ellipse-1.svg'
import ellipse3 from '../assets/ellipse-3.svg'
import dot1 from '../assets/dot-1.svg'
import dot2 from '../assets/dot-2.svg'
import dot3 from '../assets/dot-3.svg'
import langUnderline from '../assets/lang-underline.svg'

const NAV = [
  { href: '#work', label: 'Explore My Work', top: 218, dot: dot1, dotTop: 222, alpha: 0.75 },
  { href: '#about', label: 'About me', top: 273, dot: dot2, dotTop: 277, alpha: 0.8 },
  { href: '#contact', label: 'Get in Touch', top: 328, dot: dot3, dotTop: 335, alpha: 0.8 },
]

const LANGS = [
  { code: 'FR', left: 1202, top: 963, spacing: 4.4 },
  { code: 'ENG', left: 1272, top: 963, spacing: 2.6 },
  { code: 'UKR', left: 1348, top: 962, spacing: 2.6 },
]

export default function Hero() {
  const [lang, setLang] = useState('ENG')

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__bg" aria-hidden>
        <img src={bg} alt="" />
      </div>

      <img
        className="abs"
        src={ellipse1}
        alt=""
        aria-hidden
        style={{ left: 654 - 14.7, top: 339 - 7.7, width: 467.4, height: 464.4 }}
      />

      <div className="hero__panel" aria-hidden>
        <img src={panelTexture} alt="" />
      </div>

      <img
        className="abs"
        src={ellipse3}
        alt=""
        aria-hidden
        style={{ left: 220 - 24.7, top: 673 - 12.7, width: 629 + 36.7 + 24.7, height: 594 + 12.7 + 48.7 }}
      />

      <div className="abs hero__role" style={{ left: 286, top: 825 }}>
        <p className="hero__role-title">
          <strong>UX/UI</strong> <span>designer</span>
        </p>
        <p className="hero__role-sub">
          with a <strong>mediator’s</strong> background
          <br />
          in multilingual settings
        </p>
      </div>

      <h2 className="hero__portfolio" aria-label="Portfolio">
        <span>PORTFOLIO</span>
      </h2>

      <p className="abs hero__tagline" style={{ left: 694, top: 473 }}>
        <span className="hero__tagline-i">I</span> strive to bring beauty and what people need
        together through <em>simplicity</em>
      </p>

      <h1 className="abs hero__title" style={{ left: 791, top: 40 }}>
        Hello, I am Nataliia
      </h1>
      <p className="abs hero__open" style={{ left: 1052, top: 115 }}>
        Open to full-time &amp; projects
      </p>

      <svg className="abs hero__line" width="1440" height="1024" aria-hidden>
        <line x1="1142" y1="187" x2="1150" y2="921" />
      </svg>

      <nav aria-label="Main">
        {NAV.map((item) => (
          <a key={item.label} href={item.href} className="hero__nav-item">
            <img
              className="abs"
              src={item.dot}
              alt=""
              aria-hidden
              style={{ left: 1131, top: item.dotTop, width: 22, height: 22 }}
            />
            <span
              className="abs hero__nav-label"
              style={{ left: 1183, top: item.top, color: `rgba(255,255,255,${item.alpha})` }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      <div role="group" aria-label="Language">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            className="abs hero__lang"
            aria-pressed={lang === l.code}
            onClick={() => setLang(l.code)}
            style={{ left: l.left, top: l.top, letterSpacing: l.spacing }}
          >
            {l.code}
          </button>
        ))}
        <img
          className="abs hero__lang-underline"
          src={langUnderline}
          alt=""
          aria-hidden
          style={{
            left: LANGS.find((l) => l.code === lang)!.left,
            top: 1000,
            width: 58,
            height: 4,
          }}
        />
      </div>
    </section>
  )
}

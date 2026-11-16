import { useState } from 'react'
import bg from '../assets/portfolio-bg.png'
import panelTexture from '../assets/panel-texture.png'
import ellipse1 from '../assets/ellipse-1.svg'
import ellipse3 from '../assets/ellipse-3.svg'
import dot1 from '../assets/dot-1.svg'
import dot2 from '../assets/dot-2.svg'
import dot3 from '../assets/dot-3.svg'
import langUnderline from '../assets/lang-underline.svg'
import ContactLinks from './ContactLinks'
import HairLines from './HairLines'

const NAV = [
  { href: '#work', label: 'Explore My Work', top: 218, dot: dot1, dotTop: 222, alpha: 0.75 },
  { href: '#about', label: 'About me', top: 273, dot: dot2, dotTop: 277, alpha: 0.8 },
  { href: '#contact', label: 'Get in Touch', top: 328, dot: dot3, dotTop: 335, alpha: 0.8 },
]

const LANGS = [
  { code: 'FR', left: 1210, top: 963, spacing: 4.4 },
  { code: 'ENG', left: 1280, top: 963, spacing: 2.6 },
  { code: 'UKR', left: 1356, top: 962, spacing: 2.6 },
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
          <strong>UX/UI</strong> &amp;
        </p>
        <p className="hero__role-sub">
          Visual Communication
          <br />
          Designer
        </p>
      </div>

      <h2 className="hero__portfolio" aria-label="Portfolio">
        <span>PORTFOLIO</span>
      </h2>

      <p className="abs hero__tagline" style={{ left: 741, top: 504 }}>
        <span className="hero__tagline-lead">
          Bringing <b>beauty</b>
          <br />
          and <b>purpose</b> together
          <br />
          through
        </span>
        <em>simplicity</em>
      </p>

      <h1 className="abs hero__title" style={{ right: 40, top: 40, textAlign: 'right' }}>
        Hello, I am Nataliia
      </h1>
      <p className="abs hero__open" style={{ right: 40, top: 115, textAlign: 'right' }}>
        Open to full-time roles &amp; freelance projects
      </p>

      <svg className="abs hero__line" width="1440" height="1024" aria-hidden>
        <line x1="1155" y1="187" x2="1155" y2="921" />
      </svg>

      <nav aria-label="Main">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="abs hero__nav-item"
            style={{ left: 1138, top: item.top - 9, width: 262, height: 44 }}
          >
            <img
              className="abs"
              src={item.dot}
              alt=""
              aria-hidden
              style={{ left: 6, top: 12, width: 22, height: 22 }}
            />
            <span className="hero__nav-label" style={{ left: 58, top: 9 }}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      <ContactLinks className="abs hero__contacts" />

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

import type { ReactNode } from 'react'
import { contacts } from '../config/contacts'

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden {...STROKE}>
      {children}
    </svg>
  )
}

const MailIcon = () => (
  <Icon>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7.5 9 6.5 9-6.5" />
  </Icon>
)

const WhatsAppIcon = () => (
  <Icon>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5Z" />
    <g transform="translate(6.9 6.8) scale(0.44)">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </g>
  </Icon>
)

const InstagramIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </Icon>
)

type Item = {
  key: string
  label: string
  title: string
  href: string
  external: boolean
  icon: ReactNode
}

function buildItems(): Item[] {
  const items: Item[] = [
    {
      key: 'email',
      label: 'Email',
      title: 'Write me an email',
      href: contacts.email ? `mailto:${contacts.email}` : '#contact',
      external: false,
      icon: <MailIcon />,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      title: 'Message me on WhatsApp',
      href: contacts.whatsapp ? `https://wa.me/${contacts.whatsapp}` : '#contact',
      external: Boolean(contacts.whatsapp),
      icon: <WhatsAppIcon />,
    },
  ]
  if (contacts.showInstagram) {
    items.push({
      key: 'instagram',
      label: 'Instagram',
      title: 'Follow me on Instagram',
      href: contacts.instagram ? `https://instagram.com/${contacts.instagram}` : '#contact',
      external: Boolean(contacts.instagram),
      icon: <InstagramIcon />,
    })
  }
  return items
}

/** Quick-contact icons, each with a visible label so the action is obvious. */
export default function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`contacts ${className}`} aria-label="Contact me">
      {buildItems().map((c) => (
        <li key={c.key}>
          <a
            className="contacts__link"
            href={c.href}
            title={c.title}
            aria-label={c.title}
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {c.icon}
            <span className="contacts__label">{c.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

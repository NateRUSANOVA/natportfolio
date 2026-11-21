import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { contacts } from '../config/contacts'

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="46" height="46" aria-hidden {...STROKE}>
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

const LinkedInIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10.5V17M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17" />
    <circle cx="8" cy="7.4" r="0.7" fill="currentColor" />
  </Icon>
)

/** Only a real LinkedIn profile link is shown; an empty or other value hides the icon. */
const hasLinkedIn = /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(contacts.linkedin)

type Item = {
  key: string
  label: string
  title: string
  href: string
  external: boolean
  icon: ReactNode
}

function buildItems(t: TFunction): Item[] {
  const items: Item[] = [
    {
      key: 'email',
      label: t('contacts.email.label'),
      title: t('contacts.email.title'),
      href: contacts.email ? `mailto:${contacts.email}` : '#contact',
      external: false,
      icon: <MailIcon />,
    },
    {
      key: 'whatsapp',
      label: t('contacts.whatsapp.label'),
      title: t('contacts.whatsapp.title'),
      href: contacts.whatsapp ? `https://wa.me/${contacts.whatsapp}` : '#contact',
      external: Boolean(contacts.whatsapp),
      icon: <WhatsAppIcon />,
    },
  ]
  if (contacts.showInstagram) {
    items.push({
      key: 'instagram',
      label: t('contacts.instagram.label'),
      title: t('contacts.instagram.title'),
      href: contacts.instagram ? `https://instagram.com/${contacts.instagram}` : '#contact',
      external: Boolean(contacts.instagram),
      icon: <InstagramIcon />,
    })
  }
  if (hasLinkedIn) {
    items.push({
      key: 'linkedin',
      label: t('contacts.linkedin.label'),
      title: t('contacts.linkedin.title'),
      href: contacts.linkedin,
      external: true,
      icon: <LinkedInIcon />,
    })
  }
  return items
}

/** Quick-contact icons, each with a visible label so the action is obvious. */
export default function ContactLinks({ className = '' }: { className?: string }) {
  const { t } = useTranslation('common')
  return (
    <ul className={`contacts ${className}`} aria-label={t('contacts.group')}>
      {buildItems(t).map((c) => (
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

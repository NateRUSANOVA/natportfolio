// After `vite build`: writes dist/{en,fr,uk}/index.html so every language has real HTML with its
// own <html lang>, <title>, description and (when the site URL is known) hreflang/canonical.
// Texts come from src/locales/<lang>/meta.json, the same files the app uses at runtime.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const LANGS = ['fr', 'en', 'uk']
const DEFAULT_LANG = 'fr'
const site = (process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '')
  .replace(/^(?!https?:\/\/)(.+)/, 'https://$1')
  .replace(/\/$/, '')

const esc = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const template = readFileSync('dist/index.html', 'utf8')

for (const lang of LANGS) {
  const meta = JSON.parse(readFileSync(`src/locales/${lang}/meta.json`, 'utf8')).home
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${esc(meta.description)}" />`,
    )
  if (site) {
    const links = LANGS.map(
      (l) => `    <link rel="alternate" hreflang="${l}" href="${site}/${l}/" />`,
    )
    links.push(`    <link rel="alternate" hreflang="x-default" href="${site}/${DEFAULT_LANG}/" />`)
    links.push(`    <link rel="canonical" href="${site}/${lang}/" />`)
    html = html.replace('</head>', `${links.join('\n')}\n  </head>`)
  }
  mkdirSync(`dist/${lang}`, { recursive: true })
  writeFileSync(`dist/${lang}/index.html`, html)
}
console.log(`localized ${LANGS.join(', ')}${site ? ` (site: ${site})` : ' (no SITE_URL: hreflang/canonical omitted)'}`)

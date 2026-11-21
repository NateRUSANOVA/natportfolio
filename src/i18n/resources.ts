import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enMeta from '../locales/en/meta.json'
import frCommon from '../locales/fr/common.json'
import frHome from '../locales/fr/home.json'
import frMeta from '../locales/fr/meta.json'
import ukCommon from '../locales/uk/common.json'
import ukHome from '../locales/uk/home.json'
import ukMeta from '../locales/uk/meta.json'

/** One namespace per page/area. A new page adds one JSON file per language and one line here. */
export const resources = {
  en: { common: enCommon, home: enHome, meta: enMeta },
  fr: { common: frCommon, home: frHome, meta: frMeta },
  uk: { common: ukCommon, home: ukHome, meta: ukMeta },
}

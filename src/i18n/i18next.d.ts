import 'i18next'
import type { resources } from './resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    // English is the base: a key missing from it fails the build.
    resources: (typeof resources)['en']
  }
}

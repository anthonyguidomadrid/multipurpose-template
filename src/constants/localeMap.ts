import { Locale } from 'date-fns'
import { enUS, es, fr } from 'date-fns/locale'

export const localeMap: Record<string, Locale> = {
  'es': es,
  'fr': fr,
  en: enUS,
}

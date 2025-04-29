import { Locale } from 'date-fns'
import { enUS, es, fr } from 'date-fns/locale'

export const localeMap: Record<string, Locale> = {
  'es-CO': es,
  'fr-BE': fr,
  en: enUS,
}

import { localeMap } from '@/constants/localeMap'
import { format } from 'date-fns'

export const getDate = (date: Date, dateFormat: string, locale?: string): string => {
  const dateLocale = localeMap[locale || 'en']
  const formattedDate = format(new Date(date), dateFormat, { locale: dateLocale })
  return formattedDate
}

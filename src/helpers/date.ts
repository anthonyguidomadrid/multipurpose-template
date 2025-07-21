import { DateTime } from 'luxon'

export const getDate = (
  isoDateString: string,
  dateFormat: string,
  locale?: string
): string => {
  const date = DateTime.fromISO(isoDateString, { setZone: true })
  const dateLocale = locale || 'en'
  return date.setLocale(dateLocale).toFormat(dateFormat)
}

import { isToday, isYesterday, isSameYear, format } from 'date-fns'
import { TFunction } from 'i18next'
import { formatDate, LOCALIZE } from './getDateLanguage'

export const resolveVideoDate = (updatedDate: Date | number, t: TFunction) => {
  const date = updatedDate instanceof Date ? updatedDate : new Date(updatedDate)

  const time = format(date, t('dateFormats.time'))

  if (isToday(date)) {
    return `${t('dateFormats.today')} ${time}`
  } else if (isYesterday(date)) {
    return `${t('dateFormats.yesterday')} ${time}`
  } else if (isSameYear(date, new Date())) {
    return formatDate(date, t('dateFormats.shortDate'), LOCALIZE)
  } else {
    return formatDate(date, t('dateFormats.shortMonthDayYear'))
  }
}

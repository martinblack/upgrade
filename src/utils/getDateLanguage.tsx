import i18next from 'i18next'
import cs from 'date-fns/locale/cs'
import en from 'date-fns/locale/en-GB'
import { format } from 'date-fns'
import { CZECH } from '@/constants/languages'

export const LOCALIZE = true

const getDateLanguage = () => {
  return i18next.language === CZECH ? cs : en
}

export const formatDate = (date: Date, form: string, localize?: boolean) =>
  format(
    date,
    form,
    (localize as Locale) && {
      locale: getDateLanguage(),
    },
  )

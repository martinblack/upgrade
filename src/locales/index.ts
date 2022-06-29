import { locale } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import 'intl-pluralrules'

import en from './en-EN.json'
import cs from './cs-CZ.json'

i18n.use(initReactI18next).init({
  lng: locale,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    cs: { translation: cs },
  },
})

export default i18n

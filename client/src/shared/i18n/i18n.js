import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { uaTranslation, ruTranslation, enTranslation } from '~shared/config/locales'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage'],
      cache: ['cookie']
    },
    resources: {
      en: { translation: enTranslation },
      ua: { translation: uaTranslation },
      ru: { translation: ruTranslation }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

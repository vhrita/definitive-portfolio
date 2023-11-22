import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import ptBR from "./locales/pt-BR/translation.json"

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...en },
      pt: { ...ptBR }
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n
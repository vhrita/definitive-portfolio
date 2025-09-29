import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import ptBR from './locales/pt-BR/translation.json'
import ja from './locales/ja/translation.json'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en.translation },
      pt: { translation: ptBR.translation },
      ja: { translation: ja.translation }
    },
    supportedLngs: ['en', 'pt', 'ja'],
    fallbackLng: 'en',
    load: 'languageOnly',
    lowerCaseLng: true,
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'definitive-portfolio-lang',
      htmlTag: typeof document !== 'undefined' ? document.documentElement : undefined,
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n

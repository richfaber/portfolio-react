import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from '@/i18n/locales/ko.json'
import en from '@/i18n/locales/en.json'

i18next.use(initReactI18next).init({

  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },

  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: { 
    escapeValue: false // 이중 이스케이프 방지 (React가 XSS 처리를 자체적으로 함)
  }

})

export default i18next
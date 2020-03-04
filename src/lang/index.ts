import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLocale from './en'
import esLocale from './es'

const resources = {
  en: {
    translation: {
      ...enLocale
    }
  },
  es: {
    translation: {
      ...esLocale
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator : '.'
    }
  });


export default i18n;

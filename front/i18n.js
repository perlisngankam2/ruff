// module.exports = {
//     locales: ['en', 'fr'], // Array with the languages that you want to use
//     defaultLocale: 'fr', // Default language of your website
//     pages: {
//       '*': ['common'], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
//     },
//   };

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const i18nOptions = {
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
  supportedLngs: ['en', 'fr'],
  fallbackLng: 'fr',
  ns: ['common', 'errors'],
  defaultNS: 'common',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nOptions);

export default i18n;
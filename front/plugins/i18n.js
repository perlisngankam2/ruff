// import { serverSideTranslations } from "next-i18next";

// export async function getStaticProps({ locale }) {
//   return {
//     props: { ...(await serverSideTranslations(locale, ["common", "errors"])) }
//   };
// }

// export default function i18n() {
//   return null;
// }

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpBackend from 'i18next-http-backend';

// const i18nOptions = {
//   detection: {
//     order: ['localStorage', 'navigator'],
//     caches: ['localStorage'],
//   },
//   supportedLngs: ['en', 'fr'],
//   fallbackLng: 'en',
//   ns: ['common', 'errors'],
//   defaultNS: 'common',
//   backend: {
//     loadPath: '/locales/{{lng}}/{{ns}}.json',
//   },
//   react: {
//     useSuspense: false,
//   },
// };

// i18n
//   .use(HttpBackend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init(i18nOptions);

// export default i18n;

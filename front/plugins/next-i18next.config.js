// const path = require("path");
// module.exports = {
//   i18n: {
//     defaultLocale: "fr",
//     locales: ["en", "fr"],
//     localeDetection: false,
//     localPath:"/..public/locales"
//   },
//   defaultNS: 'common',
//   ns: ['errors', 'common', 'form'],
//   // localePath: path.resolve("../public/locales")
// };

module.exports = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
  defaultNS: 'common',
  ns: ['errors', 'common', 'form'],
};

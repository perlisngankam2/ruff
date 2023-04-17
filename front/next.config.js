// // next.config.js

// const path = require("path");
// const i18n = require("./plugins/next-i18next.config")
// module.exports = {
//   i18n
//   // : {
//   //   defaultLocale: "fr",
//   //   locales: ["en", "fr"],
//   //   localeDetection: false
//   // },
//   // localePath: path.resolve("./public/locales")
// };

// const nextTranslate = require('next-translate');

// module.exports = nextTranslate({
//   reactStrictMode: true,
// });

// module.exports = nextConfig

const { I18NextHMRPlugin } = require('i18next-hmr/plugin');
const { resolve } = require('path');

const { i18n } = require('./plugins/next-i18next.config');
const localesDir = resolve('public/locales');

module.exports = {
  i18n,
  webpack(config, context) {
    if (!context.isServer && context.dev) {
      config.plugins.push(new I18NextHMRPlugin({ localesDir }));
    }
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });
    // config.module.rules.unshift({
    //   test: /pdf\.worker\.(min\.)?js/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         name: '[contenthash].[ext]',
    //         publicPath: '_next/static/worker',
    //         outputPath: 'static/worker',
    //       },
    //     },
    //   ],
    // });
    return config;
  },
};


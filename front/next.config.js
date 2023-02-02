
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
} 

module.exports = nextConfig

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

    return config;
  },
};


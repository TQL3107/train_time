/** @type {import('next').NextConfig} */

module.exports = {
    webpack: (config) => {
      config.resolve.alias['vue'] = 'vue/dist/vue.js';
      return config;
    },
  };
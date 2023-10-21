// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'GC Trade',
    },
  },
  css: [
    '~/assets/tailwind.css',
    '~/assets/styles/main.css',
    '~/assets/icons/style.css',
    '~/assets/icomoon/style.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },
})

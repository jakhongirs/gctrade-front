// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/svg/favicon.ico' },
        {
          rel: 'canonical',
          href: 'https://artpresent.uz/',
        },
      ],

      title: 'GC Trade',
      meta: [
        {
          key: 'google-site-verification',
          name: 'google-site-verification',
          content: 'lN1l6v7o0k8hriFEymyi0IVUDh5QkG_I_MXaveKkkq0',
        },
        {
          name: 'yandex-verification',
          key: 'yandex-verification',
          content: '786f7609ea99e42d',
        },
        {
          name: 'keywords',
          key: 'keywords',
          content:
            'сувениры Узбекистана, узбекские сувениры, керамика, шелк,, атлас, хан-атлас, золотое шитье, глиняные статуэтки, тюбетейки, резные шкатулки, подарочные ножи, подарки из Узбекистана',
        },
      ],
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

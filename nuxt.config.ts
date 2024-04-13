// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    https: {
      key: './cert/server.key',
      cert: './cert/server.crt',
    },
  },
  runtimeConfig: {
    restApiUrl: process.env.REST_API_URL,
    public: {
      signalRUrl: process.env.SIGNAL_R_URL,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 700],
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  tailwindcss: {
    exposeConfig: {
      write: true,
    },
  },
});

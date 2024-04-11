// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   head: {
  //     link: [
  //       { rel: 'stylesheet', href: "https://rsms.me/inter/inter.css" }
  //     ]
  //   }
  // },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-icon']
})

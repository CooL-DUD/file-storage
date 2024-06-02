// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-icon'],
  app: {
    head: {
      script: [
        { type: 'module', src: 'https://cdn.jsdelivr.net/npm/ldrs/dist/auto/trefoil.js' },
        { type: 'module', src: 'https://static-bundles.visme.co/forms/vismeforms-embed.js' },
        // <script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
      ]
    }
  },
  vite: {
    assetsInclude: ["**/*.MP4"]
  }
})

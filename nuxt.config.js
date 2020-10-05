export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Hunger Stop | Homepage",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://js.stripe.com/v3/" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "uikit/dist/css/uikit.min.css",
    "uikit/dist/css/uikit.css",
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/uikit.js", ssr: false },
    "~/plugins/fontawesome.js"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/apollo",
    [
      "nuxt-i18n",
      {
        locales: [
          {
            name: "Italiano",
            code: "it",
            iso: "it-IT",
            file: "it_IT.js"
          },
          {
            name: "English",
            code: "en",
            iso: "en-US",
            file: "en_US.js"
          }
        ],
        lazy: true,
        langDir: "lang/",
        defaultLocale: "en"
      }
    ]
  ],
  apollo: {
    clientConfigs: {
      default: "@/graphql/config.js"
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};

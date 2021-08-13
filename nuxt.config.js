export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 's-a-tanjim | Personal Website',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 's-a-tanjim | Personal Website'
      },
      {
        name: 'keywords',
        content: 'Portfolio, Software engineer, Shoeb, Ahmed, Tanjim'
      },
      {
        name: 'author',
        content: 's-a-tanjim'
      },
      {
        property: 'og:title',
        content: 's-a-tanjim'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:description',
        content: 's-a-tanjim | Personal Website'
      },
      {
        property: 'og:image',
        content: 'https://s-a-tanjim.netlify.app/img/sat.jpg'
      },
      {
        property: 'og:url',
        content: 'https://s-a-tanjim.netlify.app'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.svg'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
        rel: 'stylesheet',
      },
      {
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        rel: 'stylesheet',
        integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
        crossorigin: "anonymous"
      },
    ],
    script: [{
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
        integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
        crossorigin: "anonymous"
      },
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-EFSLHHNZ5Z'
      },
      {
        src: '/js/main.js'
      }
    ],
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss',
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  /*script: [{
      src: '@/assets/js/jquery-3.5.1.slim.min.js'
    },
    {
      src: '@/assets/js/bootstrap.bundle.min.js'
    }
  ],*/
  /*script: [
    '@/assets/js/jquery-3.5.1.slim.min.js',
    '@/assets/js/bootstrap.bundle.min.js'
  ],*/

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/color-mode'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', {
          loose: true
        }]
      ]
    }
  }
}

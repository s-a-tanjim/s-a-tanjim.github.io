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
        property: 'og:title',
        content: 's-a-tanjim'
      },
      {
        property: 'og:description',
        content: 's-a-tanjim | Personal Website'
      },
      {
        property: 'og:image',
        content: 'https://s-a-tanjim.netlify.app/img/dp.jpg'
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
    }],
    script: [{
        src: '/js/jquery-3.5.1.slim.min.js'
      },
      {
        src: '/js/bootstrap.bundle.min.js'
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
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/main.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css',
  ],

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
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}

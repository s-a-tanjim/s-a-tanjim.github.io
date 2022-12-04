export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      title: 's-a-tanjim | Personal Website',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
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
          content: 'Shoeb Ahmed Tanjim | Software Engineer'
        },
        {
          name: 'keywords',
          content: 'Portfolio, Software engineer, Shoeb Ahmed Tanjim, Full Stack Engineer, MIST'
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
          content: 'Shoeb Ahmed Tanjim | Software Engineer'
        },
        {
          property: 'og:image',
          content: 'https://s-a-tanjim.netlify.app/site-thumbnail.jpg'
        },
        {
          property: 'og:url',
          content: 'https://s-a-tanjim.netlify.app'
        },
        {
          property: 'twitter:title',
          content: 's-a-tanjim'
        },
        {
          property: 'twitter:creator',
          content: 's-a-tanjim'
        },
        {
          property: 'twitter:description',
          content: 'Shoeb Ahmed Tanjim | Software Engineer'
        },
        {
          property: 'twitter:image',
          content: 'https://s-a-tanjim.netlify.app/site-thumbnail.jpg'
        }
      ],
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.svg'
      },
      {
        rel: 'canonical',
        href: 'https://s-a-tanjim.netlify.app'
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
        href: '/bootstrap/main.css',
        rel: 'stylesheet',
      },
        /*{
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
          rel: 'stylesheet',
          integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
          crossorigin: "anonymous"
        },*/
      ],
      script: [
        /*{
                src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
                integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
                crossorigin: "anonymous"
              },*/
        {
          async: true,
          src: '/bootstrap/main.js',
        },
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-EFSLHHNZ5Z'
        },
        {
          src: '/js/main.js'
        }
      ],

    }
  },

  css: [
    '~/assets/scss/main.scss',
  ],


  modules: [
    '@nuxtjs/color-mode'
  ],

  // colorMode: {
  //   preference: 'dark',
  //   fallback: 'dark',
  // },
  

  // target: 'static',

  // generate: { 
  //   fallback: '404.html',
  // },

  // hooks: {
  //   'pages:extend' (routes) {
  //     routes.push({
  //       name: 'custom',
  //       path: '/:pathMatch(.*)*',
  //       // scomponent: resolve(__dirname, 'pages/404.vue')
  //     })
  //     }
  //   }
})

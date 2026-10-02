import { profile, tagline } from './data/profile'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      title: profile.name,
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
          name: 'description',
          content: tagline
        },
        {
          name: 'keywords',
          content: `Portfolio, ${profile.role}, ${profile.name}, Full Stack Engineer, MIST`
        },
        {
          name: 'author',
          content: profile.username
        },
        {
          property: 'og:title',
          content: profile.username
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:description',
          content: tagline
        },
        {
          property: 'og:image',
          content: profile.site.thumbnail
        },
        {
          property: 'og:url',
          content: profile.site.url
        },
        {
          property: 'twitter:title',
          content: profile.username
        },
        {
          property: 'twitter:creator',
          content: profile.username
        },
        {
          property: 'twitter:description',
          content: tagline
        },
        {
          property: 'twitter:image',
          content: profile.site.thumbnail
        }
      ],
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.svg'
      },
      {
        rel: 'canonical',
        href: profile.site.url
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
        rel: 'stylesheet',
      },
      ],
      script: [
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

  typescript: {
    /* Run vue-tsc as part of `nuxt build` / `nuxt dev` so type errors
       fail the build instead of only showing up in the editor. */
    typeCheck: true,
    strict: true,
  },

  compatibilityDate: '2024-10-29'

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

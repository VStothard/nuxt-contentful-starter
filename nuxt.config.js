import pkg from './package'
require('dotenv').config()

// Make contentful client accessible in config,
// (can't use plugin as env variables are not accessible there until nuxt config is finished parsing)
const contentful = require('contentful')
const config = {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}
const client = contentful.createClient(config)

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Environment variables
  */

  env: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
  '~/plugins/contentful.js',
  '~/plugins/vueMarkdown.js'
],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  generate: {
    routes: async function () {
      const entries = await client.getEntries({ content_type: "blogPost" });
      const routes = []
      entries.items.forEach(item => {
        routes.push(`blog/${item.fields.slug}`)
      })
      return routes
    }
  }
}

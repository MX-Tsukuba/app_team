// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [`@nuxtjs/supabase`, '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      title: 'Motion-X',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/login/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
    // cookieOptions: {
    //   maxAge: 60 * 60 * 8,
    //   sameSite: 'lax',
    //   secure: true
    // },
    // clientOptions: {
    //   auth: {
    //     flowType: 'pkce',
    //     detectSessionInUrl: true,
    //     persistSession: true,
    //     autoRefreshToken: true
    //   },
    // },
  },

  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'index',
        path: '/',
        file: '~/pages/top/index.vue',
      });
    },
  },
  plugins: ['~/plugins/chartjs.ts'],

  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2024-09-05',
});

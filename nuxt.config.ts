// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [`@nuxtjs/supabase`, '@pinia/nuxt','nuxt-snackbar','@element-plus/nuxt'],
  snackbar: {
    position: 'top-right',
    duration: 3000,
    color: 'success',
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

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },

  supabase: {
    redirect: true,
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

  compatibilityDate: '2024-09-05',
});

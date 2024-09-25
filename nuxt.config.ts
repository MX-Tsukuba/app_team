// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [`@nuxtjs/supabase`,
    '@pinia/nuxt'
  ],

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

  hooks:{
    'pages:extend'(pages){
      pages.push({
        name:'index',
        path:'/',
        file: '~/pages/top/index.vue',
      })
    }
  },

  compatibilityDate: '2024-09-05',
})
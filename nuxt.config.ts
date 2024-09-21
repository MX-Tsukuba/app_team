// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [`@nuxtjs/supabase`,
    '@pinia/nuxt'
  ],

  supabase:{
    redirect:false
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
  plugins: ['~/plugins/chartjs.ts'],

  compatibilityDate: '2024-09-05',
})
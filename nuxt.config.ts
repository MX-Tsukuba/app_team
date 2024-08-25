import { pushScopeId } from "vue";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    url:process.env.SUPABASE_URL,
    key:process.env.SUPABASE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      },
    },
  },
  plugins:[
    '~/plugins/supabase.client.js'
    
  ],
  runtimeConfig:{
    public:{
      supabaseUrl:process.env.SUPABASE_URL || "https://fuuchzmnathzrsqqsuhg.supabase.co",
      supabaseKey:process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dWNoem1uYXRoenJzcXFzdWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNjYwNDksImV4cCI6MjAyNTY0MjA0OX0.V9yZTvTcP-1u8zD1PLSKkGhY_fVWLqMDCGBV0hNFBLU"
    }
  },
})

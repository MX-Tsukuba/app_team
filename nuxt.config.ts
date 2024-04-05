// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
})

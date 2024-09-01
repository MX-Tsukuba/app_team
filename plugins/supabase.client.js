import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://fuuchzmnathzrsqqsuhg.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dWNoem1uYXRoenJzcXFzdWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNjYwNDksImV4cCI6MjAyNTY0MjA0OX0.V9yZTvTcP-1u8zD1PLSKkGhY_fVWLqMDCGBV0hNFBLU'
    const supabase = createClient(supabaseUrl, supabaseKey)

    nuxtApp.provide('suppabase', supabase);
}) 


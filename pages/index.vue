<template>
  <title>
    ようこそ
  </title>
  <NuxtLink to="/resister">
    新規会員登録はこちら
  </NuxtLink>
  
</template>
   
 <script setup>
  import useAuthTest from '@/hooks/useAuthTest'
  
  const nuxtApp = useNuxtApp();

  const email = ref("");
  const password = ref("");
  const username = ref("");

  const submit = async () => {
    const session = await nuxtApp.$supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
  // TODO: データベースに初期値入れる
  };

  const {signInWithGoogle,error , session}=useAuthTest();
  console.log("~~~~~~~~~~~~~~~~~~~~")
  console.log(session)
  console.log("~~~~~~~~~~~~~~~~~~~~")

  useEffect(() => {
    // ログイン状態の変化を監視
    console.log(session)

    // リスナーの解除
    return () => authData.subscription.unsubscribe();
  }, [session]);
</script>
  


   <!-- <script setup>
   import { createClient } from '@supabase/supabase-js'
   const supabase = createClient('https://fuuchzmnathzrsqqsuhg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dWNoem1uYXRoenJzcXFzdWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNjYwNDksImV4cCI6MjAyNTY0MjA0OX0.V9yZTvTcP-1u8zD1PLSKkGhY_fVWLqMDCGBV0hNFBLU')
   const profiles = ref([])
   
   async function getProfiles() {
     const { data } = await supabase.from('profiles').select()
     profiles.value = data
   }
   
   onMounted(() => {
     getProfiles()
   })
   </script>
   
   <template>
     <ul>
       <li v-for="profile in profiles" :key="profile.id">{{ profile.username }}</li>
     </ul>
   </template> -->
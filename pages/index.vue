<template>
  <title>
    ようこそ
  </title>
  <NuxtLink to="/resister">
    新規会員登録はこちら
  </NuxtLink>

</template>
  
<!-- <script setup>
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
   -->
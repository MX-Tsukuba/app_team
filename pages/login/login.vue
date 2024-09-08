<script setup lang="ts">
// import {signInWithOAuth} from '~/composables/useSupabaseClient';

const supabase = useSupabaseClient()

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/login/confirm', // ここを絶対パスにしたら成功する
    }
  })
  if (error) console.log(error)
}
</script>

<template>
  <div class="loginContainer">
    <h1>login.vue</h1>
    <button class="loginButton" @click="signInWithGoogle">
      Sign In with Google
    </button>
    <NuxtLink class="returnIndex" to="/top">
      return to index.vue
    </NuxtLink>
  </div>
</template>

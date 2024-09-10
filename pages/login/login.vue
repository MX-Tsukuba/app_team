<script setup lang="ts">
// import {signInWithOAuth} from '~/composables/useSupabaseClient';
definePageMeta({ layout: false })
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
  <div class="loginPage">
    <img class="logo" src="~/assets/img/logo.png">
    <!-- <script src="https://accounts.google.com/gsi/client" async></script> -->
    <button class="loginButton" @click="signInWithGoogle">
      <img src="~/assets/img/loginButton.png">
    </button>
  </div>
</template>

<style scoped lang="css">
.loginPage {
  display: flex;
  padding: 214px 45px 115px 45px;
  flex-direction: column;
  /*justify-content: flex-end;*/
  align-items: center;
  gap: 161px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.30) 0.05%, rgba(254, 254, 254, 0.50) 50.29%, #777 99.93%);
}


</style>
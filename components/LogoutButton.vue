// components/LogoutButton.vue

<template>
  <button @click="signOut">ログアウト</button>
</template>

<script setup>
import useAuth from "~/composable/useAuth";



const { signOut } = useAuth();
</script>
~/hooks/useAuth

// components/LogoutButton.vue

<template>
  <button @click="signOut">ログアウト</button>
</template>

<script setup>
import useAuthTest from "@/hooks/useAuthTest";

const { signOut } = useAuthTest();
</script>
~/hooks/useAuthGoogle
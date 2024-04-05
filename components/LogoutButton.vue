// components/LogoutButton.vue

<template>
  <button @click="signOut">ログアウト</button>
</template>

<script setup>
import useAuth from "@/hooks/useAuth";

const { signOut } = useAuth();
</script>

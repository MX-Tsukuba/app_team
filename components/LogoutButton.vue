// components/LogoutButton.vue

<template>
  <button @click="signOut">ログアウト</button>
</template>

<script setup>
//import {useRouter} from 'vue-router';
import useAuth from "@/hooks/useAuth";

// const router = useRouter();
const { signOut } = useAuth();

// const handleSignOut = async () => {
//   await signOut();
//   router.push("index");
// };

</script>
~/hooks/useAuth

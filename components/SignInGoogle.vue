<template>
    <div>
      <button @click="signInWithGoogle">Googleでサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import useAuthGoogle from '@/hooks/useAuthGoogle'
  
  const {signInWithGoogle,error,session}=useAuthGoogle();
  </script>
  ~/hooks/useAuthGoogle
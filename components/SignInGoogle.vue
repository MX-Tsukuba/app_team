<template>
    <div>
      <button @click="signInWithGoogle">Googleでサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import useAuthTest from '@/hooks/useAuthTest'
  
  const {signInWithGoogle,error,session}=useAuthTest();
  </script>
  
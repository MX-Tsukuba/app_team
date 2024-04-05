<template>
    <div>
      <button @click="signInWithGithub">Githubでサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import useAuth from '@/hooks/useAuth'
  
  const {signInWithGithub,error,session}=useAuth();
  </script>
  
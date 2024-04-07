<template>
    <div>
      <button @click="signInWithGithub">Githubでサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import useAuthGithub from '@/hooks/useAuthGithub'
  
  const {signInWithGithub,error,session}=useAuthGithub();
  </script>
  ~/hooks/useAuthGithub
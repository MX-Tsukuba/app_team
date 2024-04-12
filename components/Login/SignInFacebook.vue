<template>
    <div>
      <button @click="signInWithProvider">{{providerName}}でサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
</template>
  
<script setup>
import useAuth from '~/composable/useAuth'

const providerName = 'facebook';

const {signInWithProvider,error,session}=useAuth(providerName);
</script>
  
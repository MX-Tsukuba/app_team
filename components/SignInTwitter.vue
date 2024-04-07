<template>
    <div>
      <button @click="signInWithProvider">{{providerName}}でサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import useAuth from '@/hooks/useAuth'

const providerName = 'twitter';

const {signInWithProvider,error,session}=useAuth(providerName);
</script>

<template>
    <div>
      <button @click.prevent="signInWithProviderAndRedirect">logouttestでサインインする</button>
      <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import useAuth from '~/composable/useAuth'
import { useRouter } from 'vue-router'

const providerName = 'twitter';

const {signInWithProvider,error}=useAuth(providerName);
const router = useRouter();

const signInWithProviderAndRedirect = async () => {
    await signInWithProvider();
    if(session.value){
        // router.push('@/pages/logout');
        navigateTo('~/pages/logout');
    }else{
        navigateTo('~/pages/resister');
    }
}
</script>

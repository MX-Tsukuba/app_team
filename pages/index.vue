<template>
    <div class="indexContainer">
      <h1>index.vue</h1>
      <div class="message" >(自分用メモ)script部分のエラーが未修正</div>
      <NuxtLink class="loginLink" to="/login">
          jump to login.vue
      </NuxtLink>
    </div>
</template>

<script setup lang="ts">
// import type { Database } from '~/types/database.types.ts'
// import session from '~/middleware/auth'
const fetchLibrary = async () => {
  const { libraries } = await $fetch('/api/libraries')
}
const fetchSensitiveData = async () => {
  const { data: sensitiveData } = await useFetch('/api/bypass-rls')
  if (sensitiveData.value) {
    console.log(sensitiveData.value.sensitiveData)
  }
}
const session = ref(null)

//usefetchはsetup, plugin, middlewareで扱う setup内なら書ける

const { data: sessionData } = await useFetch('/api/session', {
  headers: useRequestHeaders(['cookie'])
})

// session.value = sessionData.value

const user = ref(null)

const { data : userData} = await useFetch('/api/me', {
  headers: useRequestHeaders(['cookie'])
})

// user.value = userData.value
</script>

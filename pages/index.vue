<template>
    <Header />
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

<style scoped>
/* 全体のコンテナのスタイル */
.indexContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

/* タイトルのスタイル */
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  margin-top: 20px;
}

/* メッセージのスタイル */
.message {
  font-size: 1.2rem;
  color: #ff6347; /* トマト色でエラーメッセージを示す */
  margin-bottom: 2rem;
  text-align: center;
}

/* ログインリンクのスタイル */
.loginLink {
  font-size: 16px;
  color: #007BE5;
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid #007BE5;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

/* リンクのホバー時のスタイル */
.loginLink:hover {
  background-color: #007BE5;
  color: white;
  text-decoration: none;
}

/* スマホ向けのスタイル調整 */
@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem;
  }

  .message {
    font-size: 1rem;
  }

  .loginLink {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>

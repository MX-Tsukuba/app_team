<template>
    <Header/>
    <div class="resisterContainer">
        <h1>resister.vue</h1>
        <div class="successMessage">authentication successful</div>
        <NuxtLink class="returnLink" to="/">
            return to index.vue
        </NuxtLink>
        <button class="logoutButton" @click="signOut">
          logout
        </button>
    </div>
</template>

<script>
const supabase = useSupabaseClient()
const signOut = async () =>{
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}
</script>

<style scoped>
/* 全体のコンテナのスタイル */
.resisterContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
  box-sizing: border-box;
}

/* タイトルのスタイル */
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

/* 成功メッセージのスタイル */
.successMessage {
  font-size: 1.2rem;
  color: #28a745; /* 緑色で成功を示す */
  margin-bottom: 2rem;
  text-align: center;
}

/* リンクのスタイル */
.returnLink {
  font-size: 16px;
  color: #007BE5;
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid #007BE5;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

/* リンクのホバー時のスタイル */
.returnLink:hover {
  background-color: #007BE5;
  color: white;
  text-decoration: none;
}

/* スマホ向けのスタイル調整 */
@media (max-width: 600px) {
  .title {
    font-size: 1.5rem;
  }

  .successMessage {
    font-size: 1rem;
  }

  .returnLink {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
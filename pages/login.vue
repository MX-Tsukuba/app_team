<script setup lang="ts" src="">
const supabase = useSupabaseClient()

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/confirm', // ここを絶対パスにしたら成功する
    }
  })
  if (error) console.log(error)
}
</script>
<template>
  <Header/>
  <div class="loginContainer">
    <h1>login.vue</h1>
    <button class="loginButton" @click="signInWithGoogle">
      Sign In with Google
    </button>
    <NuxtLink class="returnIndex" to="/">
      return to index.vue
    </NuxtLink>
  </div>
</template>
<style scoped>
/* CSSのスタイル設定 */
.loginContainer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f4f4f9;
  padding: 20px; /* パディングを追加して余白を確保 */
  box-sizing: border-box; /* パディングを含めて幅と高さを計算 */
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.loginButton {
  background-color: #007BE5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; /* ボタンを画面幅に合わせる */
  max-width: 300px; /* ボタンの最大幅を設定 */
}
 
.loginButton:hover {
  background-color: #007BE5;
}

.returnIndex {
  margin-top: 1rem;
  font-size: 16px;
  color: #007BE5;
  text-decoration: none;
  text-align: center;
}

.returnIndex:hover {
  text-decoration: underline;
}

/* スマホ向けスタイル */
@media (max-width: 600px) {
  h1 {
    font-size: 1.5rem; /* ヘッダーのフォントサイズを小さく */
  }

  .loginButton {
    font-size: 14px; /* ボタンのフォントサイズを小さく */
    padding: 8px 16px; /* パディングを調整 */
  }

  .returnIndex {
    font-size: 14px; /* リンクのフォントサイズを小さく */
  }
}
</style>
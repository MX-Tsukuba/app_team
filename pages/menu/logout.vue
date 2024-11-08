<script setup lang="ts">
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  localStorage.clear();
}
</script>

<template>
  <div class="logout">
    <div class="card">
      <p class="title">ログアウトしますか？</p>
      <div class="buttons">
        <Nuxt-link to="../top" class="canselButton">キャンセル</Nuxt-link>
        <Nuxt-link @click="signOut" to="../login" class="confirmButton">確認</Nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logout{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 300px;
  border-radius: 32px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), #FFF;
  box-sizing: border-box;
  padding: 20px;
}

.card {
  display: flex;
  height: 128px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  border-radius: 16px;
  background: #FFF;
}

.title{
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.confirmButton{
  display: flex;
  width: 140px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  background: #E45D5D;
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.canselButton{
  display: flex;
  width: 140px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  border: 1px solid #E45D5D;
  background: #FFF;
  color: rgba(228, 93, 93, 0.75);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
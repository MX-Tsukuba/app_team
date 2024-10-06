<script setup lang="ts">
import { useModalStore } from '~/src/store/modal';
const modalStore = useModalStore();
const toggleModal = () => modalStore.toggleModal('');
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}

import { usePageStore } from '~/src/store/currentPage';
const pageStore = usePageStore();

const isShowLogoutModal = computed(() => modalStore.isShowModal);
</script>

<template>
  <div class="logout" v-if="isShowLogoutModal">
    <button class="bButton">ログアウト</button>
  </div>
  <div class="modal" @click.self="toggleModal">
    <div class="card">
    <span class="closeModal" @click="toggleModal">×</span>
      <p class="title">ログアウトしますか？</p>
      <div class="buttons">
        <Nuxt-link @click="toggleModal, signOut" to="../login" class="bButton">確認</Nuxt-link>
        <button @click="toggleModal" class="bButton">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logout{
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.card {
  width: 70%;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
}
.closeModal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.title{
  font-size: 24px;
  font-weight: bold;
}
</style>
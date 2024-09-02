<template>
  <div class="modal" @click.self="toggleModal">
    <div class="card">
    <span class="closeModal" @click="toggleModal">×</span>
      <p class="title">スワイプ操作</p>
      <p>スワイプして画面を切り替えられます</p> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '~/src/store/modal';
const modalStore = useModalStore();
const toggleModal = modalStore.toggleModal;
</script>

<style scoped>
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
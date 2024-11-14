<template>
  <div class="modal" @click.self="toggleModal">
    <div class="card">
    <span class="closeModal" @click="toggleModal">×</span>
      <p class="title">注意！</p>
      <p>動画は各ホールにつき一度しか登録できません。</p>
      <p>launching camera...</p>
      <!-- <p>動画はラウンドにつき一度しか登録できません。撮影を開始しますか？</p>       
      <Nuxt-link @click="toggleModal" to="/camera" class="bButton">撮影</Nuxt-link>   -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '~/src/store/modal';
const modalStore = useModalStore();
const toggleModal = () => modalStore.toggleModal('');
const router = useRouter();
const route = useRoute();
let roundId =ref<number>(Number(route.params.id));

onMounted(() => {
  setTimeout(() => {
    roundId.value=Number(route.params.id);
    console.log(roundId.value);
    router.push({path:'/camera', query: {id: roundId.value, param:'scoreInput'}});
    toggleModal();
  }, 2000);
});
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
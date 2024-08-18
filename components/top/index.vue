<template>
  <section class="wholeHome">
    <enterGolfCourseName v-if="isShowModal"/>
    <div class="recentRecord">
      <p>直近の記録エリア</p>
    </div>
    <div class="inputTags">
      <div class="inputTag">
        <img src="~assets/img/foodInput.png" width="40">
        <div class="innerInputTag">
          <p class="tagTitle">食事を記録</p>
          <p class="tagDescription">毎日の食事とカロリーを記録します</p>
        </div>
        <img src="~assets/img/right.png">
      </div> 
      <div class="inputTag">
        <img src="~assets/img/bodyInput.png" width="40">
        <div class="innerInputTag">
          <p class="tagTitle">身体情報</p>
          <p class="tagDescription">体重や身長などの変化を記録します</p>
        </div>
        <img src="~assets/img/right.png">
      </div> 
      <div class="inputTag">
        <img src="~assets/img/golfInput.png" width="40">
        <div class="innerInputTag">
          <p class="tagTitle">スコアを記録</p>
          <p class="tagDescription">ゴルフのスコアなどを記録します</p>
        </div>
        <img src="~assets/img/right.png" @click="toggleModal">
      </div>
    </div>    
    <NuxtLink to="../camera/video"  class="circleBtn"><img src="~assets/img/camera.png" width="48"></NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { useModalStore } from '~/src/store/modal';
import enterGolfCourseName from './enterGolfCourseName.vue';

const headVarStore = useHeadVarStore();
headVarStore.title = 'Home';
const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const toggleModal = () => modalStore.toggleModal();
</script>

<style scoped>
.wholeHome {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recentRecord {
  width: 360px;
  height: min(200px, max-height);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, .25);
  padding: 10px
}
.inputTags{
  margin-top: 32px;
}
.inputTag{
  width: 350px;
  height: 64px;
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, .25);
}
.innerInputTag{
  width: 65%;
  display: flex;
  flex-direction: column;
}
.tagTitle{
  font-size: 24px;
  font-weight: bold;
}
.tagDescription{
  font-size: 14px;
  color: #777;
}
</style>
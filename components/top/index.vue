<template>
  <section class="wholeHome">
    <enterGolfCourseName v-if="isShowModal && modalName === 'top'"/>
    <div class="recentRecord">
      <p>直近の記録エリア</p>
    </div>
    <div class="inputTags">
      <inputTag  v-for="(v,i) in inputAll" :key="i" :images="inputAll[i].images" :tag-title="inputAll[i].tagTitle" :tag-description="inputAll[i].tagDescription" :link="inputAll[i].link" :onclick="inputAll[i].onclick" ></inputTag>
    </div>
    <NuxtLink to="../camera"  class="circleBtn"><img src="~assets/img/camera.png" width="48"></NuxtLink>
  </section>
</template>

<script setup lang="ts">
import inputTag from './inputTag.vue';
import { computed } from 'vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { useModalStore } from '~/src/store/modal';
import enterGolfCourseName from './enterGolfCourseName.vue';

const headVarStore = useHeadVarStore();
headVarStore.title = 'Home';
const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);

const inputAll =ref([
  {
    images:"~/assets/img/foodInput.png",
    tagTitle:'食事を記録',
    tagDescription:'毎日の食事とカロリーを記録します',
    link:'../mealInput',
    onclick:null
  },
  {
    images:'~assets/img/bodyInput.png',
    tagTitle:'身体情報',
    tagDescription:'体重や身長などの変化を記録します',
    link:'../bodyInput',
    onclick:null
  },
  {
    images:'~assets/img/golfInput.png',
    tagTitle:'スコアを記録',
    tagDescription:'ゴルフのスコアなどを記録します',
    link:'',
    onclick:toggleModal
  }
])
</script>

<style scoped>
.wholeHome {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recentRecord {
  width: 360px;
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

</style>
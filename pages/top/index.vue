<template>
  <section class="wholeHome">
    <enterGolfCourseName v-if="isShowModal && modalName === 'top'"/>
    <div class="recentRecord">
      <p class="recentRecordTitle">直近のフォームスコア</p>
      <recentGraph/>
    </div>
    <div class="inputTags">
      <inputTag  v-for="(v,i) in inputAll" :key="i" :images="inputAll[i].images" :tag-title="inputAll[i].tagTitle" :tag-description="inputAll[i].tagDescription" :link="inputAll[i].link" :onclick="inputAll[i].onclick" ></inputTag>
    </div>
    <button @click="toCamera()" class="circleBtn"><img src="~assets/img/camera.svg" width="48"></button>
  </section>
</template>

<script setup lang="ts">
import { useHeadVarStore } from '~/src/store/headVar.js';
import { useModalStore } from '~/src/store/modal';
import { usePageStore } from '~/src/store';
import recentGraph from '~/components/top/recentGraph.vue';
import inputTag from '~/components/top/inputTag.vue';
import enterGolfCourseName from '~/components/top/enterGolfCourseName.vue';

const pageStore = usePageStore();
const headVarStore = useHeadVarStore();
headVarStore.title = 'Motion-X';
const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);
const router = useRouter();
const inputAll =ref([
  {
    images:'',
    tagTitle:'食事を記録',
    tagDescription:'毎日の食事とカロリーを記録します',
    link:'../mealInput',
    onclick:null
  },
  {
    images:'',
    tagTitle:'身体情報',
    tagDescription:'体重や身長などの変化を記録します',
    link:'../bodyInput',
    onclick:null
  },
  {
    images:'',
    tagTitle:'スコアを記録',
    tagDescription:'ゴルフのスコアなどを記録します',
    link:'',
    onclick:toggleModal
  }
])

const toCamera = () => {
  router.push({path:'/camera', query:{param:'top'}})
}

onMounted(() => {
  pageStore.setCurrentPage('home');
  (async () => {
    const foodInput = await import('@/assets/img/foodInput.webp');
    const bodyInput = await import('@/assets/img/bodyInput.webp');
    const golfInput = await import('@/assets/img/golfInput.webp');

    inputAll.value[0].images = foodInput.default;
    inputAll.value[1].images = bodyInput.default;
    inputAll.value[2].images = golfInput.default;
  })();
});
</script>

<style scoped>
.wholeHome {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}

.recentRecord {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, .25);
  padding: 20px
}
.recentRecordTitle{
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
.inputTags{
  margin-top: 32px;
}

</style>
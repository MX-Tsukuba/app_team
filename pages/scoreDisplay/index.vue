<template>
  <div class="back">
    <div id="tab-container">
      <div class="label indicator"><p style="opacity: 0.6">スコア一覧</p></div>
      <div class="label"><p style="opacity: 0.6">動画一覧</p></div>
    </div>
    <ScoreDisplay />
  </div>
</template>

<script setup lang="ts">
import ScoreDisplay from '~/components/scoreDisplay/logList.vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore();
headVarStore.title = 'スコア記録';
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('score');
});
</script>

<style scoped>
.back{
    display: flex;
    background-attachment: fixed;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: 32px;
    background: #F0F0F0;
    align-self: stretch;
    gap: 10px;
  }

#tab-container{
  display: flex;
  width: 264px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 9px;
  background: #DADADB;
  flex-direction: row;
}

.label{
  display: flex;
  width: 130px;
  padding: 7px 22px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.indicator{
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #FFF;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>

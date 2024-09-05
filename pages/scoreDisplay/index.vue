<template>
  <ScoreDisplay/>
</template>

<script setup lang="ts">
import ScoreDisplay from '~/components/scoreDisplay/logList.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = 'スコア記録'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('score');
});
</script>
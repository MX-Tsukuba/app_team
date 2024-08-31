<template>
  <ScoreInput/>
</template>

<script setup lang="ts">
import ScoreInput from '~/components/scoreInput/index.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = 'スコア入力'

const pageStore = usePageStore();

onMounted(() => {
  pageStore.setCurrentPage('score');
});
</script>
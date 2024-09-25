<template>
  <BodyDisplay/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BodyDisplay from '~/components/bodyDisplay/index.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '身体情報記録'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('body');
});
</script>
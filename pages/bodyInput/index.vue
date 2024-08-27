<template>
  <BodyInput/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BodyInput from '~/components/bodyInput/index.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '身体情報入力'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('body');
});
</script>
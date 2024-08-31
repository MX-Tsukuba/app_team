<template>
  <FoodInput/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FoodInput from '~/components/foodInput/index.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '食事入力'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('food');
});
</script>
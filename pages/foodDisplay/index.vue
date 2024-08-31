<template>
  <FoodDisplay/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FoodDisplay from '~/components/foodDisplay/index.vue';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '食事記録'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('food');
});
</script>
<template>
  <top/>
</template>

<script setup lang="ts">
import top from '~/components/top/index.vue';
import { usePageStore } from '~/src/store/currentPage';
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('home');
});
</script>
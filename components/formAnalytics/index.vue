<template>
  <div id="card-container">
    <topCard />
    <bottomCard />
  </div>
</template>

<script setup lang="ts">
import topCard from '~/components/formAnalytics/topCard.vue';
import bottomCard from '~/components/formAnalytics/bottomCard.vue';
</script>

<style>
#card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>

<template>
  <div @click="$emit('click')">
      <img :src="imageSrc" :alt="mealType" class="kindBtnStyle" />
      <!-- <p>{{ mealType }}</p> -->
    </div>
</template>

<script setup lang="ts">

defineProps<{
  mealType: string
  imageSrc: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.kindBtnStyle{
    width: 60px;
    height: 60px;

    border-radius: 60px;
    border: 1px solid #F28822;
    background: #FFF;
}
</style>
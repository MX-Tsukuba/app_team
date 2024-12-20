<script setup lang="ts">
import { defineProps } from 'vue';
import CameraImg from '~/assets/img/camera.svg';
import CameraTransparentImg from '~/assets/img/cameraTransparent.svg';
import { useScoreStore } from '~/src/store/scoreInput';


const scoreStore = useScoreStore();

const props = defineProps<{
  playDataArr: holeDetail[];
  movieAnalyzeArr: { score: number; name: string; color: string }[];
  isActive: boolean;
}>();

const currentHoleIndex = computed(() => props.playDataArr[scoreStore.currentHoleIndex]);
const isCurrentHoleRecorded = computed(() => currentHoleIndex.value?.videoUrl !== undefined); // videoUrlが存在するか確認
</script>

<template>
  <div class="circleBtn" :class="{'inActive': isCurrentHoleRecorded}">
    <img :src="isCurrentHoleRecorded ? CameraTransparentImg : CameraImg" width="48">
  </div>
</template>

<style scoped>
.circleBtn.inActive {
  background-color: rgb(225 225 225 /.7);
}
</style>

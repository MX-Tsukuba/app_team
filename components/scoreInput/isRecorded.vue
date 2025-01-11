<script setup lang="ts">
import { defineProps } from 'vue';
import CameraImg from '~/assets/img/camera.svg';
import CameraTransparentImg from '~/assets/img/cameraTransparent.svg';

const props = defineProps<{
  currentHoleIndex: number;
  playDataArr: dbPlayData[]
}>();

type dbPlayData = {
  holeNumber?: number;
  scoreNumber?: number;
  puttsNumber?: number;
  videoUrl?: string | null;
};

// isCurrentHoleRecordedがtrueの場合、カメラアイコンを透明にする
const isCurrentHoleRecorded = computed(() => {
  const currentHoleData = props.playDataArr?.[props.currentHoleIndex];
  if (!currentHoleData) return false;
  
  console.log(currentHoleData.videoUrl !== undefined && currentHoleData.videoUrl !== null);
  return currentHoleData.videoUrl !== undefined && 
         currentHoleData.videoUrl !== null;
});
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

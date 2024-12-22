<script setup lang="ts">
import { defineProps } from 'vue';
import CameraImg from '~/assets/img/camera.svg';
import CameraTransparentImg from '~/assets/img/cameraTransparent.svg';

type dbPlayData = {
  holeNumber?: number;
  scoreNumber?: number;
  puttsNumber?: number;
  videoUrl?: string | null;
};
interface Props {
  playDataArr: dbPlayData[];
}

const props = defineProps<Props>();
const currentHoleIndex = computed(() => props.);
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

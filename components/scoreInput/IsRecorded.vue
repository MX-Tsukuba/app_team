<script setup lang="ts">
import CameraImg from '~/assets/img/camera.svg';
import CameraTransparentImg from '~/assets/img/cameraTransparent.svg';
import { useScoreStore } from '~/src/store/scoreInput';

const scoreStore = useScoreStore();

//piniaから取得
const currentHoleIndex = computed(() => scoreStore.currentHoleIndex);
const videoUrlArray = computed(() => scoreStore.videoUrlArray);
console.log(`[In IsRecorded.vue] videoUrlArray:${videoUrlArray.value}, currentHoleIndex:${currentHoleIndex.value}`);

const isCurrentHoleRecorded = computed(() => scoreStore.isCurrentHoleRecorded());
console.log(`[In IsRecorded.vue] isCurrentHoleRecorded:${isCurrentHoleRecorded.value}`);
</script>
<template>
    <div class="circleBtn" :class="{'inActive': isCurrentHoleRecorded}">
        <img :src="isCurrentHoleRecorded ? CameraTransparentImg : CameraImg" width="48">
    </div>
</template>
<style scoped>
.circleBtn.inActive{
    background-color: rgb(225 225 225 /.7);
  }
</style>

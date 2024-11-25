<script setup lang="ts">
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';
import { useScoreStore } from '~/src/store/scoreInput';

const route = useRoute();
const scoreStore = useScoreStore();

//ここを取得する
const videoUrl = computed(() => scoreStore.videoUrl);
const currentHoleIndex = computed(() => scoreStore.currentHoleIndex);
const isRecordedArray = computed(() => scoreStore.isRecordedArray);
console.log(`[In IsRecorded.vue] isRecordedArray:${isRecordedArray.value}, currentHoleIndex:${currentHoleIndex.value}`);

const isCurrentHoleRecorded = computed(() => {
    return isRecordedArray.value[currentHoleIndex.value] !== null;
});

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

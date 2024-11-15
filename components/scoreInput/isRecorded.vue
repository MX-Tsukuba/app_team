<script setup lang="ts">
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';
import { useScoreStore } from '~/src/store/scoreInput';

const scoreStore = useScoreStore();

//ここを取得する
const videoUrl = computed(() => scoreStore.videoUrl);
const currentHoleIndex = computed(() => scoreStore.currentHoleIndex);
console.log(currentHoleIndex);
//ここまで

//動画が入っているかどうかの配列をつくる
const isRecordedArray=ref<boolean[]>(new Array(18).fill(false));

</script>
<template>
    <img :src="videoUrl ? CameraTransparentImg : CameraImg" width="48">
</template>

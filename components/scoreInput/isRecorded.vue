<script setup lang="ts">
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';
const videoUrl = ref<string | null>(null);
const currentHoleIndex=ref<number>(0);
const updateCurrentHole = (holeId:number) =>{//holeの変更に応じてIndexを変更する
  currentHoleIndex.value = holeId;
  console.log("holeId",holeId)
};
const isRecordedArray=ref<boolean[]>(new Array(18).fill(false));
</script>
<template>
    <img :src="videoUrl ? CameraTransparentImg : CameraImg" width="48">
</template>
<template>
  <div>
    <h1>カメラで撮影</h1>
    <video ref="video" autoplay></video>
    <div>
      <button @click="captureImage">写真を撮影</button>
      <button @click="startRecording" :disabled="isRecording">動画を開始</button>
      <button @click="stopRecording" :disabled="!isRecording">動画を停止</button>
      <button @click="downloadVideo" :disabled="!videoSrc">動画を保存</button>
      <button @click="downloadImage" :disabled="!videoSrc">写真を保存</button>
    <!--------->
      <input type = "file" accept = "video/*" @change="onFileChange"/>
      <input type = "file" accept = "video/*" @change="upLoadSupabaseStorage">
    </div>

    <div v-if="imageSrc">
      <h2>撮影した画像orアプロードした画像</h2>
      <img :src="imageSrc" alt="Captured Image" />
    </div>

    <div v-if="videoSrc">
      <h2>撮影した動画orアップロードした動画</h2>
      <video :src="videoSrc" controls></video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSupabaseClient } from '#imports';

const video = ref<HTMLVideoElement | null>(null)
const imageSrc = ref<string | null>(null)
const videoSrc = ref<string | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordedChunks: Blob[] = []
const isRecording = ref(false)

const startCamera = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (video.value) {
        video.value.srcObject = stream
      }
    } catch (error) {
      console.error("カメラの起動に失敗しました:", error)
    }
  }
}

const captureImage = () => {
  if (video.value) {
    const canvas = document.createElement('canvas')
    canvas.width = video.value.videoWidth
    canvas.height = video.value.videoHeight
    const context = canvas.getContext('2d')
    if (context) {
      context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
      imageSrc.value = canvas.toDataURL('image/png')
    }
  }
}

const startRecording = () => {
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject as MediaStream
    mediaRecorder.value = new MediaRecorder(stream)
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data)
      }
    }
    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/mp4' })
      videoSrc.value = URL.createObjectURL(blob)
      recordedChunks.length = 0
    }
    mediaRecorder.value.start()
    isRecording.value = true
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}

const downloadVideo = () => {
  if (videoSrc.value) {
    const a = document.createElement('a')
    a.href = videoSrc.value
    a.download = 'recorded_video.mp4'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const downloadImage = () =>{
  if(imageSrc.value){
    const a = document.createElement('a')
    a.href = imageSrc.value
    a.download = 'recoad_image.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const onFileChange = (event: Event) =>{
  const input = event.target as HTMLInputElement;
  if(input.files && input.files[0]){
    const file = input.files[0];
    videoSrc.value = URL.createObjectURL(file);
  }
} 

const upLoadSupabaseStorage= async(event: Event)=>{
  const input = event.target as HTMLInputElement;
  if(input.files && input.files[0]){
    const file = input.files[0];
    const{data, error} = await useSupabaseClient().storage.from('Movie').upload('test/test.mp4', file);
    if(error){
      console.log(error);
    }
  }
}

onMounted(() => {
  startCamera()
})

onBeforeUnmount(() => {
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject as MediaStream
    const tracks = stream.getTracks()
    tracks.forEach(track => track.stop())
  }
})
</script>

<style scoped>
video {
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
  border: 1px solid #ccc;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 16px;
  margin-right: 8px;
}

h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

h2 {
  font-size: 20px;
  margin-top: 24px;
}

img, video {
  max-width: 100%;
  height: auto;
  margin-top: 16px;
}
</style>

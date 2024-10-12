<script lang="ts" setup>
definePageMeta({
  layout: false,
});
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports';
import { useModalStore } from '~/src/store/modal';

const video = ref<HTMLVideoElement | null>(null)
const videoSrc = ref<string | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordedChunks: Blob[] = []
const isRecording = ref(false)
const router = useRouter()

const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);

//Function Definition
const startCamera = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } }
     })
      if (video.value) {
        video.value.srcObject = stream
      }
    } catch (error) {
      console.error("カメラの起動に失敗しました:", error)
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
      //upLoadSupabaseStorage(blob) 
    }
    mediaRecorder.value.start()
    isRecording.value = true
  }
}
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    toggleModal('confirmModal')
  }
}
const confirmVideo = async () => {
  if (videoSrc.value) {
    const blob = new Blob(recordedChunks, { type: 'video/mp4' });
    await upLoadSupabaseStorage(blob);
  }
  toggleModal('confirmModal'); // Close modal after confirmation
}
const upLoadSupabaseStorage = async (video: Blob | File) => {
  const fileName: string = videoSrc.value ? videoSrc.value.split('/').pop()?.split('.')[0] ?? 'test/test.mp4' : 'test/test.mp4'
  const { data, error } = await useSupabaseClient().storage.from('Movie').upload(fileName, video)
    if (error) {
      console.log(error)
    }else{
        const { data: publicUrlData } = useSupabaseClient().storage.from('Movie').getPublicUrl(fileName)
        const publicUrl = publicUrlData.publicUrl
        router.push({ path: '/scoreInput', query: { video: publicUrl } } )//router.pushはここを参考にする
    }
}
//Function Execution
const toggleRecording = () => {
  if (isRecording.value) { //録画のトグル
    stopRecording()
  } else {
    startRecording()
  }
}
const onFileChange = (event: Event) =>{
  const input = event.target as HTMLInputElement;
  if(input.files && input.files[0]){
    const file = input.files[0];
    videoSrc.value = URL.createObjectURL(file);
    //upLoadSupabaseStorage(file)
    toggleModal('confirmModal')
  }
}

//Lifecycle Hooks
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

<template>
  <div class="whole">
    <div v-if="isShowModal && modalName === 'confirmModal'" class="modal" @click.self="toggleModal('confirmModal')">
      <div class="card">
        <p class="title">この動画を使用しますか？</p>
        <div class="buttons">
          <button @click="toggleModal('confirmModal')" class="cancelButton">キャンセル</button>
          <Nuxt-link @click="confirmVideo" to="../scoreInput" class="confirmButton">確認</Nuxt-link>
        </div>
      </div>
    </div>
    
    <img src="~/assets/img/backWhite.png" alt="Left" class="backButton" @click="$router.go(-1)">
    <video ref="video" autoplay playsinline></video>
    <div class="upBtnBox">
      <label class="upLoadLabel"><!--すでにある動画を選択する-->
        動画を選択
        <input type = "file" accept = "video/*" @change="onFileChange"/>
      </label>
      <button @click="toggleRecording()" class="recordingButton"><div :class="isRecording ? 'stopBtn' : 'startBtn'"></div></button>
    </div>
  </div>
</template>


<style scoped>
.whole{
  padding: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
    overflow: hidden;
  touch-action: none;
}
.backButton{
    margin: 0;
    height: 30px;
    position: fixed;
    top: 10px;
    left: 10px;
}
video {
  width: 100%;
  max-width: 600px;
  margin-top: 24px;
}
.upBtnBox{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.upLoadLabel{
  input[type="file"]{
    display: none;
  }
  font-size: 13px;
  color: rgb(255 255 255 /.9);
  border: 1px solid rgb(255 255 255 /.9);
  border-radius: 8px;
  padding: 8px 18px;
  position:absolute;
  left: 3%;
  cursor: pointer;
  transition: color 1s, border-color 1s;
}
.recordingButton{
  display: flex;
  width: 64px;
  height: 64px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border: 4px solid #FFF;
  border-radius: 64px;
}
.startBtn {
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background: #F00;
}
.stopBtn {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #F00;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.card {
  display: flex;
  width: 352px;
  height: 101px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.50);
}
.closeModal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.title{
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.cancelButton{
  display: flex;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  border: 1px solid #E45D5D;
  background: #FFF;
  color: rgba(228, 93, 93, 0.75);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.confirmButton{
  display: flex;
  padding: 5px 55px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  background: #E45D5D;
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports';

const video = ref<HTMLVideoElement | null>(null)
const videoSrc = ref<string | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordedChunks: Blob[] = []
const isRecording = ref(false)
const router = useRouter()

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
</script>
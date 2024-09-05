<template>
  <div>
    <img :src="currentImage" @click="switchKind" alt="Time of day image" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

type Kind = '朝' | '昼' | '夜' | '間食'

const imageMap: Record<Kind, string> = {
  '朝': '/images/icon_morning.png',
  '昼': '/images/icon_afternoon.png',
  '夜': '/images/icon_night.png',
  '間食': '/images/icon_snack.png'
}

export default defineComponent({
  name: 'ImageSwitcher',
  setup() {
    const kind = ref<Kind>('朝')

    const currentImage = computed(() => imageMap[kind.value])

    const switchKind = () => {
      const order: Kind[] = ['朝', '昼', '夜', '間食']
      const currentIndex = order.indexOf(kind.value)
      kind.value = order[(currentIndex + 1) % order.length]
    }

    return {
      kind,
      currentImage,
      switchKind
    }
  }
})
</script>

<style>
.kindBtnStyle{
    display: flex;
    width: 60px;
    height: 60px;
    padding: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    border-radius: 60px;
    border: 1px solid #F28822;
    background: #FFF;
}
</style>
<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    @click.self="emit('update:isOpen', false)"
  >
    <div class="modal">
      <div class="modal-header">
        <h2 style="margin: 0">柔軟性について</h2>
        <button class="close-button" @click="emit('update:isOpen', false)">
          ×
        </button>
      </div>
      <div class="modal-body">
        <div class="slides-container">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="slide"
            :class="{ active: index === currentSlide }"
          >
            <img :src="slide.image" alt="説明画像" class="modal-image" />
            <p class="description">{{ slide.text }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="currentSlide > 0" class="modal-button" @click="prevSlide">
          戻る
        </button>
        <button
          class="modal-button"
          :class="{ 'single-button': currentSlide === 0 }"
          @click="nextSlide"
        >
          {{ currentSlide === slides.length - 1 ? '完了' : '次へ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import flexibility1 from '~/assets/img/flexibility1.png';
import flexibility2 from '~/assets/img/flexibility2.png';
import flexibility3 from '~/assets/img/flexibility3.png';

const emit = defineEmits(['update:isOpen']);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const slides = [
  {
    image: flexibility1,
    text: 'はじめにクラブをイラストのように持ちます。',
  },
  {
    image: flexibility2,
    text: '次にクラブから手を離さずに両手を同時に前から後ろに回します。',
  },
  {
    image: flexibility3,
    text: '今度は後ろから前に両手を同時に回します。この時のグラブを持つ両手の間の長さを記入しましょう。値が小さいほど肩甲骨周りの柔軟性が高いということになります。どこまで狭くできるかチャレンジしてみましょう。',
  },
];

const currentSlide = ref(0);

const nextSlide = () => {
  if (currentSlide.value === slides.length - 1) {
    emit('update:isOpen', false); // モーダルを閉じる
  } else {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 670px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  flex-grow: 1;
}

.slides-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide {
  display: none;
  text-align: center;
}

.slide.active {
  display: block;
}

.modal-image {
  max-width: 100%;
  height: auto;
}

.description {
  font-size: 16px;
  color: #555;
  text-align: left;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  background-color: #509a58;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

.modal-button:hover {
  background-color: #3e7a46;
}

.single-button {
  margin-left: auto;
}
</style>

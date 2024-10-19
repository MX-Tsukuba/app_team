<template>
  <div class="back">
    <div id="tab-container">
      <div class="tab-labels">
        <button
          class="label"
          :class="{ active: activeTab === 0 }"
          @click="selectTab(0)"
        >
          <p>スコア一覧</p>
        </button>
        <button
          class="label"
          :class="{ active: activeTab === 1 }"
          @click="selectTab(1)"
        >
          <p>動画一覧</p>
        </button>
        <div class="indicator" :style="indicatorStyle"></div>
      </div>
    </div>
    <ScoreDisplay v-if="activeTab === 0" />
    <MovieDisplay v-else />
  </div>
</template>

<script setup lang="ts">
import ScoreDisplay from '~/components/scoreDisplay/logList.vue';
import MovieDisplay from '~/components/scoreDisplay/movieList.vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore();
headVarStore.title = 'スコア記録';
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('score');
});

const activeTab = ref(0);

const selectTab = (index: number) => {
  activeTab.value = index;
};

const indicatorStyle = computed(() => {
  return {
    transform: `translateX(${activeTab.value * 100}%)`,
  };
});
</script>

<style scoped>
.back{
    display: flex;
    background-attachment: fixed;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: 32px;
    background: #F0F0F0;
    align-self: stretch;
    gap: 10px;
  }

#tab-container {
  display: flex;
  justify-content: center;
}

.tab-labels {
  position: relative;
  display: flex;
  width: 264px;
  height: 32px;
  border-radius: 9px;
  background: #dadadb;
  font-size: 12px;
}

.label {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  color: #000;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

.label p {
  margin: 0;
  opacity: 0.6;
}

.label.active p {
  opacity: 1;
}

.indicator {
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 0;
  width: 50%;
  height: calc(100% - 4px);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12),
    0px 3px 1px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
}
</style>

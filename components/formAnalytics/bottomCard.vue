<template>
  <div class="bottom-card">
    <div class="tabs">
      <div
        :class="['tab', { active: selectedTab === 'score' }]"
        @click="selectedTab = 'score'"
      >
        <img src="~/assets/img/scoreDetail.png" />
      </div>
      <div
        :class="['tab', { active: selectedTab === 'detail' }]"
        @click="selectedTab = 'detail'"
      >
        <img src="~/assets/img/scoreDetail.png" />
      </div>
    </div>

    <div class="content">
      <div v-if="selectedTab === 'score'">
        <div class="scoreItemContainer">
          <p>right_elbow_shoulder_score: 40点</p>
          <p>sway_score: 40点</p>
          <p>cog_score: 40点</p>
          <p>forward_posture_score: 40点</p>
          <p>address_parallel_score: 40点</p>
          <p>head_stable_score: 40点</p>
          <p>axis_inclination_score: 40点</p>
          <p>twisting_score: 40点</p>
        </div>
      </div>
      <div v-if="selectedTab === 'detail'">
        <div class="detailContainer">
          <p class="title">詳細情報</p>
          <div class="info">
            <p class="time">動画撮影日時：yyyy/mm/dd 12:00</p>
            <p class="place">場所：○○ゴルフクラブ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'score',
    };
  },
};
</script>

<style scoped>
.bottom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 360px; */
  height: 350px;
  background-color: white;
  border-radius: 20px;
}

.tabs {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-radius: 20px;
}

.tabs :nth-child(1) {
    border-radius: 20px 0 0 0;
}

.tabs :nth-child(2) {
    border-radius: 0 20px 0 0;
}

.tab {
  cursor: pointer;
  width: 50%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25) inset;
}

.tab img {
  width: 50%;
  height: 100%;
}

.tab.active {
  box-shadow: none;
}

.content {
  margin: 20px 0;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.detailContainer {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.detailContainer.info {
    display: flex;
    flex-direction: column;
}

.scoreItemContainer {
    display: flex;
    flex-direction: column;
    gap: 1px;
}
</style>

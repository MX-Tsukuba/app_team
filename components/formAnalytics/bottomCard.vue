<template>
  <div class="bottom-card">
    <div class="tabs">
      <div
        :class="['tab', { active: selectedTab === 'score' }]"
        @click="selectedTab = 'score'"
      >
      解析スコア
      </div>
      <div
        :class="['tab', { active: selectedTab === 'detail' }]"
        @click="selectedTab = 'detail'"
      >
        ゴルフスコア
      </div>
    </div>

    <div class="content">
      <div v-if="selectedTab === 'score'">
        <div class="scoreItemContainer">
          <div class="progress" v-for="(v,i) in props.movieAnalyzeArr" :key="i">
            <p class="name">{{v.name}}</p>
            <div class="progressContainer">
              <el-progress
                :percentage="v.score"
                :status="v.score <= 1 ? 'exception' : undefined"
                :color="v.color"
                :format="() => `${v.score}`"
                :show-text="true"
                :style="{ '--custom-color': v.color }"
              />
              <p class="scoreleft">/100</p>
            </div>
          </div> 
        </div>
      </div>
      <div v-if="selectedTab === 'detail'">
        <div class="detailContainer">
          <div class="score_table" v-show="isActive===true">
            <table>
              <thead>
                <tr>
                  <th>ホール</th>
                  <th>パー</th>
                  <th>スコア</th>
                  <th>パッド</th>
                  <th>フォーム</th>
                </tr>
              </thead>
              <tbody class="t_body">
                <logListTableRow v-for="i in 18" v-bind="playDataArr[i]" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logListTableRow from '../scoreDisplay/logListTableRow.vue';
const selectedTab = ref<string>('score');

const props=defineProps<{
  playDataArr:{
  holeNo: number;
  par: number | null;
  result: number | null;
  putts: number | null;
  form_Score: number | null;
}[]
  movieAnalyzeArr:{score:number,name:string,color:string}[]
  isActive:boolean
}>()






</script>

<style scoped>
.bottom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 360px; */
  height: 350px;
  background-color: white;
  /* border-radius: 20px; */
  gap: 20px;
}

.tabs {
  display: flex;
align-items: center;
gap: 20px;
margin-top: 20px;
  /* border-radius: 20px; */
}

/* .tabs :nth-child(1) {
    border-radius: 20px 0 0 0;
}

.tabs :nth-child(2) {
    border-radius: 0 20px 0 0;
} */

.tab {
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  width: 120px;
  height: 28px;
}


.tab.active {
  /* box-shadow: none; */
  color: #007BE5;
  border-bottom: 2px solid #007BE5;
}

.content {
  margin-bottom: 20px;
  overflow-y: auto; /* 縦方向のスクロールを許可 */
  overflow-x: hidden; /* 横方向のスクロールを非表示に（必要に応じて） */
  max-height: 100%; /* 親要素の高さを制限 */
  /* position: relative;  */
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



.scoreItemContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
/* :deep(.el-progress__text) {
  color: inherit !important; 
} */
.scoreItemContainer.name{
  /* width: auto; */
  color: #333;
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.progress{
  display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* gap: 5px; */
align-self: stretch;
}
.scoreleft{
  color: #333;
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.progressContainer{
  display: flex;
justify-content: center;
align-items: center;
/* gap: 10px; */
}
.progressContainer .el-progress--line {
  width: 276px;
  /* height: 10px; */
}
::v-deep(.el-progress__text) {
  min-width: 0 !important;
  margin-left: 10px !important;
  font-size: 16px !important;
}
::v-deep(.el-progress-bar__outer) {
  height: 10px !important;
}
::v-deep(.el-progress__text) {
  color: var(--custom-color) !important; /* 動的なテキスト色 */
}


.score_table {
  align-items: center;

  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
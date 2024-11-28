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
          <div class="progress" v-for="(v,i) in props.movieAnalyzeArr" :key="i">
            <div class="name">{{v.name}}</div>
            <div class="progressContainer">
              <el-progress :percentage="v.score" :status="v.score <= 1 ? 'exception' : undefined"
                :color="v.color"
                :stroke-width="15"
                :format="() => `${v.score}`"
                :show-text="true"
                text-color="inherit" font-size="16px" width="250px"></el-progress>
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



.scoreItemContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
:deep(.el-progress__text) {
  color: inherit !important; 
}
.scoreItemContainer.name{
  color: #333;
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.scoreItemContainer.progress{
  display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
align-self: stretch;
}
.scoreItemContainer.scoreleft{
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
gap: 10px;
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
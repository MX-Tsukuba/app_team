<template>
  <div class="homebody">
    <div class="gragh">
      <div class="graghChart">
        <div v-if="isLoading">データを読み込んでいます</div>
        <Line v-else :chartData="lineData" :options="chartOptions" />
      </div>
      <div class="changeWeeks">
        <div style="display: flex;">
          <img class="weekBtn reverse" src="~/assets/img/right.png">
          <p class="weeks">前の週</p>
      </div>
      <div style="display: flex;">
          <p class="weeks">次の週</p>
          <img class="weekBtn " src="~/assets/img/right.png">
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '身体情報記録'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('body');
});
</script>

<style scoped>
.homebody{
    display: flex;
    padding: 52px 0;
    flex-direction: column;
    align-items: center;
}
.gragh{
    display: flex;
    width: 360px;
    flex-direction: column;
    align-items: center;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.40);
}
.graghChart{
    width: 330px;
    height: 223.462px;
}
.changeWeeks{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
}
.weekBtn{
    color: #777;
    text-align: center;
    font-family: "Crimson Text";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.reverse{
    transform: rotate(180deg);
}
.weeks{
    color: #777;
    font-family: Inter;
    font-size: 15px;
}
</style>
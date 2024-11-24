<template>
  <div class="sub_container" v-for="item in props.value">
    <div class="month">{{ item.Y }}年{{ item.M }}月</div>
    <div class="subsub_container">
      <logListChild
        v-for="item1 in item.monthDatas"
        :date="item1.date"
        :golfPlaceName="item1.golfPlaceName"
        :roundId="item1.roundId"
        :holedetails="item1.holeDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import logListChild from './logListChild.vue';

interface holeDetails {
  holeNo: number;
  par: number;
  result: number | null;
  putts: number | null;
  form_Score: number | null;
  //form_Score: number;
}

interface roundDetail {
  date: Date;
  golfPlaceName: string;
  roundId: number;
  holeDetails: holeDetails[];
}

interface monthDetail {
  Y: number;
  M: number;
  monthDatas: roundDetail[];
}

interface datas {
  value: monthDetail[];
}
const props = defineProps<datas>();
</script>

<style scoped>
.sub_container{
    display: flex;
    width: 100WW;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .subsub_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
  }

  .month{
    height: 16px;
    align-self: stretch;
    color: #777777;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>

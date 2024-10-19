<template>
  <div class="sub_container" v-for="item in props.value">
    <div class="month">{{ item.Y }}年{{ item.M }}月</div>
    <div class="subsub_container">
      <Logcard
        v-for="item1 in item.monthDatas"
        :date="item1.date"
        :golfPlaceName="item1.golfPlaceName"
        :holedetails="item1.holeDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logcard from './logListChild.vue';

interface holeDetails {
  holeNo: number;
  par: number;
  result: number;
  putts: number;
  form_Score: number;
}

interface roundDetail {
  date: Date;
  golfPlaceName: string;
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

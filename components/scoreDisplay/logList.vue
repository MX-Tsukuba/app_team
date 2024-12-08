<template>
  <div class="sub_container" v-for="item in props.value">
    <div class="month">{{ item.year }}年{{ item.month }}月</div>
    <div class="subsub_container">
      <logListChild
        v-for="item1 in item.roundDetails"
        :date="item1.date"
        :golfPlaceName="item1.golfPlaceName"
        :roundId="item1.roundId"
        :holeDetails="item1.holeDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import logListChild from './logListChild.vue';
import type {
  holeDetail,
  roundDetail,
  monthScoreLog,
} from '@/types/scoreDisplay';

type data = {
  value: monthScoreLog[];
};

const props = defineProps<data>();
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

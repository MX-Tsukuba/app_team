<template>
  <div class="card_whole">
    <div class="dateAndPlaceTag">
      <div class="date">
        {{ props.date.getMonth() + 1 }}月{{ props.date.getDate() }}日
        {{ calculateDays(props.date) }}
      </div>
      <div class="place_tag">
        <div class="place_text">📍{{ props.golfPlaceName }}</div>
      </div>
    </div>
    <div class="button_fram" @click="toggleScoreTable">
      <div v-if="isScoreTableVisible" class="arrow open">
        <LogListArrow />
      </div>
      <div v-if="!isScoreTableVisible" class="arrow">
        <LogListArrow />
      </div>
    </div>
    <div class="tags">
      <div class="score_tag">
        <div class="score_text">合計スコア</div>
        <div class="score_value">{{ calculateScore(props.holeDetails) }}</div>
      </div>
      <div class="no_Value_tag" v-show="someHoleIsNull">
        <div class="isNull_text">！未入力</div>
      </div>
    </div>
    <LogListTable
      :holeDetails="props.holeDetails"
      v-show="isScoreTableVisible"
    />
    <div class="links">
      <div v-show="isScoreTableVisible">
        <button class="text_edit" @click="moveEditPage(props.roundId)">
          スコアを編集
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogListTable from './logListTable.vue';
import LogListArrow from './logListArrow.vue';
import { useRouter } from 'vue-router';
import type { roundDetail, holeDetail } from '~/types/scoreDisplay';

const someHoleIsNull = ref<boolean>(false);
const router = useRouter();

const moveEditPage = (id: number) => {
  router.push({ path: `/scoreInput/${id}`, query: { param: 'scoreDisplay' } });
};

const isScoreTableVisible = ref(false);
const toggleScoreTable = () => {
  isScoreTableVisible.value = !isScoreTableVisible.value;
};

const calculateScore = (holeDetails: holeDetail[]) => {
  //console.log(holedetails);
  let result = 0;
  let nullFlag = 0;
  holeDetails.forEach((element) => {
    if (element.scoreNumber) result += element.scoreNumber;
    else nullFlag++;
  });
  if (nullFlag > 0) someHoleIsNull.value = true;
  return result;
};

function calculateDays(date: Date) {
  const item = [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ];
  return item[date.getDay()];
}

const props = defineProps<roundDetail>();
</script>

<style scoped>
.card_whole {
  display: flex;
  padding: 16px 16px 16px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
}

.date {
  color: #777;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 11px;
}

.score_tag {
  display: flex;
  width: 120px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #ebebeb;
}

.score_text {
  color: #007be5;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.score_value {
  color: #333;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.place_tag {
  position: absolute;
  left: 132px;
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #ebebeb;
  padding-right: 10px;
  white-space: nowrap;
}

.place_text {
  color: #007be5;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.no_Value_tag{
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 18px;
  background: #ebebeb;
}

.isNull_text{
  color: #E45D5D;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.button_fram {
  display: flex;
  padding: 6px 9px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
}

.arrow {
  height: 43px;
  width: 43px;
}

.button_fram .open {
  transform: rotate(180deg);
}

.links {
  display: inline-flex;
  padding: 5px 10px;
  align-items: flex-start;
  gap: 5px;
  position: absolute;
  right: 0pt;
  bottom: 0pt;
  width:fit-content;
  gap:20px
}

.text_Analytics {
  color: #007be5;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.text_edit {
  color:#E45D5D;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.dateAndPlaceTag{
  position: relative;
  display:flex;
  flex-direction: row;
}
</style>

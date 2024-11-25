<script setup lang="ts">
import { useRouter } from 'vue-router';
const value = ref<boolean>(true);
const router = useRouter();

interface movie {
  id: number;
  date: Date;
  status: number;
  total_score: number | null;
  roundId: number | null;
}

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

const toAnalytics = (movieId: number, roundId: number | null) => {
  const isActive: boolean = roundId ? true : false; // roundId が truthy なら true, それ以外なら false

  router.push({
    path: `/formAnalytics/${movieId}`,
    query: {
      roundId: roundId, // roundId の値をそのまま設定
      isActive: isActive, // true または false を設定
    },
  });
};

const props = defineProps<movie>();
</script>

<template>
  <div class="card_whole">
    <div class="date">
      {{ props.date.getMonth() + 1 }}月{{ props.date.getDate() }}日
      {{ calculateDays(props.date) }}
    </div>
    <div class="tags" v-if="props.status == 2">
      <div style="display: flex; gap: 11px">
        <div class="state_tag"><p class="state_succeeded">分析済み</p></div>
        <div class="score_tag">
          <div class="score_text">スコア</div>
          <div class="score_value">
            {{ props.total_score ? Math.round(props.total_score * 100) : null }}
          </div>
        </div>
      </div>
      <button class="link" @click="toAnalytics(props.id, props.roundId)">
        分析を見る
      </button>
    </div>
    <div class="tags" v-else-if="props.status == 0">
      <div class="state_tag"><p class="state_unanalyzed">未分析</p></div>
    </div>
    <div class="tags" v-else-if="props.status == 1">
      <div class="state_tag"><p class="state_analyzing">解析中</p></div>
    </div>
    <div class="tags" v-else>
      <div class="state_tag"><p class="state_error">エラー</p></div>
    </div>
  </div>
</template>

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
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  gap: 11px;
}

.score_tag {
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #ebebeb;
  padding: 0px 10px;
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
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.state_tag{
  height: 24px;
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 18px;
  background: #EBEBEB;
}

.state_succeeded{
  color: #007BE5;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.state_unanalyzed{
  color: #000000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.state_analyzing{
  color:#118740;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.state_error{
  color: #E45D5D;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.link{
  display: flex;
  height: 24px;
  justify-content: flex-end;
  align-items: flex-end;
  color: #007BE5;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>

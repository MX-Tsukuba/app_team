<script setup lang="ts">
const value = ref<boolean>(true);
</script>

<template>
  <div class="card_whole">
    <div class="date">10月20日 日曜日</div>
    <div class="tags" v-if="value">
      <div style="display: flex; gap: 11px">
        <div class="state_tag"><p class="state_succeeded">分析済み</p></div>
        <div class="score_tag">
          <div class="score_text">スコア</div>
          <div class="score_value">90</div>
        </div>
      </div>
      <button class="link">分析を見る</button>
    </div>
    <div class="tags" v-else>
      <div class="state_tag"><p class="state_unanalyzed">未分析</p></div>
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

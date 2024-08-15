<template>
  <section class="wholeHome">
    <div class="homeRecentRecord">
      <p>直近の記録エリア</p>
      <p>一目で結果を確認できるグラフ</p>
    </div>
    <div class="homeRelationDisplay"  :class="{'isActive': isActive, 'isInactive': !isActive}" >
      <p class="toggleDetail" :class="{'isActive': !isActive, 'isInactive': isActive}" @click="toggleDetail">詳細を見る</p>
      <p class="toggleDetail" :class="{'isActive': isActive, 'isInactive': !isActive}" @click="toggleDetail">閉じる</p>
      <p>マッスルデータとスコアデータとの関連分析結果表示エリア
      </p>
    </div>
    <div class="circleBtn">
      <NuxtLink to="../scoreInput" class="circleBtnContent">+</NuxtLink>
    </div>
  </section>

</template>

<script setup lang="ts">
import { useHeadVarStore } from '~/src/store/headVar.js';

const headVarStore = useHeadVarStore();
headVarStore.title = 'ホーム';
const isActive = ref(false);
const toggleDetail = () => {
  isActive.value = !isActive.value;   
};
</script>

<style scoped>

.wholeHome {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FAFAFA;
}

.homeRecentRecord {
  width: 350px;
  height: 200px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}

.homeRelationDisplay.isInactive {
  width: 100%;
  height: 390px;
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}

.homeRelationDisplay.isActive {
  width: 100%;
  height: 800px;
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}

.toggleDetail.isActive{
  color: #DF0000;
  font-size: 14px;
  position: absolute;
  top: 32px;
  right: 16px;
}

.toggleDetail.isInactive{
  display: none;
}
</style>
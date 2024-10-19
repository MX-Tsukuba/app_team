<template>
  <div class="back">
    <div id="tab-container">
      <div class="tab-labels">
        <button
          class="label"
          :class="{ active: activeTab === 0 }"
          @click="selectTab(0)"
        >
          <p>スコア一覧</p>
        </button>
        <button
          class="label"
          :class="{ active: activeTab === 1 }"
          @click="selectTab(1)"
        >
          <p>動画一覧</p>
        </button>
        <div class="indicator" :style="indicatorStyle"></div>
      </div>
    </div>
    <ScoreDisplay v-if="activeTab === 0" :value="<monthDetail[]>data" />
    <MovieDisplay v-else />
  </div>
</template>

<script setup lang="ts">
import ScoreDisplay from '~/components/scoreDisplay/logList.vue';
import MovieDisplay from '~/components/scoreDisplay/movieList.vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types';

const headVarStore = useHeadVarStore();
headVarStore.title = 'スコア記録';
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('score');
});

const activeTab = ref(0);

const selectTab = (index: number) => {
  activeTab.value = index;
};

const indicatorStyle = computed(() => {
  return {
    transform: `translateX(${activeTab.value * 100}%)`,
  };
});

const supabase = useSupabaseClient<Database>();

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

async function getScore() {
  const monthDetails = Array<monthDetail>();
  try {
    //TODO: 特定のユーザのデータゴルフデータを全て取得、ユーザの識別についてはローレベルセキュリティで実行する。
    const { data: roundDatas, error } = await supabase
      .from('t_rounds')
      .select(
        'date, t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number))'
      )
      .eq('user_id', 1);
    if (error) {
      console.error('Error fetching data from t_round table:', error);
    } else {
      //console.log(roundDatas);
      roundDatas.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA > dateB) return -1;
        else if (dateA === dateB) return 0;
        else return 1;
      });
      //console.log(roundDatas);

      //TODO: 一度データをpropsに渡せる形に直す。
      //できれば以下の実装を省略していきなりpropsに渡せる形にする＆月ごとに分けたい。
      const tmpDetails: roundDetail[] = [];
      roundDatas.forEach((item) => {
        if (item.m_golfplaces !== null)
          item.m_golfplaces.m_holes.sort(
            (a, b) => a.hole_number - b.hole_number
          );
        item.t_holes.sort((a, b) => a.hole_number - b.hole_number);

        const tmpHoleDetails: holeDetails[] = [];
        item.t_holes.forEach((item1) => {
          const tmpMHoles = item.m_golfplaces?.m_holes.find((value) => {
            return value.hole_number == item1.hole_number;
          });
          tmpHoleDetails.push({
            holeNo: item1.hole_number,
            par: tmpMHoles ? tmpMHoles.par_number : -1,
            result: item1.score_number,
            putts: item1.putts_number,
            form_Score: 100,
          });
        });
        tmpDetails.push({
          date: new Date(item.date),
          golfPlaceName: item.m_golfplaces
            ? item.m_golfplaces.golf_place_name
            : '情報がありません',
          holeDetails: tmpHoleDetails,
        });
      });
      //console.log(tmpDetails);
      //

      let tmpDate: Date = tmpDetails[0].date;
      let tmpDatas: roundDetail[] = [];
      tmpDetails.forEach((item) => {
        const itemDate = item.date;
        if (
          itemDate.getFullYear() === tmpDate.getFullYear() &&
          itemDate.getMonth() === tmpDate.getMonth()
        ) {
          tmpDatas.push(item);
        } else {
          monthDetails.push({
            Y: tmpDate.getFullYear(),
            M: tmpDate.getMonth() + 1,
            monthDatas: tmpDatas,
          });
          tmpDatas = [item];
          tmpDate = item.date;
        }
      });
      monthDetails.push({
        Y: tmpDate.getFullYear(),
        M: tmpDate.getMonth() + 1,
        monthDatas: tmpDatas,
      });
      //console.log(monthDetails);
      return monthDetails;
    }
  } catch (e) {
    console.error('Unexpected Error', e);
  }
}

const { data } = useAsyncData(() => getScore());
</script>

<style scoped>
.back{
    display: flex;
    background-attachment: fixed;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: 32px;
    background: #F0F0F0;
    align-self: stretch;
    gap: 10px;
  }

#tab-container {
  display: flex;
  justify-content: center;
}

.tab-labels {
  position: relative;
  display: flex;
  width: 264px;
  height: 32px;
  border-radius: 9px;
  background: #dadadb;
  font-size: 12px;
}

.label {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  color: #000;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

.label p {
  margin: 0;
  opacity: 0.6;
}

.label.active p {
  opacity: 1;
}

.indicator {
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 0;
  width: 50%;
  height: calc(100% - 4px);
  border-radius: 7px;
  background: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12),
    0px 3px 1px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
}
</style>

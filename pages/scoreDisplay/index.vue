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
    <ScoreDisplay v-if="activeTab === 0" :value="data ? data.scoreLogs : []" />
    <MovieDisplay v-else :value="data ? data.movieLogs : []" />
  </div>
</template>

<script setup lang="ts">
import ScoreDisplay from '~/components/scoreDisplay/logList.vue';
import MovieDisplay from '~/components/scoreDisplay/movieList.vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types';
import type {
  holeDetail,
  roundDetail,
  monthScoreLog,
  movieDetail,
  monthMovieLog,
} from '@/types/scoreDisplay.d.ts';

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

async function fetchLog() {
  const scoreLogs: monthScoreLog[] = [];
  const tmpRoundDetailsList: roundDetail[] = [];

  //TODO: 特定のユーザのデータゴルフデータを全て取得、ユーザの識別についてはローレベルセキュリティで実行する。
  const { data, error } = await supabase
    .from('t_rounds')
    .select(
      'id, date, t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number))'
    );
  if (error) throw error;

  //idでソート
  data.sort((a, b) => {
    return a.id - b.id;
  });

  // 日付で降順にソート
  data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    else if (dateA === dateB) return 0;
    else return 1;
  });

  data.forEach((item) => {
    if (item.m_golfplaces !== null)
      item.m_golfplaces.m_holes.sort((a, b) => a.hole_number - b.hole_number);
    item.t_holes.sort((a, b) => a.hole_number - b.hole_number);

    const tmpHoleDetails: holeDetail[] = [];
    for (let i = 0; i < 18; i++) {
      const a = item.m_golfplaces?.m_holes.find(
        (value) => value.hole_number === i + 1
      );

      const b = item.t_holes.find((value) => value.hole_number === i + 1);

      if (a) {
        if (b) {
          tmpHoleDetails.push({
            holeNumber: a.hole_number,
            parNumber: a.par_number,
            golfScore: b.score_number,
            puttsNumber: b.putts_number,
            formScore: null,
          });
        } else {
          tmpHoleDetails.push({
            holeNumber: a.hole_number,
            parNumber: a.par_number,
            golfScore: null,
            puttsNumber: null,
            formScore: null,
          });
        }
      }
    }
    tmpRoundDetailsList.push({
      date: new Date(item.date),
      golfPlaceName: item.m_golfplaces
        ? item.m_golfplaces.golf_place_name
        : '情報がありません',
      roundId: item.id,
      holeDetails: tmpHoleDetails,
    });
  });

  let tmpDate: Date = tmpRoundDetailsList[0].date;
  let tmpMonthRoundDetails: roundDetail[] = [];
  tmpRoundDetailsList.forEach((item) => {
    const itemDate = item.date;
    if (
      itemDate.getFullYear() === tmpDate.getFullYear() &&
      itemDate.getMonth() === tmpDate.getMonth()
    ) {
      tmpMonthRoundDetails.push(item);
    } else {
      scoreLogs.push({
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
        roundDetails: tmpMonthRoundDetails,
      });
      tmpMonthRoundDetails = [item];
      tmpDate = item.date;
    }
  });
  scoreLogs.push({
    year: tmpDate.getFullYear(),
    month: tmpDate.getMonth() + 1,
    roundDetails: tmpMonthRoundDetails,
  });
  return scoreLogs;
}

const fetchMovies = async () => {
  const { data, error } = await supabase
    .from('t_movies')
    .select('created_at, id, status, result');
  if (error) throw error;

  const tmpMovieDetailsList: movieDetail[] = [];

  data.forEach((item) => {
    tmpMovieDetailsList.push({
      id: item.id,
      date: new Date(item.created_at.slice(0, 10)),
      status: item.status,
      formScore: item.result ? (item.result.total_score as number) : -1, //時間がないので型解決を諦めます。デフォルト値を-1にします。
      roundId: null,
    });
  });
  tmpMovieDetailsList.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    else if (dateA === dateB) return 0;
    else return 1;
  });
  //console.log(data);
  //console.log(tmpMovieDetailsList);

  const movieLogs: monthMovieLog[] = [];
  let tmpDate: Date = tmpMovieDetailsList[0].date;
  let tmpMonthMovieDetails: movieDetail[] = [];
  tmpMovieDetailsList.forEach((item) => {
    const itemDate = item.date;
    if (
      itemDate.getFullYear() === tmpDate.getFullYear() &&
      itemDate.getMonth() === tmpDate.getMonth()
    ) {
      tmpMonthMovieDetails.push(item);
    } else {
      movieLogs.push({
        year: tmpDate.getFullYear(),
        month: tmpDate.getMonth() + 1,
        movieDetails: tmpMonthMovieDetails,
      });
      tmpMonthMovieDetails = [item];
      tmpDate = item.date;
    }
  });
  movieLogs.push({
    year: tmpDate.getFullYear(),
    month: tmpDate.getMonth() + 1,
    movieDetails: tmpMonthMovieDetails,
  });
  //console.log(movieLogs);
  return movieLogs;
};

const fetchData = async () => {
  const { data: relations, error } = await supabase
    .from('t_relations')
    .select('*');

  if (error) throw error;
  //else console.log(relations);

  const scoreLogs = await fetchLog();
  const movieLogs = await fetchMovies();

  if (scoreLogs) {
    relations.forEach((relation) => {
      scoreLogs.forEach((log) => {
        // 該当する monthData を検索
        const monthData = log.roundDetails.find(
          (data) => data.roundId === relation.round_id
        );
        if (!monthData) return;

        // 該当する holeDetail を検索
        const holeDetail = monthData.holeDetails.find(
          (detail) => detail.holeNumber === relation.hole_number
        );
        if (!holeDetail) return;

        // Movies が存在する場合
        if (movieLogs) {
          // 該当する movie を検索
          const movie = movieLogs.find((m1) =>
            m1.movieDetails.some((m2) => m2.id === relation.movie_id)
          );

          if (movie) {
            const movieData = movie.movieDetails.find(
              (m) => m.id === relation.movie_id
            );
            if (movieData) {
              holeDetail.formScore = movieData.formScore
                ? Math.round(movieData.formScore * 100)
                : null;
            }
          }
        }
      });
    });
  }

  if (movieLogs) {
    relations.forEach((relation) => {
      movieLogs.forEach((item) => {
        item.movieDetails.forEach((item1) => {
          if (item1.id === relation.movie_id) {
            item1.roundId = relation.round_id;
          }
        });
      });
    });
  }
  return {
    scoreLogs: scoreLogs ? scoreLogs : [],
    movieLogs: movieLogs ? movieLogs : [],
  };
};

const { data } = useAsyncData(() => fetchData());
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
  color: #333;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

.label p {
  margin: 0;
  opacity: 0.6;
  font-size: 12px;
}

.label.active p {
  opacity: 1;
  font-size: 12px;
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

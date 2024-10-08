<template>
  <div class="sub_container" v-for="item in data">
    <div class="month">{{ item.Y }}年{{ item.M }}月</div>
    <div class="subsub_container">
      <logListChild
        v-for="item1 in item.monthDatas"
        :date="item1.date"
        :golfPlaceName="item1.golfPlaceName"
        :holedetails="item1.holeDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import logListChild from './logListChild.vue';
import type { Database } from '~/types/database.types';

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
        'date, t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number))'//m_holesとt_holesがわかりずらすぎる
      )
      .eq('user_id', 1)
      // .order('date',{ascending:true})
      // .order('t_holes.hole_number',{ascending:true})
      // .order('m_golfplaces.m_holes.hole_number',{ascending:true})
      ;
      //selectの時点でsortはできるので、以下で行っているsortの処理はなくして大丈夫です
    if (error) {
      console.error('Error fetching data from t_round table:', error);
    } else {
      console.log("取得してきたデータ",roundDatas);
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
      const tmpDetails: roundDetail[] = [];//変数名が何を表すかわかりにくいのでinterface名と変数名を一致させてください
      roundDatas.forEach((item) => {
        if (item.m_golfplaces !== null)
          item.m_golfplaces.m_holes.sort(
            (a, b) => a.hole_number - b.hole_number
          );
        item.t_holes.sort((a, b) => a.hole_number - b.hole_number);

        const tmpHoleDetails: holeDetails[] = [];//変数名が何を表すかわかりにくいのでinterface名と変数名を一致させてください
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
      console.log("roundのデータ",tmpDetails);

      let tmpDate: Date = tmpDetails[0].date;//表示している月に格納されるデータなのでNowとかCurrentとか変数名に加えてほしい
      let tmpDatas: roundDetail[] = [];//この二つの変数名が似すぎてわかりずらいので変えてほしい
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
      console.log("月ごとのデータ",monthDetails);
      return monthDetails;
    }
  } catch (e) {
    console.error('Unexpected Error', e);
  }
}

const { data } = useAsyncData(() => getScore());
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
